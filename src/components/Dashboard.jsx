"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BarChart3, PieChart, LineChart, Settings, Bell, Search, Lock, Sparkles, Zap } from "lucide-react"
import { StickyScroll } from "./ui/sticky-scroll-reveal"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

// Particle animation component
const ParticleBackground = ({ className }) => {
  const particlesRef = useRef(null)
  
  useEffect(() => {
    const particles = []
    const numParticles = 30
    const colors = ["#0891b2", "#2563eb", "#4f46e5", "#06b6d4"]
    
    if (!particlesRef.current) return
    
    const canvas = particlesRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      })
    }
    
    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (const particle of particles) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.6
        ctx.fill()
        
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
        
        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1
      }
    }
    
    animate()
    
    return () => {
      // Cleanup
    }
  }, [])
  
  return <canvas ref={particlesRef} className={cn("absolute inset-0 w-full h-full", className)} />
}

// Glowing border component
const GlowingBorder = ({ children, className, glowColor = "cyan" }) => {
  const borderRef = useRef(null)
  
  useEffect(() => {
    if (!borderRef.current) return
    
    const glowAnimation = gsap.to(borderRef.current, {
      boxShadow: `0 0 15px 2px var(--glow-color)`,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    
    return () => {
      glowAnimation.kill()
    }
  }, [])
  
  return (
    <div 
      ref={borderRef} 
      className={cn("relative transition-all rounded-xl border", className)}
      style={{ "--glow-color": `var(--${glowColor}-500)` }}
    >
      {children}
    </div>
  )
}

// Live data indicator component
const LiveIndicator = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <span className="text-xs text-green-400">Live</span>
    </div>
  )
}

// Chart placeholder with animation
const AnimatedChart = ({ icon: Icon, size = 60, type = "default" }) => {
  const chartRef = useRef(null)
  
  useEffect(() => {
    if (!chartRef.current) return
    
    let animation
    
    if (type === "bar") {
      // Animate bar chart bars
      const bars = chartRef.current.querySelectorAll('.bar')
      animation = gsap.from(bars, {
        scaleY: 0,
        duration: 1,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        transformOrigin: "bottom"
      })
    } else if (type === "line") {
      // Animate line path
      const path = chartRef.current.querySelector('path')
      const length = path.getTotalLength()
      
      gsap.set(path, { 
        strokeDasharray: length,
        strokeDashoffset: length 
      })
      
      animation = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out"
      })
    } else if (type === "pie") {
      // Animate pie segments
      const segments = chartRef.current.querySelectorAll('circle')
      animation = gsap.from(segments, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.7)"
      })
    }
    
    return () => {
      if (animation) animation.kill()
    }
  }, [type])
  
  if (type === "bar") {
    return (
      <div ref={chartRef} className="flex items-end justify-center h-full w-full gap-2">
        {[0.7, 0.5, 0.8, 0.4, 0.6, 0.9, 0.5, 0.7, 0.8, 0.6].map((height, i) => (
          <div 
            key={i}
            className="bar w-4 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t opacity-80"
            style={{ height: `${height * 100}%` }}
          />
        ))}
      </div>
    )
  }
  
  if (type === "line") {
    return (
      <div ref={chartRef} className="h-full w-full flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 100 50" className="text-cyan-500">
          <path 
            d="M0,40 C10,35 20,20 30,30 C40,40 50,10 60,20 C70,30 80,25 90,15 L90,50 L0,50 Z" 
            fill="rgba(8, 145, 178, 0.2)" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
    )
  }
  
  if (type === "pie") {
    return (
      <div ref={chartRef} className="h-full w-full flex items-center justify-center">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="#0891b2" opacity="0.8" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#0891b2" strokeWidth="6" strokeDasharray="165 220" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#2563eb" strokeWidth="6" strokeDasharray="110 220" />
        </svg>
      </div>
    )
  }
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Icon size={size} className="text-gray-600" />
    </div>
  )
}

