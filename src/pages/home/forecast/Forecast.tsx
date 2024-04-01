import { For, createResource } from "solid-js";
import MapContainer from "../../../components/MapContainer";

const getMeta = async () =>
  await fetch("https://tc-backend.dustella.net/meta").then((a) => a.json());

const Index = () => {
  const [metadata] = createResource(getMeta);

  return (
    <>
      <h1 class="text-center">台风预报</h1>
      <div class="w-[80rem] flex items-center flex-row justify-center mx-auto">
        <select class="select w-full max-w-xs" title="ss">
          <For each={metadata()?.all_models ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
        <select class="select w-full max-w-xs" title="ss">
          <For each={metadata()?.day_range ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
        <select class="select w-full max-w-xs" title="ss">
          <For each={metadata()?.all_dates ?? []}>
            {(item) => <option>{item}</option>}
          </For>
        </select>
      </div>
      <main class="w-[80rem] h-[50rem] mx-auto">
        <MapContainer />
      </main>
      <section class="text-center">这里反正塞一点审图号啥的</section>
    </>
  );
};

export default Index;
