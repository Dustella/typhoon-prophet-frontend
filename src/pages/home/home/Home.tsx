import bgVideo from "../../../assets/backguround.mp4"

const Index = () => {
  return (
    <div class="h-screen relative">
      <video class="absolute left-0 top-0 object-cover min-h-full min-w-full -z-50" autoplay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div class="h-full flex flex-col items-center justify-center text-white">
        <span class="text-3xl py-6">季节内至季节尺度</span>
        <h1 class="text-5xl font-bold">台风集成预测系统</h1>
        <p class="py-6">让台风预测“更”准确</p>
      </div>
    </div>
  )
}

export default Index