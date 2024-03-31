import { createSignal, onMount, For } from "solid-js"

import tab2Img from "../../../assets/Spatiality.png"
import tab3Img from "../../../assets/Authoritativeness.png"

const Source = () => {
  const [activeTab, setActiveTab] = createSignal<number>(0)
  const [img, setImg] = createSignal<string>("")
  const [desc, setDesc] = createSignal<string>("")

  const sources = [
    {
      name: "时间尺度",
      img: tab2Img,
      desc: "数据集涵盖了从2017-2023的季节内至季节尺度，6年的长时期数据为模型的准确度奠定坚实基础。"
    },
    {
      name: "空间尺度",
      img: tab2Img,
      desc: "主要采用了西北太平洋海域，涵盖南海地区的（0°-30°N,100°E-180°E）区域，该片海域是全世界台风最频繁的地区之一，为模型的训练提供大量的台风案例，大大提高了方案的可行性"
    },
    {
      name: "权威性",
      img: tab3Img,
      desc: "本项目所用数据均来源于由世界气象组织WMO主持的s2s项目官网，来源于11个不同国家的官方气象预报模型。"
    },
  ]

  const handleActiveTab = (index: number) => {
    setActiveTab(index)
    setImg(sources[index].img)
    setDesc(sources[index].desc)
  }

  onMount(() => {
    handleActiveTab(0)
  })

  return (
    <div class="h-screen bg-slate-800">
      <div class="h-full flex flex-col items-center text-white">
        <div class="pt-8 pb-4 font-bold text-4xl">数据来源</div>
        <div class="w-7/12 p-4">
          <img src={img()} alt="#" />
        </div>
        <div class="flex">
          <For each={sources} fallback={<div>Loading...</div>}>
            {
              (item, index) => (
                <div
                  class={activeTab() == index() ? "p-3 font-bold border-b-2 border-white" : "p-3"}
                  onClick={() => handleActiveTab(index())}
                >
                  {item.name}
                </div>
              )
            }
          </For>
        </div>
        <p class="w-1/2 p-6 text-center">{desc()}</p>
      </div>
    </div>
  )
}

export default Source