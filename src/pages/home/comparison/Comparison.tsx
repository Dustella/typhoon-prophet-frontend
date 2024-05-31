import comparing from "../../../assets/comparing.jpg";
import sequence from "../../../assets/Sequence 01_1.mp4";

const Index = () => {
	return (
		<div class="min-h-screen bg-slate-800">
			<div class="f-full text-white py-20">
				<div class="max-w-[980px] mx-auto shadow-2xl rounded-3xl flex flex-col items-center p-10 bg-slate-600">
					<div class="pt-4 font-bold mb-10 text-4xl text-center">模型对比结果</div>
					<div class="w-full mx-auto">
						<div>
							<img src={comparing} alt="comparing" class="w-full rounded-3xl" />
						</div>
						<div class="w-7/8 m-10 mx-auto">
							<video src={sequence} autoplay loop muted class="w-full rounded-3xl"></video>
							<p class="text-center text-lg mt-5">
								2023年6月1日发布的预报序列中的第6~11天，视频中的台风为“古超”
							</p>
						</div>
						<div class="h-full"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
