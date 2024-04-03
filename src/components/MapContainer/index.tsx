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
  mode: "heatmap" | "image";
}> = (props) => {
  let map: any = null;
  let heatmap: any = null;
  let imageLayer: any = null;

  const api_key = import.meta.env.VITE_AMAP_API_KEY;

  let amap_instance: any = null;

  const day = createMemo(() => props.day);
  const date = createMemo(() => props.date);
  const model = createMemo(() => props.model);
  const mode = createMemo(() => props.mode);

  createEffect(() => {
    const [currentDay, currentDate, currentModel, currentMode] = [
      day(),
      date(),
      model(),
      mode(),
    ];

    fetch(
      `https://tc-backend.dustella.net/heatmap?day=${currentDay}&date=${currentDate}&model=${currentModel}`
    )
      .then((a) => a.json())
      .then((data) => {
        if (imageLayer) {
          imageLayer.hide();
        }
        // heatmap.hide();
        if (heatmap) {
          heatmap.hide();
        }

        if (currentMode == "image") {
          const image = new amap_instance.ImageLayer({
            url: `https://tc-backend.dustella.net/plot?day=${currentDay}&date=${currentDate}&model=${currentModel}`,
            bounds: new amap_instance.Bounds([100, -15], [180, 45]),
            zIndex: 2,
            opacity: 0.7,
            // zooms: [15, 20],
          });
          imageLayer = image;

          map.add(image);
        }

        if (currentMode == "heatmap") {
          map.plugin(["AMap.HeatMap"], function () {
            // 在地图对象叠加热力图

            heatmap = new amap_instance.HeatMap(map, {
              radius: 100, //给定半径
              opacity: [0, 0.8],
            });
            // 设置热力图数据集
            heatmap.setDataSet({ data: data, max: 1000 });
          });
        }
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
        center: [140, 15],
        layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
      });
      var bounds = map.getBounds();
      map.setLimitBounds(bounds);

      const copyright = document.querySelector(
        ".amap-copyright"
      ) as HTMLDivElement;
      copyright.style.display = "block";
      copyright.style.color = "white";
      copyright.style.fontSize = "20px";
      copyright.style.lineHeight = "10px";
      copyright.innerHTML = `
      地图审图号：GS(2023)4677号 卫星图片审图号：GS(2023)4047号 测绘资质证号：甲测资字11111093
      `;
    } catch (e) {
      console.log(e);
    }
  });

  onCleanup(() => {
    map?.destroy();
  });

  return (
    <>
      {/* <h1>{props.date}</h1> */}
      <div id="amap-container" class="p-0 m-0 w-full h-full"></div>
    </>
  );
};

export default Index;
