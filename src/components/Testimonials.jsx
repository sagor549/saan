"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star } from "lucide-react"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import { HoverEffect } from "./ui/card-hover-effect"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const people = [
  {
    id: 1,
    name: "John Smith",
    designation: "CTO at TechCorp",
    image: "/assets/avatar-1.jpg?height=100&width=100",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    designation: "Product Manager at InnovateTech",
    image: "/assets/avatar-2.jpg?height=100&width=100",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "CEO at ScaleUp Inc",
    image: "/assets/avatar-3.jpg?height=100&width=100",
  },
  {
    id: 4,
    name: "Emily Thompson",
    designation: "Director at GrowthCo",
    image: "/assets/ava1.jpg?height=100&width=100",
  },
  {
    id: 5,
    name: "David Rodriguez",
    designation: "VP Engineering at FinanceHub",
    image: "/assets/ava4.jpg?height=100&width=100",
  },
]

const testimonialCards = [
  {
    title: "Transformed our workflow",
    description:
      "SAAN has completely transformed how our team works. The analytics dashboard gives us insights we never had before, and the automation features have saved us countless hours.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Enterprise-grade security",
    description:
      "The security features in SAAN give us peace of mind. We handle sensitive data, and knowing it's protected with enterprise-grade security is invaluable.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Seamless implementation",
    description:
      "Implementation was seamless, and the ROI was immediate. Our team productivity increased by 35% in the first month alone.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Customizable dashboards",
    description:
      "The customizable dashboards allow each department to focus on their KPIs while giving leadership a bird's-eye view of the entire operation.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Exceptional support",
    description:
      "Customer support is exceptional. Any time we've had questions, the team has been responsive and helpful beyond our expectations.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Scalable solution",
    description:
      "As our company has grown, SAAN has scaled with us. We started with just 5 users and now have over 100, and the platform has handled the growth flawlessly.",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
  },
]

const Testimonials = () => {
  const testimonialsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".testimonials-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonials-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate people avatars
      gsap.from(".people-section", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".people-section",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }, testimonialsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience with SAAN
          </p>
        </div>

        <div className="people-section flex flex-wrap justify-center gap-6 mb-16">
          <AnimatedTooltip items={people} />
        </div>

        <div className="max-w-7xl mx-auto">
          <HoverEffect items={testimonialCards} />
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-6">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-sm text-gray-300">5.0 from over 2,000+ reviews</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">Join thousands of satisfied teams</h3>
          <button className="px-8 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
