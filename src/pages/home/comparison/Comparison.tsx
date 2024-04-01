import { createSignal, For } from "solid-js"
import { FaSolidAngleLeft, FaSolidAngleRight } from 'solid-icons/fa'

import exampleImg from "../../../assets/Spatiality.png"

const Index = () => {
  const [cur, setCur] = createSignal<number>(0)

  const compare = [
    {
      label: "实际情况",
      img: exampleImg,
    },
    {
      label: "集成预测结果",
      img: exampleImg,
    },
  ]

  const other = [
    {
      label: "BOM",
      img: exampleImg,
    },
    {
      label: "CMA",
      img: exampleImg,
    },
    {
      label: "ECCC",
      img: exampleImg,
    },
    {
      label: "ECMWF",
      img: exampleImg,
    },
    {
      label: "HMCR",
      img: exampleImg,
    },
    {
      label: "ISAC",
      img: exampleImg,
    },
    {
      label: "JMA",
      img: exampleImg,
    },
    {
      label: "KMA",
      img: exampleImg,
    },
    {
      label: "METFR",
      img: exampleImg,
    },
    {
      label: "NCEP",
      img: exampleImg,
    },
    {
      label: "UKOM",
      img: exampleImg,
    },
  ]

  const handleNext = () => {
    setCur(cur() >= other.length - 1 ? 0 : cur() + 1)
  }

  const handlePrev = () => {
    setCur(cur() <= 0 ? other.length - 1 : cur() - 1)
  }

  return (
    <div class="h-screen bg-slate-800">
      <div class="h-full flex flex-col items-center text-white">
        <div class="flex pt-8 mb-4">
          <div class="flex flex-col">
            <For each={compare} fallback={<div>loding...</div>}>
              {
                (item) => (
                  <div class="p-4">
                    <div class="p-2 text-center">{item.label}</div>
                    <div>
                      <img class="w-[243px] h-[93px] object-cover" src={item.img} alt="#" />
                    </div>
                  </div>
                )
              }
            </For>
          </div>
          <div class="flex items-center px-4">
            {/* carousel */}
            <button onClick={handlePrev}>
              <FaSolidAngleLeft />
            </button>
            <div class="p-4">
              <div class="p-2 text-center">{other[cur()].label}</div>
              <div>
                <img class="w-[243px] h-[93px] object-cover" src={other[cur()].img} alt="#" />
              </div>
            </div>
            <button onClick={handleNext} >
             <FaSolidAngleRight />
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="text-2xl font-bold text-center p-4">比较结果</div>
          <div class="p-2">
            <div class="p-2">
              <div class="text-xl font-semibold p-4">- 台风的数量预测效果</div>
              <p>xxxxxxxxxxxxxxxxxxxxx</p>
            </div>
            <div class="p-2">
              <div class="text-xl font-semibold p-4">- 台风的大致位置预测效果</div>
              <p>xxxxxxxxxxxxxxxxxxxxx</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index