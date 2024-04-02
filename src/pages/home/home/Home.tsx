import bgVideo from "../../../assets/backguround.mp4"
import earthImg from "../../../assets/earth.jpg"

const Index = () => {
  return (
    <div class="min-h-screen relative text-white">
      <video class="absolute left-0 top-0 object-cover h-screen w-full -z-50" autoplay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
      <div class="h-screen flex flex-col items-center justify-center">
        <span class="text-3xl py-6">季节内至季节尺度</span>
        <h1 class="text-5xl font-bold">台风集成预报系统</h1>
        <p class="py-6">让台风预报“更”准确</p>
      </div>
      <div class="hero p-10 bg-slate-800">
        <div class="hero-content flex-col lg:flex-row">
          <img src={earthImg} alt="#" class="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 class="text-4xl font-bold">多种预报</h1>
            <ul class="p-6 list-disc">
              <li class="py-2">支持多种预报模式在前端的渲染，更方便融合与决策</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hero p-10 bg-slate-800">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img src={earthImg} alt="#" class="max-w-xs rounded-lg shadow-2xl" />
          <div>
            <h1 class="text-4xl font-bold">理论基础</h1>
            <ul class="p-6 list-disc">
              <li class="py-2">基于多篇论文的参考与研究，给出更科学的预报结果</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index