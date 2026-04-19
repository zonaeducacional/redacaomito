import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Info } from 'lucide-react';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function BioStage({ onNext, openGlossary }: StageProps) {
  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">Idealismo e Ideologia</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">De Atenas ao Capital</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-2 space-y-6 text-sm text-slate-300 leading-relaxed"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <p>
            Platão (427-347 a.C) foi um filósofo grego de família nobre. Ele fundou a Academia para formar a elite aristocrática de sua época.
          </p>
          <p>
            Em sua <strong className="text-amber-400">Teoria das Ideias</strong>, Platão afirmava que a realidade que tocamos (Sensível) é ilusória, e a verdadeira essência (Inteligível) só pode ser acessada pela razão pura.
          </p>
          
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mt-8 shadow-md">
            <h3 className="font-bold text-amber-500 text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
              <Info size={16} />
              A Crítica Moderna
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Para <strong>diversos sociólogos e pensadores modernos</strong>, a teoria de Platão reflete muito as divisões da própria Atenas na época. 
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              A ideia de um "reino puro do pensamento" pode até mesmo agir como <em>ideologia</em> para justificar que o trabalho intelectual (de quem já tinha privilégios) era superior ao trabalho físico/braçal, deixado para os artesãos e escravizados. A realidade mostra que o contexto e as relações sociais moldam profundamente aquilo que e quem tem tempo de filosofar e refletir.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.4 }}
        >
          <div className="bg-slate-900 border-l-4 border-amber-500 rounded-2xl h-full min-h-64 flex flex-col items-center justify-center relative overflow-hidden">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg"
              alt="Busto de Platão"
              fill
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent pointer-events-none" />
            <span className="font-serif italic text-2xl relative z-10 text-amber-100 mt-auto pb-6 translate-y-2">Busto de Platão</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex justify-end pt-8"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          Avançar para A Caverna
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
