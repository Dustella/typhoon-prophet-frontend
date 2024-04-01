import { onMount, onCleanup } from "solid-js";
import AMapLoader from "@amap/amap-jsapi-loader";
import climate_data from "../../assets/climate_data.json";

const Index = () => {
  let map: any = null;
  let heatmap: any = null;

  const api_key = import.meta.env.VITE_AMAP_API_KEY;
  console.log(api_key);

  console.log(climate_data);

  onMount(async () => {
    try {
      const AMap = await AMapLoader.load({
        key: api_key,
        version: "2.0",
        plugins: [""],
      });

      map = new AMap.Map("amap-container", {
        zoom: 4.5,
        center: [105.602725, 37.076636],
        layers: [new AMap.TileLayer.Satellite()],
      });

      map.plugin(["AMap.HeatMap"], function () {
        // 在地图对象叠加热力图

        heatmap = new AMap.HeatMap(map, {
          radius: 150, //给定半径
          opacity: [0, 0.8],
        });
        // 设置热力图数据集
        heatmap.setDataSet({ data: climate_data, max: 1000 });
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

  return <div id="amap-container" class="p-0 m-0 w-full h-full"></div>;
};

export default Index;
