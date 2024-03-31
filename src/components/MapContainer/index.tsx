import { onMount, onCleanup } from "solid-js";
import AMapLoader from "@amap/amap-jsapi-loader";

const Index = () => {
  let map: any = null;

  const api_key = import.meta.env.VITE_AMAP_API_KEY;
  console.log(api_key);

  onMount(() => {
    AMapLoader.load({
      key: api_key, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("amap-container", {
          zoom: 4.5, //初始化地图级别
          center: [105.602725, 37.076636], //初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });

  onCleanup(() => {
    map?.destroy();
  });

  return <div id="amap-container" class="p-0 m-0 w-full h-screen"></div>;
};

export default Index;
