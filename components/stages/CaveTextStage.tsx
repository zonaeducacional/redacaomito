import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function CaveTextStage({ onNext, openGlossary }: StageProps) {
  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">A Alegoria da Caverna</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Livro VII, A República</p>
      </motion.div>

      <motion.div 
        className="w-full aspect-video bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl relative overflow-hidden text-slate-500 border border-slate-700 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Image
          src="/caverna.png"
          alt="Alegoria da Caverna de Platão"
          fill
          className="object-cover mix-blend-luminosity opacity-40 hover:opacity-100 hover:mix-blend-normal transition-all duration-700"
          sizes="(max-width: 1024px) 100vw, 800px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-6 z-10 pointer-events-none">
          <p className="font-serif text-lg text-amber-100">Ilustração da Caverna</p>
          <p className="text-sm max-w-md mt-1 text-slate-300">
            Para a visão crítica, os "transportadores de estátuas" representam os aparelhos que propagam ilusões na parede da sociedade.
          </p>
        </div>
      </motion.div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed max-w-prose mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <p className="italic border-l-4 border-amber-500 pl-4 mb-6 text-slate-400">
            Diálogo adaptado entre Sócrates e Glauco.
          </p>
          <p className="mb-4 text-slate-200">
            <strong className="text-amber-400">Sócrates</strong>: Imaginemos uma caverna subterrânea onde, desde a infância, seres humanos estão aprisionados. Suas pernas e correntes os impedem de mover-se.
          </p>
          <p className="mb-4 text-slate-200">
            A luz provém de uma fogueira. Atrás deles, pessoas (aqueles que detêm o poder e a comunicação) transportam estatuetas. A luz do fogo projeta as sombras na parede.
          </p>
          <p className="mb-6 text-slate-300">
            <strong className="text-slate-100">Glauco</strong>: Um quadro estranho e estranhos prisioneiros. Eles se assemelham a nós! Como não viram outra coisa, não formariam o pensamento de que essas sombras são as únicas realidades?
          </p>

          <h3 className="font-serif text-2xl text-amber-100 mt-8 mb-4">A Libertação</h3>
          <p className="mb-4 text-slate-200">
            <strong className="text-amber-400">Sócrates</strong>: Imagine agora o que aconteceria se um habitante fosse libertado. Ele é forçado a levantar-se e olhar para a luz. Dolorido e ofuscado, ao ver os objetos originais, ele não ficaria confuso? Acostumando-se pouco a pouco, ele finalmente contemplaria a realidade exterior: a verdadeira luz do Sol.
          </p>

          <h3 className="font-serif text-2xl text-amber-100 mt-8 mb-4">O Retorno</h3>
          <p className="mb-4 text-slate-200">
            E se, por compaixão, descesse de volta para contar aos companheiros? Não ficaria temporariamente cego em meio às trevas? 
          </p>
          <p className="mb-4 text-slate-300">
            <strong className="text-slate-100">Glauco</strong>: Sem dúvida. Tentariam, se pudessem, espancá-lo ou até matá-lo, zombando que sua subida ao alto estragou a sua visão.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-end pt-8 relative z-10"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            Avançar para A Análise
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
