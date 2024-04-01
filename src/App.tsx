import { Route } from "@solidjs/router"
import { Switch, Match, lazy, createSignal } from "solid-js"

import './App.css'

const Home = lazy(() => import("./pages/home/Layout"))

function App() {
  const [err, setErr] = createSignal<string>()
  setErr(undefined)

  return (
    <>
      <Switch
        fallback={
          <>
            <Route
              path="*"
              component={Home}
            />
            <Route
              path="/warning"
              component={() => <div class="bg-slate-800 p-6 text-white h-full flex items-center justify-center text-xl font-bold">很抱歉，本页面不支持手机访问，请使用电脑访问</div>}
            />
          </>
        }
      >
        <Match when={err() !== undefined}>
          <div>Error</div>
        </Match>
      </Switch>
    </>
  )
}

export default App
