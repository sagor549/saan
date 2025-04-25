"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, X } from "lucide-react"
import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams and startups",
    features: ["Up to 5 team members", "Basic analytics", "1GB storage", "Email support", "Basic integrations"],
    notIncluded: ["Advanced security", "Custom workflows", "API access"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing businesses",
    features: [
      "Up to 20 team members",
      "Advanced analytics",
      "10GB storage",
      "Priority support",
      "Advanced integrations",
      "Basic security features",
      "Custom workflows",
    ],
    notIncluded: ["Enterprise API access"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$249",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited team members",
      "Enterprise analytics",
      "Unlimited storage",
      "24/7 dedicated support",
      "All integrations",
      "Advanced security",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
]

const testimonials = [
  {
    quote:
      "SAAN has transformed how our team works. The analytics dashboard gives us insights we never had before, and the automation features have saved us countless hours.",
    name: "Sarah Johnson",
    title: "CTO at TechCorp",
  },
  {
    quote:
      "The security features in SAAN give us peace of mind. We handle sensitive data, and knowing it's protected with enterprise-grade security is invaluable.",
    name: "Michael Chen",
    title: "Security Director at FinanceHub",
  },
  {
    quote:
      "Implementation was seamless, and the ROI was immediate. Our team productivity increased by 35% in the first month alone.",
    name: "Jessica Williams",
    title: "Operations Manager at GrowthCo",
  },
  {
    quote:
      "The customizable dashboards allow each department to focus on their KPIs while giving leadership a bird's-eye view of the entire operation.",
    name: "David Rodriguez",
    title: "CEO at ScaleUp Inc",
  },
  {
    quote:
      "Customer support is exceptional. Any time we've had questions, the team has been responsive and helpful beyond our expectations.",
    name: "Emily Thompson",
    title: "Product Manager at InnovateTech",
  },
]

const Pricing = () => {
  const pricingRef = useRef(null)
  const plansRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".pricing-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".pricing-title",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate pricing cards
      plansRef.current.forEach((plan, index) => {
        gsap.from(plan, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: plan,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    }, pricingRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={pricingRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="pricing-title text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Flexible Pricing for Teams of All Sizes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (plansRef.current[index] = el)}
              className={`relative bg-gray-900 border ${
                plan.popular ? "border-cyan-500" : "border-gray-800"
              } rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular ? "hover:shadow-cyan-500/20" : "hover:shadow-gray-800/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <button
                  className={`w-full py-3 rounded-md ${
                    plan.popular ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-gray-800 hover:bg-gray-700"
                  } text-white font-medium transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="border-t border-gray-800 p-6">
                <h4 className="text-sm font-medium text-white mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={16} className="text-cyan-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-500">
                      <X size={16} className="text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">What Our Customers Say</h3>
            <p className="text-gray-400">Join thousands of satisfied teams using SAAN</p>
          </div>

          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Need a custom solution?</h3>
            <p className="text-gray-400">Contact our sales team to build a plan that perfectly suits your needs</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity">
              Contact Sales
            </button>
            <button className="px-8 py-3 rounded-md border border-gray-600 text-white font-medium hover:bg-gray-700 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
