import { FaRegularCircleDot, FaRegularCircle, FaSolidAngleDown, FaSolidAngleUp } from 'solid-icons/fa'
import { createSignal, onMount, For, Show } from "solid-js"

import exampleImg from "../../../assets/Spatiality.png"



const Index = () => {
  const [curModel, setCurModel] = createSignal<number>(0)
  const [isOpen, setIsOpen] = createSignal<boolean>(false)

  const models = [
    {
      label: "第一代模型",
      img: exampleImg,
      name: "Model A",
      desc: "这是Model A的描述信息",
    },
    {
      label: "第二代模型",
      img: exampleImg,
      name: "Model B",
      desc: "这是Model B的描述信息",
    },
    {
      label: "第三代模型",
      img: exampleImg,
      name: "Model C",
      desc: "这是Model C的描述信息",
    },
  ]

  const handleSelectModel = (index: number) => {
    setCurModel(index)
  }

  const handleToggleDesc = () => {
    setIsOpen(!isOpen())
  }

  onMount(() => {
    handleSelectModel(0)
  })

  return (
    <div class="h-screen bg-slate-800">
      <div class="f-full flex flex-col items-center text-white">
        <div class="pt-8 pb-4 font-bold text-4xl">模型介绍</div>
        <ul class="timeline pb-10">
          <For each={models}>
            {
              (item, index) => {
                let modelsLength = models.length
                return (
                  <li onClick={() => handleSelectModel(index())}>
                    <Show when={index() !== 0}>
                      <hr />
                    </Show>
                    <div class="timeline-middle">
                      <Show when={index() === curModel()} fallback={<FaRegularCircle />}>
                        <FaRegularCircleDot />
                      </Show>
                    </div>
                    <div class={index() === curModel() ? "timeline-end px-8 py-4 text-xl font-bold" : "timeline-end px-8 py-4 text-xl"}>{item.label}</div>
                    <Show when={index() !== modelsLength - 1}>
                      <hr />
                    </Show>
                  </li>
                )
              }
            }
          </For>
        </ul>
        <div class="card w-96 bg-slate-600 shadow-xl">
          <figure>
            <img class="w-96 h-52 object-cover" src={ models[curModel()].img } alt="#" />
          </figure>
          <div class="card-body">
            <div class="collapse" onClick={handleToggleDesc}>
              <input type="checkbox" />
              <div class="collapse-title text-xl font-semibold flex justify-between items-center">
                <span>{ models[curModel()].name }</span>
                <Show when={isOpen()} fallback={<FaSolidAngleDown />}>
                 <FaSolidAngleUp />
                </Show>
              </div>
              <div class="collapse-content">
                <p>{ models[curModel()].desc }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index