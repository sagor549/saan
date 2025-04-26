"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Dashboard from "./components/Dashboard"
import Pricing from "./components/Pricing"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"
import "./index.css"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Initialize dark background animation
    const ctx = gsap.context(() => {
      gsap.to("body", {
        backgroundColor: "#030712",
        duration: 1,
        ease: "power2.inOut",
      })
    }, appRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={appRef} className="min-h-screen bg-gray-950 text-white">
      <div className="noise-bg"></div>
      <Header />
    
        <Hero/>
      
      <Features />
      <Dashboard />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  )
}

export default App
