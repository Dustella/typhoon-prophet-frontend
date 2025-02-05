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
  dummyday?: number;
}> = (props) => {
  let map: any = null;
  let heatmap: any = null;
  let imageLayer: any = null;

  const apiKey = import.meta.env.VITE_AMAP_API_KEY;
  const backendAddr = import.meta.env.VITE_BACKEND_ADDR;

  let amapInstance: any = null;

  const showLnglatHandler = (e: any) => {
    new amapInstance.InfoWindow({
      content: (
        <div class="text-black p-2">
          {e.lnglat.lng}, {e.lnglat.lat}
        </div>
      ),
    }).open(map, e.lnglat);
  };

  const day = createMemo(() => props.day);
  const date = createMemo(() => props.date);
  const model = createMemo(() => props.model);
  const mode = createMemo(() => props.mode);

  const updateMap = (
    currentDay: string,
    currentDate: string,
    currentModel: string,
    currentMode: string
  ) => {
    if (amapInstance == null) {
      // Sleep for 100ms and retry
      setTimeout(() => {
        updateMap(currentDay, currentDate, currentModel, currentMode);
      }, 100);
      return;
    }

    switch (currentMode) {
      case "image":
        if (heatmap) {
          heatmap.hide();
        }
        let url = "result/10.png";
        if (props.dummyday) {
          url = `result/${props.dummyday}.png`;
        }
        const image = new amapInstance.ImageLayer({
          url,
          // bounds: new amapInstance.Bounds([30, 0], [180, 30]),
          bounds: new amapInstance.Bounds([-150, -35], [180, 35]),
          zIndex: 9,
          opacity: 1,
          // zooms: [15, 20],
        });
        map.add(image);
        image.on("complete", () => {
          if (imageLayer) {
            // Clears the previous image layer
            imageLayer.hide();
          }
          imageLayer = image;
        });

        break;
      case "heatmap":
        if (imageLayer) {
          imageLayer.hide();
        }
        fetch(
          `${backendAddr}/heatmap?day=${currentDay}&date=${currentDate}&model=${currentModel}`
        )
          .then((a) => a.json())
          .then((data) => {
            if (heatmap) {
              heatmap.hide();
            }
            map.plugin(["AMap.HeatMap"], function () {
              // 在地图对象叠加热力图

              heatmap = new amapInstance.HeatMap(map, {
                radius: 100, //给定半径
                opacity: [0, 0.8],
              });
              // 设置热力图数据集
              heatmap.setDataSet({ data: data, max: 1000 });
            });
          });
        break;
      default:
        console.log("[E] Invalid display mode.");
        break;
    }
  };

  createEffect(() => {
    const [currentDay, currentDate, currentModel, currentMode] = [
      day(),
      date(),
      model(),
      mode(),
    ];
    updateMap(currentDay, currentDate, currentModel, currentMode);
  });

  onMount(async () => {
    try {
      const AMap = await AMapLoader.load({
        key: apiKey,
        version: "2.0",
        plugins: [""],
      });
      amapInstance = AMap;

      map = new AMap.Map("amap-container", {
        zoom: 5,
        center: [130, 17],
        // layers: [
        /*new AMap.TileLayer.Satellite()*/
        // new AMap.TileLayer.RoadNet(),
        // ],
      });
      //2、创建世界简易行政区图层
      var distWorld = new AMap.DistrictLayer.World({
        zIndex: 7, //设置图层层级
        zooms: [2, 15], //设置图层显示范围
      });

      //3、设置行政区图层样式
      distWorld.setStyles({
        "stroke-width": 2, //描边线宽
        fill: function (data) {
          //设置区域填充颜色，可根据回调信息返回区域信息设置不同填充色
          //回调返回区域信息数据，字段包括 SOC(国家代码)、NAME_ENG(英文名称)、NAME_CHN(中文名称)等
          //国家代码名称说明参考 https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json
          return "#ffffffe7";
        },
      });
      map.add(distWorld);
      // var bounds = map.getBounds();
      // map.setLimitBounds(bounds);

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

      map.on("click", showLnglatHandler);

      // 创建地图实例

      // 定义北回归线、赤道和南回归线的路径
      const tropicOfCancerPath = [
        new AMap.LngLat(-180, 23.43691),
        new AMap.LngLat(180, 23.43691),
      ];

      const equatorPath = [new AMap.LngLat(-180, 0), new AMap.LngLat(180, 0)];

      const tropicOfCapricornPath = [
        new AMap.LngLat(-180, -23.43691),
        new AMap.LngLat(180, -23.43691),
      ];

      // 创建折线实例
      const tropicOfCancerLine = new AMap.Polyline({
        path: tropicOfCancerPath,
        strokeWeight: 2,
        strokeColor: "red",
        lineJoin: "round",
      });

      const equatorLine = new AMap.Polyline({
        path: equatorPath,
        strokeWeight: 2,
        strokeColor: "green",
        lineJoin: "round",
      });

      const tropicOfCapricornLine = new AMap.Polyline({
        path: tropicOfCapricornPath,
        strokeWeight: 2,
        strokeColor: "blue",
        lineJoin: "round",
      });

      // 将折线添加至地图实例
      map.add(tropicOfCancerLine);
      map.add(equatorLine);
      map.add(tropicOfCapricornLine);
    } catch (e) {
      console.log(e);
    }
  });
  const targetMovePoint = [104, -3];
  const setCenter = () => {
    map.setCenter(targetMovePoint);
    map.setZoom(4);
  };

  onCleanup(() => {
    map?.destroy();
  });

  return (
    <>
      {/* <h1>{props.date}</h1> */}
      <div>
        <button class="btn w-full py-2" onclick={setCenter}>
          set center
        </button>
      </div>
      <div id="amap-container" class="p-0 m-0 w-full h-full"></div>
    </>
  );
};

export default Index;
