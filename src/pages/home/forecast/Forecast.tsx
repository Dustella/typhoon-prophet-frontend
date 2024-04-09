import { For, createResource, createSignal } from "solid-js";
import MapContainer from "../../../components/MapContainer";

const getMeta = async () =>
	await fetch("https://tc-backend.dustella.net/meta").then((a) => a.json());

const Index = () => {
	const [metadata] = createResource(getMeta);
	const [currentDay, setCurrentDay] = createSignal("1");
	const [currentModel, setCurrentModel] = createSignal("cma");
	const [currentDate, setCurrentDate] = createSignal("2017_10_12");
	const [currentMode, setCurrentMode] = createSignal<"image" | "heatmap">(
		"image"
	);

	return (
		<div class="min-h-screen bg-slate-800">
			<div class="h-auto flex flex-col items-center ">
				<div class="pt-8 pb-4 font-bold text-4xl text-white">台风预报</div>
				<div class="w-[80rem] flex items-center flex-row justify-center mx-auto my-4">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">预测模型</span>
						</div>
						<select
							id="modelSelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentModel(e.target.value);
							}}
						>
							<For each={metadata()?.all_models ?? []}>
								{(item) => <option>{item}</option>}
							</For>
						</select>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">预测天数</span>
						</div>
						<select
							id="daySelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentDay(e.target.value);
							}}
						>
							<For each={metadata()?.day_range ?? []}>
								{(item) => <option>{item}</option>}
							</For>
						</select>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">起始日期</span>
						</div>

						<select
							id="dateSelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentDate(e.target.value);
							}}
						>
							<For each={metadata()?.all_dates.sort() ?? []}>
								{(item) => <option>{item}</option>}
							</For>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">显示模式</span>
						</div>
						<select
							id="modeSelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentMode(e.target.value as "image" | "heatmap");
							}}
						>
							<For each={["heatmap", "image"]}>
								{(item) => <option>{item}</option>}
							</For>
						</select>
					</label>
				</div>
				<main class="w-[80rem] h-[50rem] mx-auto text-white my-4">
					<MapContainer
						date={currentDate()}
						day={currentDay()}
						model={currentModel()}
						mode={currentMode()}
					/>
				</main>
			</div>
		</div>
	);
};

export default Index;
