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

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
}

export default Index