"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Check, CircleDot, MessageCircle, Search, Send, Sparkles, Workflow, Zap } from "lucide-react"

const systems = [
  { icon: Search, name: "LinkedIn outbound prospecting", desc: "Find, engage, and follow up with the right prospects—automatically.", color: "blue" },
  { icon: Sparkles, name: "AI content production", desc: "Create high-quality, on-brand content for every channel.", color: "cyan" },
  { icon: CircleDot, name: "AI lead prospecting engine", desc: "Discover, research, and prioritise high-fit leads.", color: "teal" },
  { icon: MessageCircle, name: "AI sales conversion agent", desc: "Qualify enquiries and move conversations toward a decision.", color: "violet" },
  { icon: Workflow, name: "Multi-agent enterprise workflows", desc: "Coordinate intelligent agents across complex business processes.", color: "cyan" },
  { icon: Bot, name: "Custom AI systems", desc: "A purpose-built system for the way your business works.", color: "blue" },
]
const steps = ["Find prospects", "Personalise outreach", "Send & follow up", "Manage replies", "Track pipeline"]

export function CinemaHome() {
  const [activeStep, setActiveStep] = useState(0)
  const [tab, setTab] = useState("Overview")
  return (
    <div className="cinema-site">
      <section className="cinema-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> AI SYSTEMS FOR REAL BUSINESS OUTCOMES</span>
          <h1>Turn enquiries<br />into revenue<br />with <em>AI systems.</em></h1>
          <p>We design and build AI systems that qualify leads, engage prospects, create content and automate end-to-end business processes.</p>
          <div className="hero-actions">
            <a className="button-primary" href="/systems">Explore our systems <ArrowRight size={16} /></a>
            <a className="button-ghost" href="/contact">Get in touch <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-proof"><span><Zap size={14}/> AI agents</span><span><Workflow size={14}/> Automations</span><span><CircleDot size={14}/> Real workflows</span><span><Check size={14}/> Built for business</span></div>
        </div>
        <div className="hero-orbit" aria-label="Illustration of connected AI business systems">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
          <div className="orbit-core"><Sparkles size={42}/><small>AI CORE</small></div>
          {["Enquiry","Qualification","Routing","Revenue"].map((x,i)=><div className={"orbit-node node-"+i} key={x}><i/>{x}</div>)}
          <div className="orbit-pulse"/>
        </div>
        <div className="hero-bottom"><span>INTELLIGENCE THAT MOVES BUSINESS FORWARD</span><ArrowDownRight size={18}/></div>
      </section>

      <section className="cinema-section systems-section" id="systems">
        <div className="section-heading"><div><span className="eyebrow">REAL SYSTEMS. REAL CAPABILITIES.</span><h2>AI systems <em>we’ve built</em></h2></div><a href="/systems" className="text-link">Explore all systems <ArrowRight size={16}/></a></div>
        <p className="section-intro">A showcase of the systems we’ve designed and built. Each system solves a specific business problem and can be adapted for your industry.</p>
        <div className="system-grid">{systems.map((s,i)=><a href={i===0?"/systems/linkedin-outbound-prospecting":"/systems"} className="system-card" key={s.name}><div className={"system-icon "+s.color}><s.icon size={22}/></div><span className="card-index">0{i+1}</span><h3>{s.name}</h3><p>{s.desc}</p><span className="card-link">Explore system <ArrowRight size={14}/></span></a>)}</div>
      </section>

      <section className="cinema-section demo-section">
        <div className="section-heading"><div><span className="eyebrow">INTERACTIVE WORKFLOW DEMO</span><h2>See how it <em>works.</em></h2></div><span className="live-pill"><i/> LIVE INTERACTION</span></div>
        <p className="section-intro">Explore a simplified prospecting workflow. Select a step to see what happens behind the scenes.</p>
        <div className="workflow-board"><div className="workflow-track">{steps.map((s,i)=><button onClick={()=>setActiveStep(i)} className={"workflow-step "+(activeStep===i?"active":"")} key={s}><span className="step-number">0{i+1}</span><span className="step-icon">{i===0?<Search/>:i===1?<Sparkles/>:i===2?<Send/>:i===3?<MessageCircle/>:<Workflow/>}</span><strong>{s}</strong><small>{["ICP + intent","Personalised copy","Smart sequences","AI-assisted","Pipeline signals"][i]}</small></button>)}</div><div className="workflow-detail"><div><span className="eyebrow">STEP 0{activeStep+1} / 05</span><h3>{steps[activeStep]}</h3><p>{["The system searches for companies and decision-makers that match your ideal customer profile.","AI researches each prospect and drafts a relevant, human-sounding message.","A thoughtful sequence sends at the right time and adapts to engagement.","Replies are categorised, surfaced, and prepared for the right next action.","Signals and conversations are organised into a clear pipeline for your team."][activeStep]}</p></div><div className="workflow-result"><span className="result-label"><Sparkles size={14}/> SYSTEM OUTPUT</span><strong>{["42 qualified prospects found","Personalised message ready","Sequence queued for review","Reply intent: interested","Pipeline updated"][activeStep]}</strong><span className="result-status"><Check size={13}/> Simulation preview</span></div><div className="workflow-controls"><button aria-label="Previous step" onClick={()=>setActiveStep((activeStep+4)%5)}>←</button><div>{steps.map((_,i)=><i key={i} className={activeStep===i?"on":""}/>)}</div><button aria-label="Next step" onClick={()=>setActiveStep((activeStep+1)%5)}>→</button></div></div></div>
      </section>

      <section className="cinema-section usecase-section"><div className="usecase-copy"><span className="eyebrow">BUILT AROUND YOUR BUSINESS</span><h2>From first enquiry<br/>to <em>real opportunity.</em></h2><p>Give every enquiry a clear next step. Our WhatsApp lead qualification system captures intent, asks the right questions, and routes qualified opportunities to your team.</p><a className="button-primary" href="/use-cases/whatsapp-lead-qualification">Explore WhatsApp qualification <ArrowRight size={16}/></a></div><div className="phone-stage"><div className="phone-glow"/><div className="phone-frame"><div className="phone-top"><span/> WhatsApp <small>online</small></div><div className="chat-bubble">Hi! I’m looking for a 3-bedroom apartment.</div><div className="chat-bubble reply">Of course. Which location are you considering?</div><div className="chat-bubble">Gurgaon, preferably near Golf Course Road.</div><div className="chat-bubble reply qualified"><Check size={14}/> Great — I’ve shared your preferences with our property specialist.</div><div className="phone-compose">Message <Send size={14}/></div></div><div className="floating-chip"><span><Check size={15}/></span> Lead qualified</div></div></section>

      <section className="cinema-section detail-section"><div className="section-heading"><div><span className="eyebrow">SYSTEM SPOTLIGHT</span><h2>Built to make work <em>flow.</em></h2></div><a className="text-link" href="/systems">View systems <ArrowRight size={16}/></a></div><div className="detail-tabs">{["Overview","How it works","Outcomes","Demo","FAQ"].map(t=><button onClick={()=>setTab(t)} className={tab===t?"selected":""} key={t}>{t}</button>)}</div><div className="detail-panels"><article><span className="panel-symbol problem">!</span><h3>{tab==="Overview"?"The problem":tab}</h3><p>{tab==="Overview"?"Manual research takes time. Generic outreach gets ignored. Follow-ups slip through the cracks.":tab==="How it works"?"Research, qualify, personalise, and route — with clear checkpoints for your team.":tab==="Outcomes"?"More consistent outreach, better replies, and less repetitive work.":tab==="Demo"?"Explore a guided simulation of the system's workflow above.":"Built around your business process, with a clear handoff to your team."}</p></article><article><span className="panel-symbol solution"><Check/></span><h3>How we solve it</h3><p>AI finds relevant opportunities, creates context-aware actions, and keeps the workflow organised — with people in control.</p></article><article className="outcomes-panel"><span className="panel-symbol outcome"><Zap/></span><h3>Potential outcomes</h3><ul><li>More qualified conversations</li><li>Less manual work for your team</li><li>A clear and organised pipeline</li></ul></article></div></section>

      <section className="cinema-cta"><span className="eyebrow">LET’S BUILD SOMETHING USEFUL</span><h2>Have a workflow in mind?<br/><em>Let’s make it intelligent.</em></h2><p>Tell us where the friction is. We’ll help you find the right system.</p><a className="button-primary" href="/contact">Discuss your AI system <ArrowRight size={16}/></a><span className="cta-orb" aria-hidden="true"/></section>
    </div>
  )
}
