# 台风预报系统

## 使用方法

1. 确保你有 `pnpm`，然后

```bash
$ pnpm install # or npm install or yarn install
```

2. 复制一份 `.env.example` 到 `.env`，然后在 `.env` 中填写高德地图的 APIKey

```text
VITE_AMAP_API_KEY=你的 APIKEY
VITE_BACKEND_ADDR=你的 后端地址
```

## 开发

### `pnpm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm run build`
