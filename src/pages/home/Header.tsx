import { RiWeatherTyphoonFill } from 'solid-icons/ri'

export const Header = () => {
  return (
    <>
      <div class="navbar bg-slate-900 text-white shadow-md fixed top-0 z-50">
        <div class="navbar-start ps-4">
          <RiWeatherTyphoonFill color="#4b81ee" size="3rem" />
          <span class="text-xl">台风集成预报系统</span>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost text-xl" href="/">首页</a>
          <a class="btn btn-ghost text-xl" href="/source">数据来源</a>
          <a class="btn btn-ghost text-xl" href="/introduction">模型介绍</a>
          <a class="btn btn-ghost text-xl" href="/forecast">台风预报</a>
          <a class="btn btn-ghost text-xl" href="/comparison">现有对比</a>
        </div>
        <div class="navbar-end"></div>
      </div>
    </>
  )
}