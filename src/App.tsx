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
