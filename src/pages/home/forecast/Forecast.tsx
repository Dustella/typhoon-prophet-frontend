import { For, createResource, createSignal } from "solid-js";
import MapContainer from "../../../components/MapContainer";

const getMeta = async () =>
  await fetch("https://tc-backend.dustella.net/meta").then((a) => a.json());

const Index = () => {
  const [metadata] = createResource(getMeta);
  const [currentDay, setCurrentDay] = createSignal("1");
  const [currentModel, setCurrentModel] = createSignal("cma");
  const [currentDate, setCurrentDate] = createSignal("2017_10_12");

  return (
    <>
      <h1 class="text-center">台风预报</h1>
      <div class="w-[80rem] flex items-center flex-row justify-center mx-auto">
        <select
          class="select w-full max-w-xs"
          title="ss"
          onChange={(e) => {
            setCurrentModel(e.target.value);
          }}
        >
          <For each={metadata()?.all_models ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
        <select
          class="select w-full max-w-xs"
          title="ss"
          onChange={(e) => {
            setCurrentDay(e.target.value);
          }}
        >
          <For each={metadata()?.day_range ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
        <select
          class="select w-full max-w-xs"
          title="ss"
          onChange={(e) => {
            setCurrentDate(e.target.value);
          }}
        >
          <For each={metadata()?.all_dates.sort() ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
      </div>
      <main class="w-[80rem] h-[50rem] mx-auto">
        <MapContainer
          date={currentDate()}
          day={currentDay()}
          model={currentModel()}
        />
      </main>
      <section class="text-center">这里反正塞一点审图号啥的</section>
    </>
  );
};

export default Index;
