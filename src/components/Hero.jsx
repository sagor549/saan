"use client"
import React from 'react';

import dashboard from "/assets/dash.png"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ChevronRight, Star } from "lucide-react"

import { SparklesCore } from "./ui/SparklessCore" 
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { useScroll, useTransform, motion } from "framer-motion"
import { TextRevealCard } from "./ui/text-reveal-card"
import CustomerImages from "./CustomerImages"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ContainerScroll component for the SVG animation
const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  
  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1, 0.95];
  };
  
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div
      className="h-[60rem] sm:h-[70rem] md:h-[85rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}>
      <div
        className="py-6 sm:py-10 md:py-24 w-full relative"
        style={{
          perspective: "1000px",
        }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-6xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
};

const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 sm:-mt-14 md:-mt-10 mx-auto h-[20rem] sm:h-[24rem] md:h-[38rem] w-full border-2 sm:border-4 border-[#6C6C6C] p-1 sm:p-2 md:p-6 bg-[#222222] rounded-[20px] sm:rounded-[30px] shadow-2xl">
      <div
        className="h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

// Number counter animation component
const AnimatedCounter = ({ value, label }) => {
  const counterRef = useRef(null);
  const [displayed, setDisplayed] = useState("0");
  
  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(value.replace(/,/g, "")) || 0;
          const duration = 2000;
          const increment = Math.ceil(end / (duration / 16)) || 1;
          
          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              setDisplayed(value);
              clearInterval(timer);
              return;
            }
            
            // Format the number with commas if needed
            setDisplayed(start.toLocaleString());
          }, 16);
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <div className="text-center py-2 sm:py-4">
      <div ref={counterRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-3">{displayed}</div>
      <div className="text-xs sm:text-sm md:text-base text-gray-400">{label}</div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const textRevealRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      })

      // Animate the description
      gsap.from(".hero-description", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      })

      // Animate the buttons
      gsap.from(".hero-buttons", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.7,
      })

      // Animate text reveal section
      gsap.from(textRevealRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      })

      // Animate stats
      gsap.from(statsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
        },
      })

      // Animate the floating shapes
      gsap.to(".floating-shape", {
        y: "-20px",
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const words = "Elevate your business with our advanced SaaS platform"

  // Title component for the ContainerScroll
  const TitleComponent = () => (
    <div className="mx-auto px-4 sm:px-6 md:px-8">
      <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-4 sm:mb-6 md:mb-8">
        <span className="text-xs sm:text-sm font-medium text-cyan-400 mr-1 sm:mr-2">New</span>
        <span className="text-xs sm:text-sm text-gray-300 font-mono">Dashboard 2.0 is now available</span>
        <ChevronRight size={14} className="text-gray-400 ml-1 sm:ml-2 hidden sm:inline" />
      </div>

      <h1 className="hero-title mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
        <span
          className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-blue-300"
          style={{ 
            fontFamily: "'pro', sans-serif", 
            fontSize: "clamp(2rem, 6vw, 10rem)" 
          }}
        >
          <TextGenerateEffect words={words} />
        </span>
      </h1>

      <p className="hero-description text-gray-400 text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-2" style={{ fontFamily: "timebold" }} >
        Streamline operations, gain valuable insights, and scale your business with our comprehensive SaaS
        solution. Built for modern teams.
      </p>

      <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-12">
        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 font-sans text-sm sm:text-base">
          Start Free Trial <ArrowRight size={16} className="hidden sm:inline" />
        </button>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-md border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white font-medium hover:bg-gray-800 transition-all font-sans text-sm sm:text-base">
          View Demo
        </button>
      </div>

      <div ref={textRevealRef} className="mb-6 sm:mb-8 md:mb-12 scale-75 sm:scale-90 md:scale-100 transform-gpu">
        <TextRevealCard
          text="You have problem ?"
          revealText="We have solution"
          className="mx-auto w-140 h-40 text-center" 
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-center">
          {/* Using the imported CustomerImages component here */}
          <div className="scale-90 sm:scale-100">
            <CustomerImages />
          </div>
          <div className="text-xs sm:text-base md:text-lg text-gray-400 ml-2 sm:ml-3">
            <span className="text-white font-medium">2,500+</span> teams using SAAN
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="text-yellow-500 fill-yellow-500 sm:size-16" />
            ))}
          </div>
          <span className="text-xs sm:text-base md:text-lg text-gray-400 ml-2 sm:ml-3">5.0 (2k+ reviews)</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-4 md:pb-8"
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape absolute top-1/4 left-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 rounded-full bg-cyan-600/10 blur-3xl"></div>
        <div
          className="floating-shape absolute bottom-1/3 right-1/3 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 rounded-full bg-blue-600/10 blur-3xl"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="floating-shape absolute top-2/3 left-1/2 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full bg-indigo-600/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 z-10">
        {/* Use ContainerScroll for the dashboard preview */}
        <ContainerScroll 
          titleComponent={<TitleComponent />}
        >
          <div className="h-full flex items-center justify-center bg-gray-900">
            <div className="relative bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl w-full h-full">
              <div className="h-6 sm:h-8 md:h-10 bg-gray-800 flex items-center px-2 sm:px-4 border-b border-gray-700">
                <div className="flex space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-600"></div>
                </div>
              </div>
              <div className="p-2 sm:p-4 h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] md:h-[calc(100%-2.5rem)] flex items-center justify-center overflow-auto">
                <img
                  src={dashboard}
                  alt="SAAN Dashboard"
                  className="w-full h-auto object-contain max-w-full"
                  style={{ maxHeight: "100%" }}
                />
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* Stats section with animated counters */}
      <div
        ref={statsRef}
        className="w-full bg-gradient-to-t from-transparent to-transparent py-4 sm:py-8 md:py-12 -mt-16 sm:-mt-16 md:-mt-20 relative top-10 sm:top-16 md:top-20"
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-10">
            <AnimatedCounter value="99.9" label="Uptime guarantee" />
            <AnimatedCounter value="24/7" label="Expert support" />
            <AnimatedCounter value="100k+" label="Active users" />
            <AnimatedCounter value="250+" label="Integrations" />
          </div>
        </div>
      </div>

      {/* SparklesCore positioned where you want it */}
      <div className="w-full absolute bottom-0 left-0 right-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={60}
          className="w-full h-20 sm:h-32 md:h-40"
          particleColor="#2563eb"
        />
      </div>
    </section>
  )
}

export default Hero