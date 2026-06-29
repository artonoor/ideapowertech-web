'use client'

import { useEffect, useRef, useState } from 'react'

const properties = [
  {
    id: 'ideapower',
    name: 'IdeaPower.ai',
    url: 'https://ideapower.ai',
    status: 'LIVE',
    tagline: 'The idea engine',
    description: 'Capture, develop and score every idea before it disappears.',
    character: 'The Conductor',
    characterDesc: 'Human brain. Robotic hands. Catches ideas as they fly past.',
    emoji: '🧠',
    color: '#3b82f6',
  },
  {
    id: 'drlumenz',
    name: 'DrLumenz.com',
    url: 'https://drlumenz.com',
    status: 'LIVE',
    tagline: 'Publishing intelligence',
    description: 'Intelligence. Fun. Visions. 1,000 titles by year end.',
    character: 'The Scribe',
    characterDesc: 'Half scholar, half machine. Writes at impossible speed.',
    emoji: '📖',
    color: '#c084fc',
  },
  {
    id: 'paipo',
    name: 'Paipo.art',
    url: 'https://paipo.art',
    status: 'LIVE',
    tagline: "Children's adventures",
    description: 'One curious parrot. Three ancient traditions. 54 adventures.',
    character: 'Paipo',
    characterDesc: 'The only fully organic one. Chaotic, colourful, flying between the others.',
    emoji: '🦜',
    color: '#fbbf24',
  },
  {
    id: 'artozone',
    name: 'Artozone.com',
    url: 'https://artozone.com',
    status: 'BUILDING',
    tagline: 'Art magazine',
    description: 'Where AI creativity meets human curation.',
    character: 'The Curator',
    characterDesc: 'One human eye, one camera lens. Sees beauty in everything.',
    emoji: '🎨',
    color: '#f97316',
  },
  {
    id: 'iteknews',
    name: 'iTekNews.com',
    url: 'https://iteknews.com',
    status: 'BUILDING',
    tagline: 'Tech intelligence',
    description: 'Signal from noise. The technology news that matters.',
    character: 'The Antenna',
    characterDesc: 'Ears tuned to every frequency. Processes signal from noise.',
    emoji: '📡',
    color: '#10b981',
  },
  {
    id: 'artnoor',
    name: 'ArtNoor.net',
    url: 'https://artnoor.net',
    status: 'BUILDING',
    tagline: 'AI art gallery',
    description: 'Multi-artist AI gallery. Human heart, algorithmic brush.',
    character: 'The Painter',
    characterDesc: 'Human heart, algorithmic brush. Creates what neither alone could.',
    emoji: '🖼️',
    color: '#ec4899',
  },
]

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = target / 60
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>
}

