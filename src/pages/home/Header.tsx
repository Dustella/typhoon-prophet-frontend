import { createSignal } from "solid-js";
import { VsMenu, VsClose } from "solid-icons/vs";
import { RiWeatherTyphoonFill } from "solid-icons/ri";

export const Header = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <div class="navbar bg-slate-900 text-white shadow-md fixed justify-between top-0 z-50">
        <div class="navbar-start ps-4 w-full md:w-auto">
          <RiWeatherTyphoonFill color="#4b81ee" size="3rem" />
          <span class="text-xl">季节内台风集成预报系统</span>
        </div>
        <div class="navbar-center hidden md:flex justify-center">
          <a class="btn btn-ghost text-xl" href="/">
            首页
          </a>
          <a class="btn btn-ghost text-xl" href="/source">
            数据来源
          </a>
          <a class="btn btn-ghost text-xl" href="/introduction">
            模型介绍
          </a>
          <a class="btn btn-ghost text-xl" href="/forecast">
            台风预报
          </a>
          <a class="btn btn-ghost text-xl" href="/comparison">
            案例对比
          </a>
        </div>
        <div class="navbar-end md:hidden">
          <details class={`dropdown dropdown-end ${isOpen() ? "open" : ""}`}>
            <summary
              class="m-1 btn bg-slate-700 text-white border-0"
              onClick={() => setIsOpen(!isOpen())}
            >
              {isOpen() ? <VsClose /> : <VsMenu />}
            </summary>
            <ul class="p-2 shadow menu dropdown-content z-[1] bg-slate-700 text-white rounded-box w-52 absolute ">
              <li>
                <a class="btn btn-ghost text-xl" href="/">
                  首页
                </a>
              </li>
              <li>
                <a class="btn btn-ghost text-xl" href="/source">
                  数据来源
                </a>
              </li>
              <li>
                <a class="btn btn-ghost text-xl" href="/introduction">
                  模型介绍
                </a>
              </li>
              <li>
                <a class="btn btn-ghost text-xl" href="/forecast">
                  台风预报
                </a>
              </li>
              <li>
                <a class="btn btn-ghost text-xl" href="/comparison">
                  案例对比
                </a>
              </li>
            </ul>
          </details>
        </div>

        <div class="navbar-end opacity-0 md:flex hidden w-autops-4 w-full md:w-auto">
          <RiWeatherTyphoonFill color="#4b81ee" size="3rem" />
          <span class="text-xl">季节内台风集成预报系统</span>
        </div>
      </div>
    </>
  );
};
