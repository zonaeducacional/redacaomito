import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function IntroStage({ onNext }: StageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-4 italic">
          A Caverna e <span className="text-amber-400">a Sociedade</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-400 max-w-xl mx-auto">
          Uma jornada do idealismo antigo à crítica moderna sobre a alienação na sociedade atual.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="max-w-prose space-y-4 text-slate-300 text-sm leading-relaxed text-left mx-auto bg-slate-800/30 p-8 rounded-3xl border border-slate-700"
      >
        <p>
          Há mais de 2.400 anos, Platão imaginou pessoas presas em uma caverna, encarando sombras projetadas por um fogo. Mas quem controla as estátuas e o fogo que gera essas sombras?
        </p>
        <p>
          Pela ótica da <strong>sociologia e do pensamento crítico</strong>, vemos que a caverna não é apenas a "ignorância natural". A caverna é a estrutura da própria sociedade. As correntes são a alienação, a pressa e as amarras do dia a dia no mundo atual.
        </p>
        <p>
          As sombras na parede são a <strong>ideologia</strong> dominante — discursos e imagens produzidas por grupos de influência para justificar o modo de vida atual, o consumismo e mascarar as desigualdades. Prepare-se para desenvolver seu <em>pensamento crítico e autonomia</em>.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={onNext}
        className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      >
        Iniciar Jornada
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}
