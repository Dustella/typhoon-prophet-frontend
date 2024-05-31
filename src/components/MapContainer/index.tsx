import {
	onMount,
	onCleanup,
	Component,
	createEffect,
	createMemo,
} from "solid-js";
import AMapLoader from "@amap/amap-jsapi-loader";

const Index: Component<{
	date: string;
	day: string;
	model: string;
	mode: "heatmap" | "image";
}> = (props) => {
	let map: any = null;
	let heatmap: any = null;
	let imageLayer: any = null;

	const apiKey = import.meta.env.VITE_AMAP_API_KEY;
	const backendAddr = import.meta.env.VITE_BACKEND_ADDR;

	let amapInstance: any = null;

	const showLnglatHandler = (e: any) => {
		new amapInstance.InfoWindow({
			content: (
				<div class="text-black p-2">
					{e.lnglat.lng}, {e.lnglat.lat}
				</div>
			),
		}).open(map, e.lnglat);
	};

	const day = createMemo(() => props.day);
	const date = createMemo(() => props.date);
	const model = createMemo(() => props.model);
	const mode = createMemo(() => props.mode);

	const updateMap = (
		currentDay: string,
		currentDate: string,
		currentModel: string,
		currentMode: string
	) => {
		if (amapInstance == null) {
			// Sleep for 100ms and retry
			setTimeout(() => {
				updateMap(currentDay, currentDate, currentModel, currentMode);
			}, 100);
			return;
		}

		switch (currentMode) {
			case "image":
				if (heatmap) {
					heatmap.hide();
				}
				const image = new amapInstance.ImageLayer({
					url: `${backendAddr}/plot?day=${currentDay}&date=${currentDate}&model=${currentModel}`,
					bounds: new amapInstance.Bounds([100, -15], [180, 45]),
					zIndex: 2,
					opacity: 0.7,
					// zooms: [15, 20],
				});
				map.add(image);
				image.on("complete", () => {
					if (imageLayer) {
						// Clears the previous image layer
						imageLayer.hide();
					}
					imageLayer = image;
				});

				break;
			case "heatmap":
				if (imageLayer) {
					imageLayer.hide();
				}
				fetch(
					`${backendAddr}/heatmap?day=${currentDay}&date=${currentDate}&model=${currentModel}`
				)
					.then((a) => a.json())
					.then((data) => {
						if (heatmap) {
							heatmap.hide();
						}
						map.plugin(["AMap.HeatMap"], function () {
							// 在地图对象叠加热力图

							heatmap = new amapInstance.HeatMap(map, {
								radius: 100, //给定半径
								opacity: [0, 0.8],
							});
							// 设置热力图数据集
							heatmap.setDataSet({ data: data, max: 1000 });
						});
					});
				break;
			default:
				console.log("[E] Invalid display mode.");
				break;
		}
	};

	createEffect(() => {
		const [currentDay, currentDate, currentModel, currentMode] = [
			day(),
			date(),
			model(),
			mode(),
		];
		updateMap(currentDay, currentDate, currentModel, currentMode);
	});

	onMount(async () => {
		try {
			const AMap = await AMapLoader.load({
				key: apiKey,
				version: "2.0",
				plugins: [""],
			});
			amapInstance = AMap;

			map = new AMap.Map("amap-container", {
				zoom: 5,
				center: [130, 17],
				layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
			});
			var bounds = map.getBounds();
			map.setLimitBounds(bounds);

			const copyright = document.querySelector(
				".amap-copyright"
			) as HTMLDivElement;
			copyright.style.display = "block";
			copyright.style.color = "white";
			copyright.style.fontSize = "20px";
			copyright.style.lineHeight = "10px";
			copyright.innerHTML = `
      地图审图号：GS(2023)4677号 卫星图片审图号：GS(2023)4047号 测绘资质证号：甲测资字11111093
      `;

			map.on("click", showLnglatHandler);
		} catch (e) {
			console.log(e);
		}
	});

	onCleanup(() => {
		map?.destroy();
	});

	return (
		<>
			{/* <h1>{props.date}</h1> */}
			<div id="amap-container" class="p-0 m-0 w-full h-full"></div>
		</>
	);
};

export default Index;
