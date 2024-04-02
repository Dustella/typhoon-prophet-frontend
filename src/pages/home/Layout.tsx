import { onMount } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { Header } from "./Header"
import { Body } from "./Body"
import { Footer } from "./Footer"

const Index = () => {
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