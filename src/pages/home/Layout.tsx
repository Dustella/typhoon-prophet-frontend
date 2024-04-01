import { onMount } from "solid-js"
import { useNavigate } from "@solidjs/router"
import Lenis from '@studio-freight/lenis'
import { Header } from "./Header"
import { Body } from "./Body"
import { Footer } from "./Footer"

const Index = () => {
  const lenis = new Lenis()

  const raf = (time:number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const isMobileDevice = () => {
    return window.innerWidth < 768
  }

  onMount(() => {
    if (isMobileDevice()) {
      useNavigate()("/warning")
    } 
  })

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
}

export default Index