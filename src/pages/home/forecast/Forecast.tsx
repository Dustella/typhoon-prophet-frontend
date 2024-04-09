import { For, createResource, createSignal } from "solid-js";
import MapContainer from "../../../components/MapContainer";
import { SimpleDatepicker } from "solid-simple-datepicker";
import "solid-simple-datepicker/styles.css";
import { FaSolidDatabase, FaSolidEye } from "solid-icons/fa";
import { IoCalendar } from "solid-icons/io";
import { TbBrain } from "solid-icons/tb";

const getMeta = async () =>
	await fetch("https://tc-backend.dustella.net/meta").then((a) => a.json());

const DateSelectorLocale = {
	sun: "天",
	mon: "一",
	tue: "二",
	wed: "三",
	thu: "四",
	fri: "五",
	sat: "六",
	done: "完成",
	year: "年份",
	month: "月份",
	day: "日期",
	jan: "一月",
	feb: "二月",
	mar: "三月",
	apr: "四月",
	may: "五月",
	jun: "六月",
	jul: "七月",
	aug: "八月",
	sep: "九月",
	oct: "十月",
	nov: "十一月",
	dec: "十二月",
};

const Index = () => {
	const [metadata] = createResource(getMeta);
	const [currentDay, setCurrentDay] = createSignal("1");
	const [currentModel, setCurrentModel] = createSignal("cma");
	const [currentDate, setCurrentDate] = createSignal("2017_10_12");
	const [currentMode, setCurrentMode] = createSignal<"image" | "heatmap">(
		"image"
	);

	const [date, _setDate] = createSignal<Date>(new Date("2017-10-13"));
	const [startYear, setStartYear] = createSignal(2017);
	const [endYear, setEndYear] = createSignal(2018);
	const [disabledMonths, setDisabledMonths] = createSignal([
		0, 1, 2, 3, 4, 5, 6, 7, 8, 11,
	]);
	const [disabledDays, setDisabledDays] = createSignal<number[]>([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
	]);
	const [dateString, setDateString] =
		createSignal<string>("2017-10-13 (1天后)");

	const onDateFooterDone = () => {
		// Close the dropdown menu
		const dateSelector = document.getElementById("dateSelector");
		dateSelector?.removeAttribute("open");

		const d = date();

		// Calculate the distance between the current date and the selected date
		const startDate = new Date(currentDate().replace(/_/g, "-"));
		const diff = (
			(d.getTime() - startDate.getTime()) /
			(1000 * 60 * 60 * 24)
		).toFixed(0);
		setCurrentDay(`${diff}`);

		// Update the date string
		setDateString(
			`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} \(${diff}天后\)`
		);
	};

	const setDate = (d: Date) => {
		_setDate(d);

		const startDate = new Date(currentDate().replace(/_/g, "-"));
		const startDatePlus29 = new Date(startDate);
		startDatePlus29.setDate(startDate.getDate() + 29);
		let enabledDays: number[] = [];

		// Enabled days calculation
		if (d.getMonth() === startDate.getMonth()) {
			// set enabled days
			for (let day = startDate.getDate() + 1; day <= 31; day++) {
				enabledDays.push(day);
			}
		} else {
			// set enabled days
			for (let day = 1; day <= startDatePlus29.getDate(); day++) {
				enabledDays.push(day);
			}
		}

		// Date valid check
		if (d.getMonth() === startDate.getMonth()) {
			if (d.getDate() < startDate.getDate() || d.getDate() > 31) {
				const startDatePlus1 = new Date(startDate);
				startDatePlus1.setDate(startDate.getDate() + 1);
				_setDate(startDatePlus1);
			}
		} else {
			if (d.getDate() > startDatePlus29.getDate()) {
				_setDate(startDatePlus29);
			}
		}

		// Calculate the disabled days
		setDisabledDays(
			[...Array<number>(32).keys()].filter((day) => !enabledDays.includes(day))
		);
	};

	const updateDateSelector = (sourceDate: string) => {
		// Parse into date type
		const d = new Date(sourceDate.replace(/_/g, "-"));
		const dPlus1 = new Date(d);
		dPlus1.setDate(d.getDate() + 1);
		setDate(dPlus1);

		// Calculate the start and end year
		setStartYear(d.getFullYear());
		setEndYear(d.getFullYear() + 1);

		// Add 29 days to the date and set end year to that year
		const dPlus29 = new Date(d);
		dPlus29.setDate(d.getDate() + 29);

		// Calculate the enabled days and months
		const enabledMonths: number[] = [];
		for (let month = d.getMonth(); month <= dPlus29.getMonth(); month++) {
			enabledMonths.push(month);
		}

		// Update the disabled days and months
		setDisabledMonths(
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter(
				(month) => !enabledMonths.includes(month)
			)
		);

		// Call the onDateFooterDone to update the date string
		onDateFooterDone();
	};

	return (
		<div class="min-h-screen bg-slate-800">
			<div class="h-auto flex flex-col items-center ">
				<div class="pt-8 pb-4 font-bold text-4xl text-white">台风预报</div>
				<div class="w-[80rem] flex items-center flex-row justify-center mx-auto my-4">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text flex items-center text-white">
								<TbBrain class="mx-2" />
								预测模型
							</span>
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
							<span class="label-text flex items-center text-white">
								<FaSolidDatabase class="mx-2" />
								数据来源日期
							</span>
						</div>
						<select
							id="dateSelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentDate(e.target.value);
								// Update the date selector
								updateDateSelector(e.target.value);
							}}
						>
							<For each={metadata()?.all_dates.sort() ?? []}>
								{(item) => <option>{item}</option>}
							</For>
						</select>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<div class="label-text flex items-center text-white">
								<IoCalendar class="mx-2" />
								预测日期
							</div>
						</div>
						<details class="dropdown" id="dateSelector">
							<summary class="items-center select select-bordered w-full">
								{dateString()}
							</summary>
							<div class="mx-1.5 dropdown-content z-50">
								<SimpleDatepicker
									selectedDate={date()}
									onChange={setDate}
									onFooterDone={onDateFooterDone}
									locale={DateSelectorLocale}
									startYear={startYear()}
									endYear={endYear()}
									disabledDays={disabledDays()}
									disabledMonths={disabledMonths()}
								/>
							</div>
						</details>
					</label>
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text flex items-center text-white">
								<FaSolidEye class="mx-2" />
								显示模式
							</span>
						</div>
						<select
							id="modeSelect"
							class="mx-1.5 select select-bordered"
							onChange={(e) => {
								setCurrentMode(e.target.value as "image" | "heatmap");
							}}
						>
							<For each={["image", "heatmap"]}>
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
