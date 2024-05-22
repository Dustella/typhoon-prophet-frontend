import comparing from "../../../assets/comparing.jpg";
import sequence from "../../../assets/Sequence 01_1.mp4";

const Index = () => {
  return (
    <div class="min-h-screen relative">
      <h1 class="text-center text-3xl font-bold mt-10">模型比对结果</h1>
      <div class="w-[80vw] mx-auto">
        <div>
          <img src={comparing} alt="comparing" class="w-full" />
        </div>
        <div class="w-7/8 mx-auto">
          <video src={sequence} autoplay loop muted class="w-full "></video>
          <p class="text-center text-lg mt-5">
            2023年6月1日发布的预报序列中的第6~11天，视频中的台风为“古超”
          </p>
        </div>
        <div class="h-[20rem]"></div>
      </div>
    </div>
  );
};

export default Index;
