import { useLocation } from "@solidjs/router"
import { Switch, Match, lazy } from "solid-js"

const Home = lazy(() => import("./home/Home"))
const Source = lazy(() => import("./source/Source"))
const Introduction = lazy(() => import("./introduction/Introduction"))
const Forecast = lazy(() => import("./forecast/Forecast"))
const Comparison = lazy(() => import("./comparison/Comparison"))

export const Body = () => {
  const l = useLocation()
  return (
    <div class="pt-16 min-h-full">
      <Switch fallback={<div>not found</div>}>
        <Match when={l.pathname == "/"}>
          <Home />
        </Match>
        <Match when={l.pathname == "/source"}>
          <Source />
        </Match>
        <Match when={l.pathname == "/introduction"}>
          <Introduction />
        </Match>
        <Match when={l.pathname == "/forecast"}>
          <Forecast />
        </Match>
        <Match when={l.pathname == "/comparison"}>
          <Comparison />
        </Match>
      </Switch>
    </div>
  )
}