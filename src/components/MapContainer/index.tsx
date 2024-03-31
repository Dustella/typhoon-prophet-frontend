import { onMount, onCleanup } from "solid-js"
import AMapLoader from "@amap/amap-jsapi-loader"

const Index = () => {

  let map:any = null

  onMount(() => {
    AMapLoader.load({
      key:"2b02b3d8935cd84abefc903371feb374",                     // 申请好的Web端开发者Key，首次调用 load 时必填
      version:"2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins:[''],               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      map = new AMap.Map("container", {
        zoom:4.5,                //初始化地图级别
        center:[105.602725,37.076636], //初始化地图中心点位置
      })
    }).catch(e => {
      console.log(e)
    })
  })

  onCleanup(() => {
    map?.destroy()
  })

  return (
    <div id="container" class="p-0 m-0 w-full"></div>
  )
}

export default Index