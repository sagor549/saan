"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Layers, BarChart3, Users, Cpu, Lock, Zap, Globe, Code } from "lucide-react"
import { TracingBeam } from "./ui/tracing-beam"
import { HoverEffect } from "./ui/card-hover-effect"
import { Spotlight } from "./ui/spotlight"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const featuresList = [
  {
    icon: <BarChart3 className="w-10 h-10 text-cyan-500" />,
    title: "Advanced Analytics",
    description: "Gain deep insights with our powerful analytics tools designed for data-driven decisions."
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-500" />,
    title: "Enterprise Security",
    description: "Bank-level security with advanced encryption and compliance with global standards."
  },
  {
    icon: <Cpu className="w-10 h-10 text-indigo-500" />,
    title: "AI-Powered Automation",
    description: "Automate complex workflows with our intelligent AI systems that learn and adapt."
  },
  {
    icon: <Users className="w-10 h-10 text-cyan-500" />,
    title: "Team Collaboration",
    description: "Seamless collaboration tools that bring your team together no matter where they are."
  },
  {
    icon: <Layers className="w-10 h-10 text-blue-500" />,
    title: "Scalable Infrastructure",
    description: "Built on a robust, scalable architecture that grows with your business needs."
  },
  {
    icon: <Lock className="w-10 h-10 text-indigo-500" />,
    title: "Role-Based Access",
    description: "Granular permission controls to ensure the right people have the right access."
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Lightning Performance",
    description: "Optimized for speed with global CDN delivery and advanced caching mechanisms."
  },
  {
    icon: <Globe className="w-10 h-10 text-green-500" />,
    title: "Global Availability",
    description: "99.99% uptime with distributed infrastructure across multiple geographic regions."
  },
  {
    icon: <Code className="w-10 h-10 text-purple-500" />,
    title: "Developer APIs",
    description: "Comprehensive API suite allowing seamless integration with your existing systems."
  }
]

const Features = () => {
  const featuresRef = useRef(null)
  const cardsRef = useRef([])
  const [activeFeature, setActiveFeature] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".features-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".features-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate feature cards with staggered effect
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  // Cards for the HoverEffect component
  const cards = featuresList.slice(0, 6).map((feature) => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon,
  }))

  return (
    <section id="features" ref={featuresRef} className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-600/10 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-600/10 opacity-10 rounded-full blur-3xl"></div>
      
      {/* Spotlight effect for subtle interactivity */}
      <Spotlight
        className="top-10 left-0 md:left-60 z-0"
        fill="blue"
        size={1000}
      />
      
      {/* Use TracingBeam with increased opacity */}
      <TracingBeam className="opacity-70">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-400 text-sm font-medium mb-4">
              POWERFUL CAPABILITIES
            </span>
            <h2 className="features-title text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Enterprise-Grade Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Powerful tools designed for modern businesses to streamline operations and drive growth
            </p>
          </div>

          {/* Enhanced feature cards without BackgroundGradient */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="feature-card bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 
                  hover:border-cyan-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20
                  cursor-pointer group relative overflow-hidden"
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Subtle gradient background that animates on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeFeature === index ? 'max-h-24' : 'max-h-0'}`}>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial section with simple border glow effect */}
          <div className="mt-24 mb-16 relative group">
            {/* Border glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-700"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-gray-800">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span className="text-2xl md:text-4xl font-bold text-white">S</span>
                  </div>
                </div>
                <div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-300 italic mb-4">
                    "SAAN has transformed how we handle our data infrastructure. The performance gains and security features alone have saved us countless hours and resources."
                  </blockquote>
                  <div className="flex items-center">
                    <span className="font-semibold text-white">Sarah Chen</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400">CTO at TechForward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why choose us section with improved banner instead of TextRevealCard */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-400 text-sm font-medium mb-4">
                WHY CHOOSE US
              </span>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Why Teams Choose SAAN
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Discover the advantages that make SAAN the preferred choice for forward-thinking organizations
              </p>
            </div>

            {/* Simple banner with gradient effect */}
            <div className="relative w-full h-48 mb-16 overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transition-opacity duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Enterprise-Grade Platform</h4>
                <p className="text-cyan-300 text-lg md:text-xl">Built for modern teams by enterprise engineers</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            </div>

            <HoverEffect items={cards} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" />
          </div>
          
          {/* CTA Section with improved button styling */}
          <div className="mt-24 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-8 py-4 bg-gray-900 rounded-lg text-white font-medium hover:bg-gray-800/90 transition-colors">
                Start Your Free Trial
              </button>
            </div>
            <p className="mt-4 text-gray-400">No credit card required • 14-day free trial • Full access</p>
          </div>
        </div>
      </TracingBeam>
    </section>
  )
}

export default Features