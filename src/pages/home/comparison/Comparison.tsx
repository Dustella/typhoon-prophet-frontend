import { createSignal, For } from "solid-js"
import { FaSolidAngleLeft, FaSolidAngleRight } from 'solid-icons/fa'

import cma from "../../../assets/examples/cma.png"
import eccc from "../../../assets/examples/eccc.png"
import ecmwf from "../../../assets/examples/ecmwf.png"
import isac from "../../../assets/examples/isac.png"
import kma from "../../../assets/examples/kma.png"
import ncep from "../../../assets/examples/ncep.png"
import ukom from "../../../assets/examples/ukmo.png"
import obs from "../../../assets/examples/obs.png"
import inception from "../../../assets/examples/inception.png"

const Index = () => {
  const [cur, setCur] = createSignal<number>(0)

  const compare = [
    {
      label: "实际情况",
      img: obs,
    },
    {
      label: "集成预报结果",
      img: inception,
    },
  ]

  const other = [
    {
      label: "CMA模型预报结果",
      img: cma,
    },
    {
      label: "ECCC模型预报结果",
      img: eccc,
    },
    {
      label: "ECMWF模型预报结果",
      img: ecmwf,
    },
    {
      label: "ISAC模型预报结果",
      img: isac,
    },
    {
      label: "KMA模型预报结果",
      img: kma,
    },
    {
      label: "NCEP模型预报结果",
      img: ncep,
    },
    {
      label: "UKMO模型预报结果",
      img: ukom,
    },
  ]

  const handleNext = () => {
    setCur(cur() >= other.length - 1 ? 0 : cur() + 1)
  }

  const handlePrev = () => {
    setCur(cur() <= 0 ? other.length - 1 : cur() - 1)
  }

  return (
    <div class="min-h-screen bg-slate-800">
      <div class="h-full flex flex-col items-center text-white">
        <div class="flex pt-8 mb-4">
          <div class="flex flex-col">
            <For each={compare} fallback={<div>loding...</div>}>
              {
                (item) => (
                  <div class="p-4">
                    <div class="p-2 text-center">{item.label}</div>
                    <div>
                      <img class="w-[489px] h-[194px] object-cover" src={item.img} alt="#" />
                    </div>
                  </div>
                )
              }
            </For>
          </div>
          <div class="flex items-center px-4">
            {/* carousel */}
            <div class="p-4">
              <div class="p-2 text-center">{other[cur()].label}</div>
              <div class="flex items-center">
                <button class="p-2" onClick={handlePrev}>
                  <FaSolidAngleLeft />
                </button>
                <img class="w-[489px] h-[194px] object-cover" src={other[cur()].img} alt="#" />
                <button class="p-2" onClick={handleNext} >
                  <FaSolidAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="text-2xl font-bold text-center p-4">案例对比</div>
          <div class="p-2">
            <div class="p-2">
              <div class="text-xl font-semibold p-4">- 优势</div>
              <p>从对比案例来看，排除掉海南的小片区域不太可能产生台风，最终预测的位置与实际位置偏离不大，并且也超过了大部分的模型</p>
            </div>
            <div class="p-2">
              <div class="text-xl font-semibold p-4">- 不足</div>
              <p>与实际还是有一定出入，需要继续优化到大概一致才能投入到生产生活当中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index