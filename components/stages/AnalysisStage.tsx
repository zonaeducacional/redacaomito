import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function AnalysisStage({ onNext, openGlossary }: StageProps) {
    const analysisPoints = [
      { question: 'A Caverna', answer: 'A estrutura geral do mundo moderno, que muitas vezes limita nossa forma de enxergar a vida.' },
      { question: 'As Sombras', answer: 'As falsas aparências e a Ideologia — narrativas que escondem o funcionamento real do mundo e as desigualdades.' },
      { question: 'Os "Transportadores" e o Fogo', answer: 'Grupos e organizações donos de grande influência e comunicação que pautam o que devemos ver e o que devemos desejar.' },
      { question: 'O Prisioneiro Libertado', answer: 'O indivíduo que atinge a Consciência Crítica, reconhecendo os problemas estruturais e questionando as ilusões.' },
      { question: 'A Saída da Caverna', answer: 'O entendimento do funcionamento profundo da sociedade; a desmistificação.' },
      { question: 'O Retorno (O Instrumento)', answer: 'A Práxis (União entre teoria e ação). Não basta apenas entender sozinho, é preciso se envolver com a coletividade.' },
    ];

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">Decifrando o Mito</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Baseado na Análise de Marilena Chaui</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="text-sm text-slate-300 leading-relaxed space-y-4"
      >
        <p>A história que acabamos de ler não é sobre prisioneiros literais no subsolo. É uma <strong className="text-amber-400">alegoria</strong>.</p>
        <p>Alegoria é uma representação com sentido figurado, para explicar uma ideia abstrata. O que Platão estava realmente dizendo sobre nós?</p>
      </motion.div>

      <div className="grid gap-4 mt-8">
        {analysisPoints.map((point, index) => (
          <motion.div 
            key={point.question}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex flex-col md:flex-row md:items-start gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700"
          >
            <div className="bg-amber-500/20 text-amber-500 p-3 rounded-xl shrink-0 self-start border border-amber-500/30">
              <Lightbulb size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">O que significa {point.question}?</h3>
              <p className="text-sm text-slate-400">{point.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-8 bg-slate-900 p-6 rounded-2xl border-l-4 border-amber-500 text-slate-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="font-bold text-amber-400 mb-2">
          Mas por que os prisioneiros rejeitam a verdade e zombam daquele que tenta libertá-los?
        </p>
        <p className="text-sm opacity-90">
          A alienação não é apenas falta de informação; é uma condição que muitas vezes oferece certo conforto. A ideologia faz com que uma "sombra" pareça natural. Historicamente, romper com ideias estabelecidas exige esforço e coragem para nadar contra a correnteza. Não é apenas uma mudança individual, mas a necessidade de enxergar os problemas da estrutura global e buscar juntos formas de desmantelar a própria caverna.
        </p>
      </motion.div>

      <motion.div 
        className="flex justify-end pt-8"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1 }}
      >
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          Iniciar o Desafio
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