const dashboardContent = [
  {
    title: "Real-time Analytics Dashboard",
    description:
      "Monitor your business performance in real-time with customizable dashboards that provide actionable insights at a glance. Track KPIs, user behavior, and system performance all in one place.",
    content: (
      <GlowingBorder className="h-full w-full bg-gray-900/90 border-cyan-600/50 overflow-hidden backdrop-blur-sm">
        <ParticleBackground className="opacity-10" />
        <div className="h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <div className="text-xs text-cyan-400 font-medium">Analytics</div>
            <LiveIndicator />
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <Search size={14} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <Bell size={14} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-medium cursor-pointer"
            >
              A
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Active Users", value: "2,845", change: "+12.5%", icon: <Zap size={12} /> },
              { label: "Revenue", value: "$48,325", change: "+8.2%", icon: <Sparkles size={12} /> },
              { label: "Conversion", value: "3.42%", change: "+2.4%", icon: <BarChart3 size={12} /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-cyan-600/50 transition-colors group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <div className="text-xs text-cyan-400">{stat.change}</div>
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-cyan-600/50 mb-4 h-40 transition-colors"
          >
            <div className="flex justify-between mb-2">
              <div className="text-sm text-white font-medium">Revenue Overview</div>
              <div className="text-xs text-gray-400">Last 30 days</div>
            </div>
            <AnimatedChart type="bar" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-cyan-600/50 h-32 transition-colors"
            >
              <div className="text-sm text-white font-medium mb-2">User Segments</div>
              <AnimatedChart type="pie" />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-cyan-600/50 h-32 transition-colors"
            >
              <div className="text-sm text-white font-medium mb-2">Growth Trend</div>
              <AnimatedChart type="line" />
            </motion.div>
          </div>
        </motion.div>
      </GlowingBorder>
    ),
  },
  {
    title: "Team Collaboration Hub",
    description:
      "Bring your team together with integrated communication tools, shared workspaces, and real-time collaboration features. Assign tasks, track progress, and keep everyone aligned on project goals.",
    content: (
      <GlowingBorder glowColor="blue" className="h-full w-full bg-gray-900/90 border-blue-600/50 overflow-hidden backdrop-blur-sm">
        <ParticleBackground className="opacity-10" />
        <div className="h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700">
          <div className="text-sm font-medium text-white">Team Workspace</div>
          <div className="ml-4 flex items-center gap-2">
            <LiveIndicator />
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="w-6 h-6 rounded-full border border-gray-800 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-medium cursor-pointer"
                >
                  {String.fromCharCode(64 + i)}
                </motion.div>
              ))}
            </div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs cursor-pointer"
            >
              +2
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            {[
              { title: "To Do", tasks: [1, 2], color: "amber" },
              { title: "In Progress", tasks: [1, 2], color: "blue" },
              { title: "Completed", tasks: [1], color: "green" }
            ].map((column, colIndex) => (
              <motion.div 
                key={colIndex}
                variants={itemVariants}
                className="w-full sm:w-1/3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-blue-600/50 transition-colors"
              >
                <div className={`text-xs text-${column.color}-400 mb-2 font-medium`}>{column.title}</div>
                {column.tasks.map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + colIndex) }}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gray-700/70 backdrop-blur-sm rounded p-2 mb-2 text-xs text-gray-300 border-l-2 border-${column.color}-500 cursor-move`}
                  >
                    Task {i + colIndex * 2}: {colIndex === 0 ? "Update dashboard" : colIndex === 1 ? "API integration" : "User testing"}
                  </motion.div>
                ))}
                <motion.div 
                  whileHover={{ opacity: 1 }}
                  className="mt-2 opacity-50 hover:opacity-100 text-xs text-center py-1 border border-dashed border-gray-600 rounded text-gray-400 cursor-pointer"
                >
                  + Add task
                </motion.div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-blue-600/50 mb-4 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-blue-400 font-medium">Team Chat</div>
              <div className="text-xs text-gray-400">3 online</div>
            </div>
            <div className="space-y-3">
              {[
                { user: "Alex", message: "Just pushed the new update", time: "2m ago" },
                { user: "Sarah", message: "Great! I'll review it now", time: "just now", typing: true }
              ].map((chat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-start space-x-2"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-xs"
                  >
                    {chat.user.charAt(0)}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="text-xs font-medium text-white">{chat.user}</div>
                      <div className="text-xs text-gray-500">{chat.time}</div>
                    </div>
                    <div className="text-xs text-gray-300">
                      {chat.message}
                      {chat.typing && (
                        <span className="inline-flex ml-1">
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-100">.</span>
                          <span className="animate-pulse delay-200">.</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-700/50 text-xs text-gray-200 rounded-l py-1 px-2 outline-none border border-gray-600 focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs px-3 rounded-r">Send</button>
            </div>
          </motion.div>
        </motion.div>
      </GlowingBorder>
    ),
  },
  {
    title: "Advanced Security Controls",
    description:
      "Protect your data with enterprise-grade security features including role-based access control, audit logs, and encryption at rest and in transit. Stay compliant with industry regulations and standards.",
    content: (
      <GlowingBorder glowColor="purple" className="h-full w-full bg-gray-900/90 border-purple-600/50 overflow-hidden backdrop-blur-sm">
        <ParticleBackground className="opacity-10" />
        <div className="h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700">
          <div className="text-sm font-medium text-white">Security Dashboard</div>
          <div className="ml-auto">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
            >
              <Settings size={14} className="text-gray-400 hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-600/50 mb-4 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-white">System Security Status</div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs"
              >
                Secure
              </motion.div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ delay: 0.4, duration: 1 }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="text-gray-400">
                Threats blocked: <span className="text-white">142</span>
              </div>
              <div className="text-gray-400">
                Last scan: <span className="text-white">2h ago</span>
              </div>
              <div className="text-gray-400">
                Vulnerabilities: <span className="text-white">0</span>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-600/50 transition-colors"
            >
              <div className="text-xs text-purple-400 mb-2 font-medium">User Permissions</div>
              <div className="space-y-3">
                {["Admin", "Editor", "Viewer"].map((role, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex justify-between items-center"
                  >
                    <div className="text-xs text-white flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${i === 0 ? 'purple' : i === 1 ? 'pink' : 'blue'}-500 mr-1.5`}></div>
                      {role}
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.5 }}
                      className={`w-2 h-2 rounded-full bg-${i === 0 ? 'purple' : i === 1 ? 'pink' : 'blue'}-500`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-600/50 transition-colors"
            >
              <div className="text-xs text-purple-400 mb-2 font-medium">Audit Log</div>
              <div className="space-y-2">
                {[
                  { action: "Login", user: "Alex", time: "2m ago", status: "success" },
                  { action: "File access", user: "Sarah", time: "1h ago", status: "success" },
                  { action: "Login attempt", user: "Unknown", time: "3h ago", status: "blocked" }
                ].map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="text-xs text-gray-300 flex justify-between"
                  >
                    <div>
                      {log.action} ({log.user})
                    </div>
                    <div className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'} mr-1`}></div>
                      {log.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-600/50 transition-colors"
          >
            <div className="text-xs text-purple-400 mb-2 font-medium">Encryption Status</div>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Lock size={14} className="text-purple-500" />
              </motion.div>
              <div className="text-xs text-white">All data encrypted at rest and in transit</div>
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Database", "API", "Files", "Messages"].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                  className="text-center"
                >
                  <div className="w-full aspect-square flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 mb-1">
                    <Lock size={10} className="text-purple-400" />
                  </div>
                  <div className="text-xs text-gray-400">{item}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </GlowingBorder>
    ),
  },
  {
    title: "Customizable Workflow Automation",
    description:
      "Design and automate complex business processes without coding. Our visual workflow builder lets you create custom automation that saves time and reduces errors across your organization.",
    content: (
      <GlowingBorder glowColor="emerald" className="h-full w-full bg-gray-900/90 border-emerald-600/50 overflow-hidden backdrop-blur-sm">
        <ParticleBackground className="opacity-10" />
        <div className="h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700">
          <div className="text-sm font-medium text-white">Workflow Builder</div>
          <div className="ml-auto flex items-center space-x-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded shadow-lg shadow-emerald-900/20"
            >
              Save
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs bg-gray-700 hover:bg-gray-600 transition-colors text-white px-3 py-1 rounded"
            >
              Test
            </motion.button>
          </div>
        </div>
        <motion.div 
          className="p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
            <motion.div 
              variants={itemVariants} 
              className="sm:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-emerald-600/50 transition-colors"
            >
              <div className="text-xs text-emerald-400 mb-2 font-medium">Workflow Components</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Trigger", icon: "⚡️" },
                  { name: "Action", icon: "▶️" },
                  { name: "Condition", icon: "🔀" },
                  { name: "Data", icon: "📊" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-700/70 backdrop-blur-sm rounded p-2 text-xs text-gray-300 border border-gray-600 hover:border-emerald-500 cursor-grab flex items-center justify-center gap-1.5"
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="sm:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-emerald-600/50 h-40 transition-colors overflow-hidden relative"
            >
              <div className="text-xs text-emerald-400 mb-2 font-medium">Active Workflow</div>
              <div className="flex items-center justify-between relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-emerald-500/20 border border-emerald-500/30 rounded p-2 text-xs text-emerald-400"
                >
                  Form Submission
                </motion.div>
                <motion.div
                  className="h-0.5 w-12 bg-emerald-500/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6 }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-500/20 border border-blue-500/30 rounded p-2 text-xs text-blue-400"
                >
                  Data Validation
                </motion.div>
                <motion.div
                  className="h-0.5 w-12 bg-blue-500/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-purple-500/20 border border-purple-500/30 rounded p-2 text-xs text-purple-400"
                >
                  Email Notification
                </motion.div>
              </div>
              <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </motion.div>
          </div>
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-emerald-600/50 mb-4 transition-colors"
          >
            <div className="text-xs text-emerald-400 mb-2 font-medium">Automated Tasks</div>
            <div className="space-y-2">
              {[
                { name: "Customer Onboarding", status: "Active", runs: "124" },
                { name: "Invoice Processing", status: "Active", runs: "47" },
                { name: "Error Reporting", status: "Paused", runs: "12" }
              ].map((task, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex justify-between items-center text-xs p-2 bg-gray-700/50 rounded"
                >
                  <div className="text-white">{task.name}</div>
                  <div className="flex items-center gap-3">
                    <div className={`text-${task.status === 'Active' ? 'emerald' : 'gray'}-400`}>
                      {task.status}
                    </div>
                    <div className="text-gray-400">
                      {task.runs} runs
                    </div>
                    <div className="w-8 h-4 bg-gray-600 rounded-full flex items-center p-0.5">
                      <motion.div 
                        initial={{ x: task.status === 'Active' ? 12 : 0 }}
                        whileHover={{ scale: 1.1 }}
                        className={`w-3 h-3 rounded-full ${task.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </GlowingBorder>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-gray-900 px-3 py-1 text-sm">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Everything you need to manage your business
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform provides powerful features designed to streamline your workflow, improve team collaboration, and drive business growth.
          </p>
        </div>
        
        <StickyScroll content={dashboardContent} />
      </div>
    </section>
  );
}