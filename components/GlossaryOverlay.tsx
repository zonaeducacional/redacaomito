import React from 'react';
import { motion } from 'motion/react';
import { BookMarked, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const DICTIONARY = [
  { term: 'Alegoria', def: 'Representação figurada cujo sentido literal oculta um sentido simbólico ou moral mais profundo.' },
  { term: 'Alienação', def: 'Processo através do qual as pessoas se sentem desconectadas daquilo que produzem, de si mesmas e dos outros, agindo de forma automática.' },
  { term: 'Consumismo', def: 'A cultura na qual produtos e mercadorias assumem o centro da vida, ditando nosso valor como pessoas e ofuscando relacionamentos e reflexões profundas.' },
  { term: 'Crítica Social', def: 'Análise da história e das estruturas vigentes a partir das condições reais e relações materiais da sociedade, em vez de pautar-se apenas no que é dito pelos grupos de influência.' },
  { term: 'Dialética', def: 'Ação de compreender a realidade através do diálogo, do debate e do movimento contínuo provocado pelas contradições e desigualdades da vida.' },
  { term: 'Ideologia', def: 'No pensamento crítico sociológico, é um sistema de crenças (como regras tácitas) usado para mascarar distorções e fazer com que a desigualdade pareça algo natural.' },
  { term: 'Práxis', def: 'A união entre a reflexão (a teoria e vontade de mudar) e a ação transformadora prática. O pensamento que sai do papel.' },
  { term: 'Sistema Socioeconômico', def: 'A estrutura de mercado dominante caracterizada por transformar quase tudo (do tempo humano à natureza) em lucro e mercadoria.' }
];

export default function GlossaryOverlay({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Panel */}
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-[#0f172a] border-l border-slate-700 h-full shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-xl text-amber-500 border border-amber-500/30">
              <BookMarked size={20} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-amber-100">Glossário</h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-700 rounded-full transition-colors border border-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {DICTIONARY.map(item => (
            <div key={item.term} className="bg-slate-800/30 p-5 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-wide">{item.term}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
