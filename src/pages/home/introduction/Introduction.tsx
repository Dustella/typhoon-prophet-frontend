import { FaRegularCircleDot, FaRegularCircle, FaSolidAngleDown, FaSolidAngleUp } from 'solid-icons/fa'
import { createSignal, onMount, For, Show } from "solid-js"

import exampleImg from "../../../assets/Spatiality.png"
import unet from "../../../assets/Unet.jpg"


const Index = () => {
  const [curModel, setCurModel] = createSignal<number>(0)
  const [isOpen, setIsOpen] = createSignal<boolean>(false)

  const models = [
    {
      label: "第一代模型",
      img: exampleImg,
      name: "Minisegnet自设计模型",
      desc: "第一代的模型较为简单，先在编码器里使用了两层卷积+两次池化，再在解码器中进行两次的反卷积，从而提取学习图像的特征。",
    },
    {
      label: "第二代模型",
      img: unet,
      name: "UNet模型",
      desc: "在进行了第一次的调整之后，我们选择了标准的UNet模型作为第二代模型。",
    },
    {
      label: "第三代模型",
      img: exampleImg,
      name: "Model C",
      desc: "考虑到台风预测的发展与时间也有关系，于是加入了时间输入，但是UNet在加入时间输入后容易过拟合，于是重新设计了新的模型。新的模型",
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