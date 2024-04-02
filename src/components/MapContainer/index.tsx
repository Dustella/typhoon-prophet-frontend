import {
  onMount,
  onCleanup,
  Component,
  createEffect,
  createMemo,
} from "solid-js";
import AMapLoader from "@amap/amap-jsapi-loader";

const Index: Component<{
  date: string;
  day: string;
  model: string;
}> = (props) => {
  let map: any = null;
  let heatmap: any = null;

  const api_key = import.meta.env.VITE_AMAP_API_KEY;

  let amap_instance: any = null;

  const day = createMemo(() => props.day);
  const date = createMemo(() => props.date);
  const model = createMemo(() => props.model);

  createEffect(() => {
    const [currentDay, currentDate, currentModel] = [day(), date(), model()];

    fetch(
      `https://tc-backend.dustella.net/heatmap?day=${currentDay}&date=${currentDate}&model=${currentModel}`
    )
      .then((a) => a.json())
      .then((data) => {
        map.plugin(["AMap.HeatMap"], function () {
          // 在地图对象叠加热力图
          // heatmap.hide();
          if (heatmap) {
            heatmap.hide();
          }

          heatmap = new amap_instance.HeatMap(map, {
            radius: 100, //给定半径
            opacity: [0, 0.8],
          });
          // 设置热力图数据集
          heatmap.setDataSet({ data: data, max: 1000 });
        });
      });
  });

  onMount(async () => {
    try {
      const AMap = await AMapLoader.load({
        key: api_key,
        version: "2.0",
        plugins: [""],
      });
      amap_instance = AMap;

      map = new AMap.Map("amap-container", {
        zoom: 4.5,
        center: [105.602725, 37.076636],
        layers: [new AMap.TileLayer.Satellite()],
      });

      // const imageLayer = new AMap.ImageLayer({
      //   url: `/src/assets/example_climate.png`,
      //   bounds: new AMap.Bounds([100, 0], [180, 30]),
      //   zIndex: 2,
      //   opacity: 0.7,
      //   // zooms: [15, 20],
      // });

      // map.add(imageLayer);
    } catch (e) {
      console.log(e);
    }
  });

  onCleanup(() => {
    map?.destroy();
  });

  return (
    <>
      <h1>{props.date}</h1>
      <div id="amap-container" class="p-0 m-0 w-full h-full"></div>
    </>
  );
};

export default Index;