export default function Home() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const liveCount = properties.filter(p => p.status === 'LIVE').length

  return (
    <main className="bg-[#04040d] text-white min-h-screen font-mono">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#04040d]/95 backdrop-blur-sm border-b border-blue-500/10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase">IdeaPower.tech</span>
        </div>
        <div className="text-xs text-white/30 tracking-widest hidden md:block">
          SYSTEM STATUS: {liveCount}/6 PROPERTIES ONLINE
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs text-white/40">
          <a href="#nodes" className="hover:text-white transition-colors tracking-wider">NODES</a>
          <a href="#mission" className="hover:text-white transition-colors tracking-wider">MISSION</a>
          <a href="https://ideapower.ai" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 border border-blue-500/30 text-blue-400 hover:border-blue-400 transition-all tracking-wider">
            LAUNCH APP
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-blue-500/20 rounded-full mb-12 text-xs text-blue-400 tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            SYSTEM ONLINE · H3C PROTOCOL ACTIVE
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="text-white">IDEA</span>
            <span className="text-blue-400">POWER</span>
            <span className="text-white/20">.TECH</span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 font-mono mb-4 tracking-wider">
            THE TECHNOLOGY BEHIND THE IDEAS
          </p>

          <p className="text-base text-white/25 max-w-2xl mx-auto mb-16 leading-relaxed font-sans">
            Publishing for the age of Dreaming Humans and Acting Machines.
            Six properties. One engine. Infinite ideas.
          </p>

          <div className="max-w-md mx-auto mb-16">
            <div className="flex justify-between text-xs text-white/30 mb-2 tracking-widest">
              <span>JULY 1 LAUNCH SEQUENCE</span>
              <span>{liveCount}/6 ONLINE</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-1000"
                style={{ width: `${(liveCount / 6) * 100}%` }} />
            </div>
          </div>

          <a href="#nodes"
            className="inline-flex items-center gap-3 px-8 py-4 border border-blue-500/30 text-blue-400 rounded hover:border-blue-400 hover:bg-blue-400/5 transition-all text-xs tracking-widest">
            ENTER THE SYSTEM ↓
          </a>
        </div>
      </section>

      {/* The Agents */}
      <section id="nodes" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] text-blue-400/60 uppercase mb-4">The Network</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Six properties. Six agents.<br />
              <span className="text-white/30">Robots and humans. Working together.</span>
            </h2>
            <p className="text-white/30 text-sm max-w-xl mx-auto font-sans">
              Each property is managed by a human-AI hybrid — part human instinct, part machine capacity. Together they form the IdeaPower.tech network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(prop => (
              <div key={prop.id}
                onMouseEnter={() => setActiveNode(prop.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="relative rounded-xl border p-6 cursor-pointer transition-all duration-300"
                style={{
                  borderColor: activeNode === prop.id ? prop.color + '60' : 'rgba(255,255,255,0.08)',
                  background: activeNode === prop.id ? prop.color + '08' : 'transparent',
                  boxShadow: activeNode === prop.id ? `0 0 40px ${prop.color}15` : 'none',
                }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: prop.status === 'LIVE' ? '#10b981' : '#f59e0b' }} />
                    <span className="text-xs tracking-widest"
                      style={{ color: prop.status === 'LIVE' ? '#10b981' : '#f59e0b' }}>
                      {prop.status}
                    </span>
                  </div>
                  <span className="text-2xl">{prop.emoji}</span>
                </div>

                <h3 className="text-lg font-black mb-1" style={{ color: prop.color }}>{prop.name}</h3>
                <p className="text-xs text-white/30 tracking-widest uppercase mb-4">{prop.tagline}</p>
                <p className="text-sm text-white/40 leading-relaxed mb-6 font-sans">{prop.description}</p>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-white/20 tracking-widest uppercase mb-1">Agent</p>
                  <p className="text-sm font-bold" style={{ color: prop.color + 'cc' }}>{prop.character}</p>
                  <p className="text-xs text-white/25 mt-1 leading-relaxed font-sans">{prop.characterDesc}</p>
                </div>

                {prop.status === 'LIVE' && (
                  <a href={prop.url} target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs tracking-widest transition-colors"
                    style={{ color: prop.color + '60' }}>
                    VISIT SITE →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 150, suffix: '+', label: 'TITLES IN JULY' },
            { target: 1000, suffix: '', label: 'BY YEAR END' },
            { target: 6, suffix: '', label: 'PROPERTIES' },
            { target: 100, suffix: '+', label: 'IDEAS DAILY' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white/25 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* H3C Mission */}
      <section id="mission" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-blue-400/60 uppercase mb-8 text-center">H3C Protocol</p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            Consciousness · Creativity · Communication
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { letter: 'H1', word: 'Consciousness', desc: 'IdeaPower.ai — the tool that makes you aware of your own thinking. Catch every idea. Lose nothing.' },
              { letter: 'H2', word: 'Creativity', desc: 'Dr. Lumenz, Paipo, ArtNoor — ideas made real. Ancient wisdom made beautiful. Human visions published.' },
              { letter: 'H3', word: 'Communication', desc: 'Artozone, iTekNews — signal from noise. Getting the right ideas to the right people at the right moment.' },
            ].map(h => (
              <div key={h.letter}>
                <div className="text-5xl font-black text-blue-400/20 mb-4">{h.letter}</div>
                <h3 className="text-lg font-black text-white mb-4">{h.word}</h3>
                <p className="text-sm text-white/35 leading-relaxed font-sans">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-black text-blue-400 tracking-widest text-sm">IDEAPOWER.TECH</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/25 tracking-wider">
            {properties.map(p => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">{p.name}</a>
            ))}
          </div>
          <p className="text-white/15 text-xs tracking-widest">© 2026 IDEAPOWER.TECH</p>
        </div>
      </footer>

    </main>
  )
}
