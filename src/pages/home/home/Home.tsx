import bgVideo from "../../../assets/backguround.mp4";
import earthImg from "../../../assets/earth.jpg";
import stone from "../../../assets/stone.jpg";
import { FaSolidPlay } from "solid-icons/fa";
const Index = () => {
	return (
		<div class="min-h-screen relative text-white">
			<video
				class="absolute left-0 top-0 object-cover h-screen w-full -z-50"
				autoplay
				loop
				muted
			>
				<source src={bgVideo} type="video/mp4" />
			</video>
			<div class="h-screen flex flex-col items-center justify-center">
				<span class="text-4xl font-bold py-4 flex items-center">
					捕<div class="text-5xl">「风」</div>捉影
					<hr class="ml-2 mr-[25rem] w-[10rem] h-[5px] bg-white rounded-lg" />
				</span>
				<h1 class="text-4xl font-bold">
					<div class="ml-[15rem]">季节内至季节尺度台风集成预报系统</div>
				</h1>
				<a class="btn my-8" href="/forecast">
					<div>开始更早更准确的台风预报</div>
					<FaSolidPlay class="mx-1" />
				</a>
			</div>
			<div class="hero p-10 bg-slate-800">
				<div class="hero-content flex-col lg:flex-row">
					<img src={earthImg} alt="#" class="max-w-xl rounded-lg shadow-2xl" />
					<div class="mx-6">
						<h1 class="text-4xl font-bold">多种预报</h1>
						<ul class="p-6 list-disc">
							<li class="py-2">支持多种预报模式的展示，更方便融合与决策</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="hero p-10 bg-slate-800">
				<div class="hero-content flex-col lg:flex-row-reverse">
					<img src={stone} alt="#" class="max-w-xl rounded-lg shadow-2xl" />
					<div class="mx-6">
						<h1 class="text-4xl font-bold">理论基础</h1>
						<ul class="p-6 list-disc">
							<li class="py-2">
								基于多篇论文的参考与研究，给出更科学的预报结果
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
