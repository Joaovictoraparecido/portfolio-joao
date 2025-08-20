import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Download } from "lucide-react";

// ===== Helpers =====
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative py-24 sm:py-28" aria-label={title}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-white/60 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);

// 3D Tilt Card
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tiltX = (py - 0.5) * -10; // rotateX
    const tiltY = (px - 0.5) * 10;  // rotateY
    el.style.setProperty("--rx", `${tiltX}deg`);
    el.style.setProperty("--ry", `${tiltY}deg`);
    el.style.setProperty("--tx", `${(px - 0.5) * 8}px`);
    el.style.setProperty("--ty", `${(py - 0.5) * 8}px`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={
        "group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 " +
        className
      }
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div
        className="relative rounded-2xl bg-white/[0.04] backdrop-blur-xl ring-1 ring-white/10 overflow-hidden"
        style={{
          transform: "translateZ(0)",
          transformStyle: "preserve-3d",
          transition: "transform 150ms ease, box-shadow 150ms ease",
          transformOrigin: "center",
          willChange: "transform",
          boxShadow: "0 10px 40px rgba(0,0,0,.35)",
          // 3D controlled by CSS vars
          perspective: 1000,
          rotateX: "var(--rx)",
          rotateY: "var(--ry)",
          translate: "var(--tx) var(--ty)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
        {children}
      </div>
    </div>
  );
};

// Floating blurred bubbles background
const Bubbles = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {/* soft vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0)_60%)]" />

    {/* blobs */}
    <motion.div
      className="absolute w-72 h-72 -top-10 -left-10 rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle at 30% 30%, #7c8aff, transparent 60%)", opacity: .8 }}
      animate={{ y: [0, 20, -10, 0], x: [0, 10, -10, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-96 h-96 top-40 -right-10 rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle at 70% 50%, #6ee7ff, transparent 60%)", opacity: .7 }}
      animate={{ y: [0, -25, 10, 0], x: [0, -10, 15, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[28rem] h-[28rem] bottom-0 left-1/4 rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle at 50% 50%, #a78bfa, transparent 60%)", opacity: .55 }}
      animate={{ y: [0, 30, -15, 0], x: [0, 10, 0, -10, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// Skill pill
const Skill = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/80 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
    {label}
  </span>
);

export default function Portfolio() {
  const skills = {
    Linguagens: ["C#", "Java", "HTML", "CSS", "SQL"],
    Frameworks: ["ASP.NET MVC", "Spring"],
    "Bancos de Dados": ["SQL Server"],
    Metodologias: ["Agile", "Scrum", "DevOps", ""],
    Ferramentas: ["Git", "Visual Studio", ""],
  };

  const experiences = [
       {
      role: "Auxiliar Técnico",
      company: "Universidade Paulista (UNIP)",
      period: "2025 – Atualmente",
      bullets: [
        "Suporte técnico a alunos e professores.",
        "Gerenciamento de redes e servidores.",
        "Implementação e monitoramento de backups.",
        "Instalação e manutenção de softwares e hardwares.",
      ],
    },
    {
      role: "Monitor de Informática",
      company: "Universidade Paulista (UNIP)",
      period: "2022 – ",
      bullets: [
        "Suporte técnico a alunos e professores.",
        "Gerenciamento de redes e servidores.",
        "Implementação e monitoramento de backups.",
        "Instalação e manutenção de softwares e hardwares.",
      ],
    },
    {
      role: "Suporte Técnico",
      company: "Facily",
      period: "2021 – 2022",
      bullets: [
        "Atendimento técnico de hardware e software.",
        "Manutenção de equipamentos audiovisuais.",
        "Instalação e atualização de softwares essenciais.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white selection:bg-indigo-400/30 selection:text-white">
      <Bubbles />

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0b0f]/60 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-white/80 hover:text-white">JV</a>
          <nav className="hidden sm:flex gap-6 text-sm text-white/70">
            {[
              ["Sobre", "sobre"],
              ["Habilidades", "habilidades"],
              ["Experiências", "experiencias"],
              ["Formação", "formacao"],
              ["Contato", "contato"],
            ].map(([label, href]) => (
              <a key={href} href={`#${href}`} className="hover:text-white transition-colors">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6 }}
                className="text-4xl sm:text-6xl font-semibold leading-tight"
              >
                João Victor <span className="text-white/60">Aparecido</span>
                <br /> Jesus De Oliveira
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .7, delay: .05 }}
                className="mt-4 text-lg text-white/70 max-w-xl"
              >
                Engenheiro de Software em formação • Desenvolvedor Java /C# / .NET
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .7, delay: .1 }}
                className="mt-4 text-white/70 max-w-2xl"
              >
                Aprimorando habilidades em Engenharia de Software e Desenvolvimento de Sistemas, com foco em projetos práticos utilizando Java,C# e .NET, e contribuindo com soluções inovadoras em ambientes colaborativos e ágeis.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                   href="mailto:joaovictoraparecido16@gmail.com">
                  <Mail size={18} /> Email
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/[0.06]"
                   href="tel:+5511950810837">
                  <Phone size={18} /> (11) 95081-0837
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/[0.06]"
                   href="https://github.com/Joaovictoraparecido" target="_blank" rel="noreferrer">
                  <Github size={18} /> GitHub
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/[0.06]"
                   href="https://www.linkedin.com/in/joaovictoraparecido/" target="_blank" rel="noreferrer">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm hover:bg-indigo-400/20"
                   href="/Curriculo.pdf" download>
                    
                  <Download size={18} /> Baixar CV
                </a>
              </div>
            </div>

            {/* Futuristic card */}
            <TiltCard>
              <div className="p-8 sm:p-10">
                <p className="text-sm text-white/60">Atual</p>
                <h3 className="mt-1 text-2xl font-semibold">Auxiliar Técnico • UNIP</h3>
                <p className="mt-3 text-white/70">2025 – Atualmente</p>
                <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
                  <li>Suporte a alunos e professores</li>
                  <li>Redes, servidores e backups</li>
                  <li>Instalação e manutenção de softwares e hardwares</li>
                </ul>
                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="mt-6 text-sm text-white/60">Anterior</p>
                <h4 className="mt-1 text-lg">Monitor de Informática • Facily</h4>
                <p className="text-white/70">2021 – 2022</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <Section id="sobre" title="Sobre mim" subtitle="Tecnologia, colaboração e soluções de impacto.">
        <div className="prose prose-invert max-w-none">
          <p className="text-white/80">
Profissional de TI versátil, com experiência em suporte técnico, redes e infraestrutura, migrando para o desenvolvimento de software. Tenho conhecimentos em C#/.NET e Java, aplicando boas práticas de código, visão de produto e foco em qualidade. Busco oportunidades para consolidar minha carreira na área de TI, contribuindo com adaptação rápida, aprendizado contínuo e entrega de resultados.          </p>
        </div>
      </Section>


      {/* HABILIDADES 
      Cards 3D com efeito tilt e glow
      */}

      <Section id="habilidades" title="Habilidades" subtitle="">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([cat, items]) => (
            <TiltCard key={cat}>
              <div className="p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight">{cat}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Skill key={s} label={s} />
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>


      {/* 
      
      EXPERIÊNCIAS
      
      Linha do tempo com destaque futurista*/}


      <Section id="experiencias" title="Experiências" subtitle="">
        <div className="relative pl-6 border-l border-white/10">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white/80 shadow-[0_0_40px_rgba(255,255,255,.3)]" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,.8)]" />
                <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold">{exp.role} • <span className="text-white/70">{exp.company}</span></h3>
                  <p className="text-sm text-white/60 mt-1">{exp.period}</p>
                  <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      {/* FORMAÇÃO */}
      <Section id="formacao" title="Formação" subtitle="UNIP – Pós e Graduação">
        <div className="grid sm:grid-cols-2 gap-6">
          <TiltCard>
            <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Pós-Graduação: Engenharia de Software</h3>
              <p className="text-white/70">UNIP — Conclusão prevista: abril de 2026</p>
            </div>
          </TiltCard>
          <TiltCard>
            <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Graduação: Análise e Desenvolvimento de Sistemas</h3>
              <p className="text-white/70">UNIP — Concluído em 2024</p>
            </div>
          </TiltCard>
        </div>
      </Section>

      {/* CONTATO */}
      <Section id="contato" title="Contato" subtitle="Vamos conversar sobre oportunidades e projetos?">
        <div className="grid lg:grid-cols-2 gap-8">
          <TiltCard>
            <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Fale comigo</h3>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4">
                <input className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/40" placeholder="Seu nome" />
                <input className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/40" placeholder="Seu email" type="email" />
                <textarea className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 min-h-[120px]" placeholder="Mensagem" />
                <button className="inline-flex items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm hover:bg-indigo-400/20" type="submit">Enviar</button>
              </form>
            </div>
          </TiltCard>

          <div className="space-y-3">
            <a href="mailto:joaovictoraparecido16@gmail.com" className="block rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-4 hover:bg-white/[0.06]">✉️ joaovictoraparecido16@gmail.com</a>
            <a href="tel:+5511950810837" className="block rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-4 hover:bg-white/[0.06]">📞 (11) 95081-0837</a>
            <a href="https://github.com/Joaovictoraparecido" target="_blank" rel="noreferrer" className="block rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-4 hover:bg-white/[0.06]">🐙 github.com/Joaovictoraparecido</a>
            <a href="https://www.linkedin.com/in/jo%C3%A3ovictoraparecido/" target="_blank" rel="noreferrer" className="block rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-5 py-4 hover:bg-white/[0.06]">💼 linkedin.com/in/joaovictoraparecido</a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-white/50">
        <p>© {new Date().getFullYear()} João Victor Aparecido Jesus De Oliveira — Portfólio</p>
      </footer>

      {/* Extra styles only for this single-file demo */}
      <style>{`
        /* Hide ugly focus outline on mouse users but keep it for keyboard */
        :focus:not(:focus-visible) { outline: none; }
      `}</style>
    </div>
  );
}
