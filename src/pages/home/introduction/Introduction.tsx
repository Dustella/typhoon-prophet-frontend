import {
  FaRegularCircleDot,
  FaRegularCircle,
  FaSolidAngleDown,
  FaSolidAngleUp,
} from "solid-icons/fa";
import { createSignal, onMount, For, Show } from "solid-js";

import MiniModelImg from "../../../assets/model/Mini.png";
import Unet from "../../../assets/model/Unet.jpg";
import DesignModel from "../../../assets/model/DesignModel.png";
import arch from "../../../assets/arch.png";

const Index = () => {
  const [curModel, setCurModel] = createSignal<number>(0);
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const models = [
    {
      label: "第一代模型",
      img: MiniModelImg,
      name: "Minisegnet自设计模型",
      desc: "第一代的模型较为简单，先在编码器里使用了两层卷积+两次池化，再在解码器中进行两次的反卷积，从而提取学习图像的特征。",
    },
    {
      label: "第二代模型",
      img: Unet,
      name: "UNet模型",
      desc: "由于第一次模型性能上存在不足，我们更换了常用的的标准UNet模型作为第二代模型进行实验。效果比第一代有所提升。",
    },
    {
      label: "第三代模型",
      img: DesignModel,
      name: "Inception Generator模型",
      desc: "考虑到台风预报的发展与时间也有关系，于是加入了时间输入，但是UNet在加入时间输入后容易过拟合，于是重新设计了新的模型。新的模型使用两层InceptionBlock来提取特征，再将特征进行融合，参考了谷歌的Inception网络结构，并行学习特征，减少了模型的复杂度，避免模型学习上过拟合",
    },
  ];

  const handleSelectModel = (index: number) => {
    setCurModel(index);
  };

  const handleToggleDesc = () => {
    setIsOpen(!isOpen());
  };

  onMount(() => {
    handleSelectModel(0);
  });

  return (
    <div class="min-h-screen bg-slate-800">
      <div class="f-full text-white py-20">
        <div class="max-w-[980px] mx-auto shadow-2xl rounded-3xl flex flex-col items-center p-10 bg-slate-600">
          <div class="pt-4 font-bold text-4xl text-center">模型介绍</div>
          <div class="max-w-[980px] pt-10">
            <p class="py-3">
              由于热带气旋是罕见事件，人类有观测的台风数据十分有限，因此可用来训练和测试的数据集非常少。本工作采用2017-2023年的S2S数据集，该时段内西北太平洋海域总共只发生了100个左右的台风。规模很小的数据集导致复杂的网络结构极其容易导致过拟合，这对于生成式网络是极大的挑战。无论是传统的语义分割模型如
              UNet，或者现代的基于 Transformer
              的各种生成式模型，在面对极少量的S2S台风数据集时，都会遇到极为严重的过拟合问题。
            </p>
            <p>
              <a
                class="link"
                rel="noreferrer noopener"
                target="_blank"
                href="https://s1-cdn.dustella.net/%E4%BD%99%E7%BF%B0%E6%96%87%E6%AF%95%E4%B8%9A%E8%AE%BA%E6%96%87%EF%BC%88%E6%AF%94%E8%B5%9B%E7%94%A8%EF%BC%89.pdf"
              >
                完整论文
              </a>
            </p>

            <div>
              <img src={arch} alt="" class="rounded-3xl my-5" />
            </div>
            <p class="py-3">
              为此，本方法通过两种方法提高预报性能。首先，本方法提出了一种轻量化的网络
              LMCNet，可以在训练样本极少的情况下，有效利用不同模式的预报特征，对多个模式的预报进行集成，加强预报结果的准确性。相比较于传统的
              UNet 等参数量超过 10M 的模型，本文提出的模型非常轻量，总共只有
              10.6k
              的参数，却同样拥有较强的特征捕获能力，获得了比UNet等复杂模型更好的性能。其次，本方法将先验的气候观测、预报时效作为额外通道输入网络。通过历史统计数据，网络有能力对多模式预报结果进行纠偏，去除不该存在的预报值，并加强正确位置的预报。由于预报时效决定了多模式预报内容的可靠性，提供给网络预报时效可以决定预报内容的倾向。
            </p>
          </div>
          <ul class="timeline pb-10">
            <For each={models}>
              {(item, index) => {
                let modelsLength = models.length;
                return (
                  <li onClick={() => handleSelectModel(index())}>
                    <Show when={index() !== 0}>
                      <hr />
                    </Show>
                    <div class="timeline-middle">
                      <Show
                        when={index() === curModel()}
                        fallback={<FaRegularCircle />}
                      >
                        <FaRegularCircleDot />
                      </Show>
                    </div>
                    <div
                      class={
                        index() === curModel()
                          ? "timeline-end px-8 py-4 text-xl font-bold"
                          : "timeline-end px-8 py-4 text-xl"
                      }
                    >
                      {item.label}
                    </div>
                    <Show when={index() !== modelsLength - 1}>
                      <hr />
                    </Show>
                  </li>
                );
              }}
            </For>
          </ul>
          <div class="card max-w-4xl bg-slate-600 shadow-xl my-6">
            <figure>
              <img
                class="w-full object-cover"
                src={models[curModel()].img}
                alt="#"
              />
            </figure>
            <div class="card-body">
              <div class="collapse" onClick={handleToggleDesc}>
                <input type="checkbox" placeholder="a" />
                <div class="collapse-title text-xl font-semibold flex text-white justify-between items-center">
                  <span>{models[curModel()].name}</span>
                  <Show when={isOpen()} fallback={<FaSolidAngleDown />}>
                    <FaSolidAngleUp />
                  </Show>
                </div>
                <div class="collapse-content text-white">
                  <p>{models[curModel()].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
