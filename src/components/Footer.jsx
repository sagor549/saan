"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 15C10 12.2386 12.2386 10 15 10H25C27.7614 10 30 12.2386 30 15C30 17.7614 27.7614 20 25 20H15C12.2386 20 10 17.7614 10 15Z"
                    fill="url(#footer_paint0_linear)"
                  />
                  <path 
                    d="M10 25C10 22.2386 12.2386 20 15 20H25C27.7614 20 30 22.2386 30 25C30 27.7614 27.7614 30 25 30H15C12.2386 30 10 27.7614 10 25Z" 
                    fill="url(#footer_paint1_linear)"
                  />
                  <defs>
                    <linearGradient id="footer_paint0_linear" x1="10" y1="15" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="footer_paint1_linear" x1="10" y1="25" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                SAAN
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Enterprise SaaS platform for modern businesses. Streamline operations, gain insights, and scale with
              confidence.
            </p>
            <div className="flex space-x-4 items-center">
              {/* Social media icons */}
              {[
                { name: "twitter", icon: "M36 10.5c-1.3.6-2.7 1-4.2 1.2 1.5-.9 2.7-2.4 3.2-4.1-1.4.8-3 1.4-4.7 1.7-1.3-1.4-3.2-2.3-5.3-2.3-4 0-7.3 3.3-7.3 7.3 0 .6.1 1.1.2 1.7-6.1-.3-11.5-3.2-15.1-7.6-.6 1.1-1 2.3-1 3.7 0 2.5 1.3 4.7 3.3 6-1.2 0-2.3-.3-3.3-1v.1c0 3.5 2.5 6.5 5.8 7.1-.6.2-1.2.3-1.9.3-.5 0-.9 0-1.3-.1.9 2.9 3.6 5 6.8 5-2.5 2-5.6 3.1-9 3.1-.6 0-1.2 0-1.7-.1 3.2 2.1 7 3.3 11.1 3.3 13.4 0 20.7-11.1 20.7-20.7v-.9c1.5-1.1 2.7-2.4 3.7-3.9z" },
                { name: "linkedin", icon: "M34 5.5H6c-1.1 0-2 .9-2 2v25c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-25c0-1.1-.9-2-2-2zM13.7 30.5h-4.7V16.5h4.7v14zm-2.3-16c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7zm20.1 16h-4.7v-7.3c0-1.8 0-4-2.4-4s-2.8 1.9-2.8 3.9v7.4h-4.7V16.5h4.5v2.1h.1c.6-1.2 2.1-2.4 4.3-2.4 4.6 0 5.4 3 5.4 7v7.3z" },
                { name: "github", icon: "M20 4C12.7 4 7 9.7 7 17c0 5.9 3.8 10.8 9.1 12.6.7.1.9-.3.9-.7v-2.2c-3.7.8-4.5-1.8-4.5-1.8-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.8 1.1.1-.8.5-1.4.9-1.7-3-.3-6.1-1.5-6.1-6.6 0-1.5.5-2.7 1.3-3.6-.1-.4-.6-1.7.1-3.5 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.2-.4 1.1 0 2.2.1 3.2.4 2.4-1.6 3.5-1.3 3.5-1.3.7 1.8.3 3.1.1 3.5.8.9 1.3 2.1 1.3 3.6 0 5.1-3.1 6.3-6.1 6.6.5.4.9 1.2.9 2.4v3.5c0 .4.2.8.9.7 5.3-1.8 9.1-6.7 9.1-12.6 0-7.3-5.7-13-13-13z" },
                { name: "facebook", icon: "M36 20c0-8.8-7.2-16-16-16S4 11.2 4 20c0 8 5.9 14.6 13.5 15.8V24.5h-4.1V20h4.1v-3.5c0-4 2.4-6.2 6-6.2 1.8 0 3.6.3 3.6.3v4h-2c-2 0-2.6 1.2-2.6 2.5V20h4.4l-.7 4.5h-3.7v11.3C30.1 34.6 36 28 36 20z" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.name}`}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-800 transition-colors group"
                >
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-white" 
                    viewBox="0 0 40 40" 
                    fill="currentColor"
                  >
                    <path d={social.icon} />
                  </svg>
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Integrations", "Pricing", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "API Reference", "Guides", "Help Center", "Community"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Customers", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} SAAN. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#terms" className="text-gray-500 text-sm hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-gray-500 text-sm hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#security" className="text-gray-500 text-sm hover:text-cyan-400 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer