"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, ChevronDown, Bell, Search } from "lucide-react"

const Header = () => {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      })

      gsap.from(".logo", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-4">
        <div className="flex items-center justify-between">
          <div className="logo flex items-center">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path
                d="M10 15C10 12.2386 12.2386 10 15 10H25C27.7614 10 30 12.2386 30 15C30 17.7614 27.7614 20 25 20H15C12.2386 20 10 17.7614 10 15Z"
                fill="url(#paint0_linear)"
              />
              <path 
                d="M10 25C10 22.2386 12.2386 20 15 20H25C27.7614 20 30 22.2386 30 25C30 27.7614 27.7614 30 25 30H15C12.2386 30 10 27.7614 10 25Z" 
                fill="url(#paint1_linear)"
              />
              <defs>
                <linearGradient id="paint0_linear" x1="10" y1="15" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="10" y1="25" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              SAAN
            </span>
          </div>

          {/* Desktop Navigation - Now centered */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-6">
            {["Products", "Solutions", "Pricing", "Resources"].map((item) => (
              <div key={item} className="relative group">
                <button className="nav-item text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  {item} <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-1">
                    {[`${item} 1`, `${item} 2`, `${item} 3`].map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="nav-item text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <div className="h-4 w-px bg-gray-700"></div>
            <button className="nav-item p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <Search size={18} />
            </button>
            <button className="nav-item p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-500"></span>
            </button>
            <button className="nav-item px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-md hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {["Products", "Solutions", "Pricing", "Resources"].map((item) => (
              <div key={item} className="relative">
                <button 
                  className="w-full flex items-center justify-between text-base font-medium text-gray-300 hover:text-white transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    // You could add dropdown functionality here
                  }}
                >
                  <span>{item}</span>
                  <ChevronDown size={16} />
                </button>
                {/* Mobile submenu - could be expanded with state management */}
                <div className="pl-4 hidden">
                  {[`${item} 1`, `${item} 2`, `${item} 3`].map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block py-2 text-sm text-gray-400 hover:text-white"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <button className="text-base font-medium text-gray-300 hover:text-white transition-colors">
                  Sign In
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Search size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-500"></span>
                  </button>
                </div>
              </div>
              <button className="w-full py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header