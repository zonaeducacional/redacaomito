import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

const QUESTIONS = [
  {
    id: 1,
    text: 'Sob uma perspectiva crítica atual, quem representariam os "transportadores de estatuetas" que manipulam as sombras na parede?',
    options: [
      'Pessoas com boas intenções espalhando educação dentro da caverna.',
      'Os detentores de poder, grandes influências e monopólios de informação que geram narrativas para manter o estado atual das coisas (status quo).',
      'Cidadãos comuns e trabalhadores que não sabem exatamente o que fazem.',
    ],
    correct: 1,
    explanation: 'As "sombras" e discursos são frequentemente modelados por quem controla os grandes meios econômicos e de comunicação. Eles as fabricam para que os problemas pareçam perfeitamente normais e inquestionáveis.',
  },
  {
    id: 2,
    text: 'Para Platão, a saída da caverna é contemplar a Ideia Pura. Para a filosofia social contemporânea, sair da caverna significa:',
    options: [
      'Simplesmente acalmar a mente de forma individual e encontrar a paz ignorando os problemas ao redor.',
      'Acreditar que basta "pensar muito positivo" na própria vida para que a miséria social desapareça num piscar de olhos.',
      'Alcançar o Pensamento Crítico autônomo, compreendendo falhas sociais e unir essa reflexão à prática para mudar a vida em comunidade.',
    ],
    correct: 2,
    explanation: 'Como apontam amplos pensadores modernos: "Os filósofos até hoje apenas interpretaram o mundo; cabe, porém, transformá-lo." O conhecimento profundo exige ser levado à prática.',
  },
  {
    id: 3,
    text: 'O que seria equivalente às "correntes" que aprisionam as pessoas nos dias de hoje?',
    options: [
      'Nossa mecânica exaustiva de rotina, o esgotamento por pressão, e a cultura do consumismo que pauta o que devemos possuir para ter "sucesso".',
      'As conexões virtuais, pois antes da invenção da tecnologia as sociedades não possuíam grandes amarras.',
      'As normas de trânsito estritas e processos burocráticos leves do dia a dia.',
    ],
    correct: 0,
    explanation: 'As correntes são materiais em nossas vidas: desde a pressão constante para apenas "produzir" e "gastar", até valores que tentam nos convencer que esgotamento emocional é sinônimo de sucesso e liberdade.',
  },
  {
    id: 4,
    text: 'No Mito da Caverna, o "fogo" projeta as ilusões na parede. Atualmente, o que atua muitas vezes como esse fogo, filtrando o que enxergamos da realidade?',
    options: [
      'Os algoritmos das redes sociais e veículos midiáticos, que nos mostram recortes limitados do mundo, formando "bolhas" que moldam nossa visão.',
      'A luz natural da ciência, que nos ensina como o mundo realmente é sem qualquer interferência humana.',
      'Aulas tradicionais puramente teóricas que descrevem a história do passado e nos manipulam no presente.',
    ],
    correct: 0,
    explanation: 'Assim como o fogo é o mecanismo técnico na caverna, hoje os algoritmos projetam sombras ao escolherem que tipo de conteúdo você vai ver, criando "bolhas" de realidade personalizadas e enviesadas.',
  },
  {
    id: 5,
    text: 'Quando o prisioneiro sai e olha para as coisas e ao Sol pela primeira vez, ele sente dor nos olhos (cegueira temporária). Essa "dor" representa:',
    options: [
      'O incômodo físico real associado ao estudo prolongado ou leitura de obras extensas.',
      'A crise existencial, frustração e angústia iniciais ao perceber que certas coisas nas quais sempre acreditou profundamente eram apenas enganos e aparências (sombras).',
      'As consequências biológicas de uma alimentação inadequada que causa problemas de visão.',
    ],
    correct: 1,
    explanation: 'Tirar as vendas dói. Compreender injustiças que antes o status quo normalizava para você na forma de "isso é normal" pode causar grande desconforto psicológico inicialmente.',
  },
  {
    id: 6,
    text: 'Por que o homem que retorna para tentar libertar os prisioneiros corre o risco de ser atacado e ridicularizado (como aconteceu com Sócrates)?',
    options: [
      'Porque qualquer ideia nova, independente de quão bem embasada, costuma carregar um desejo embutido de ferir fisicamente outras pessoas.',
      'Porque a alienação possui sua própria zona de conforto, e a ideia de questionar crenças tão fundamentais de sua própria vida desperta medo e rejeição reativa na maioria acostumada.',
      'Porque eles são egoístas por natureza e não apreciam que ninguém da sua comunidade converse de perto com eles.',
    ],
    correct: 1,
    explanation: 'Romper a ilusão das sombras ofende aqueles que consideram essa ilusão a única e inquestionável verdade. Desmantelar dogmas mexe no profundo conforto psíquico das pessoas.',
  },
  {
    id: 7,
    text: 'Em um cenário onde redes focadas em imagem pessoal medem o valor humano com métricas como likes ou números (espetáculo versus essência), podemos dizer que:',
    options: [
      'Foca-se exclusivamente na aparência e superficialidade. Consome-se em excesso muitas vezes para mascarar o vazio de uma essência descuidada pelas correntes.',
      'Trata-se de algo plenamente positivo e ideal, afinal as métricas quantitativas refletem matematicamente quão virtuoso você é.',
      'Aparência e Essência não diferem: apresentar a melhor foto e ser humano virtuoso na prática não exigem dinâmicas incompatíveis.',
    ],
    correct: 0,
    explanation: 'Confundir imagem (as silhuetas do fundo da caverna) com a essência humana verdadeira tem ditado frustrações modernas. Muitas pessoas consomem e se desgastam excessivamente para compor "sombras perfeitas" projetadas socialmente.',
  },
  {
    id: 8,
    text: 'Como poderíamos definir a "Alienação" de modo prático num sentido de trabalho ou vida mecânica?',
    options: [
      'Sentimento místico onde pensamos o tempo todo e por vontade própria nos problemas globais de forma ininterrupta.',
      'Situação em que as pessoas realizam tarefas rotineiramente mas perdem o sentido individual e criativo de sua obra, agindo como engrenagens de um sistema maior em vez de protagonistas.',
      'Sensação de repulsa ou revolta ativa baseada num ativismo radical que rejeita pertencer ao nosso planeta terra.',
    ],
    correct: 1,
    explanation: 'Alienar-se provém de tornar-se "alheio". No foco da crítica socioeconômica, é o indivíduo que age no piloto-automático e se percebe distanciado sem se reconhecer sobre o labor ou as ações de sua própria vida.',
  },
  {
    id: 9,
    text: 'A "Hominização", enquanto superação desse processo, sugere focar em ética, autoconstrução e alteridade. Em nosso dia a dia, qual atitude prática nos hominiza?',
    options: [
      'Recusar o padrão competitivo de que para subirmos, o outro precisa fracassar. Assumir solidariedade contínua, responsabilidade coletiva e diálogo aberto que constrói de verdade a comunidade.',
      'Buscar incessantemente metas que elevem exclusivamente o próprio status e poder diante do grupo social com atitudes isolacionistas extremas.',
      'Deixar de participar da sociedade por completo, fugindo sem contato humano para não correr quaisquer riscos de desentendimento com a estrutura.',
    ],
    correct: 0,
    explanation: 'O processo de hominização para pensadores contemporâneos não é isolamento individualista ou competição exacerbada; é assumir a plenitude e responsabilidade de se construir em conjunto com a sociedade.',
  },
  {
    id: 10,
    text: 'Afinal, por que a filosofia (quando une reflexão real e ação prática que impacta o pensamento da nossa geração) "liberta"?',
    options: [
      'Porque oferece a liberdade irrestrita do desapego moral, permitindo que façamos apenas o que gera prazer momentâneo sob qualquer circunstância.',
      'Porque ajuda a reter e decorar imensa bagagem conteudista histórica e passá-la unicamente em redações sem precisarmos observar diretamente o nosso tempo.',
      'Porque estimula o hábito incansável de interrogar a utilidade e as intenções por trás dos fatos, impedindo-nos de aceitar conformadamente discursos que visam manter nossas próprias correntes sociológicas intactas.',
    ],
    correct: 2,
    explanation: 'A reflexão crítica é uma constante verificação de rotas: "A quem essa realidade serve? Quem ganha se continuarmos repetindo isso e a quem essa falsa aparência prejudica?". Desse pensamento prático vem a base para cortar correntes.',
  }
];

export default function QuizStage({ onNext }: StageProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [brokenChains, setBrokenChains] = useState(0);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    
    let newBroken = brokenChains;
    if (idx === QUESTIONS[currentQ].correct) {
      newBroken += 1;
      setBrokenChains(newBroken);
    }
    localStorage.setItem('caverna_quiz_score', newBroken.toString());
  };

  const handleNextQ = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Finished all queries
    }
  };

  const question = QUESTIONS[currentQ];
  const isFinished = currentQ === QUESTIONS.length - 1 && showResult;

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">Jogo das Sombras</h2>
        <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
          Correntes rompidas: {brokenChains} / {QUESTIONS.length}
        </p>
      </motion.div>

      <motion.div 
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-slate-800/30 rounded-3xl p-6 md:p-8 border border-slate-700"
      >
        <h3 className="text-xl md:text-2xl text-slate-200 mb-8 leading-snug">
          {question.text}
        </h3>

        <div className="space-y-4">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correct;
            const showAsCorrect = showResult && isCorrect;
            const showAsWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-300",
                  showResult ? "cursor-default" : "hover:border-amber-500/50 hover:bg-slate-800",
                  !showResult && !isSelected && "border-slate-700 bg-slate-900/50 text-slate-300",
                  !showResult && isSelected && "border-amber-500 bg-slate-800 text-slate-100",
                  showAsCorrect && "border-emerald-500 bg-emerald-900/30 text-emerald-100",
                  showAsWrong && "border-red-500 bg-red-900/30 text-red-100",
                  showResult && !isSelected && !isCorrect && "border-slate-800 bg-slate-900/30 opacity-50 text-slate-500"
                )}
              >
                <div className="flex justify-between items-center pr-2">
                  <span className="text-lg">{opt}</span>
                  {showAsCorrect && <ShieldCheck className="text-emerald-500 shrink-0 ml-4" />}
                  {showAsWrong && <ShieldAlert className="text-red-500 shrink-0 ml-4" />}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              className="bg-slate-900 border-l-4 border-amber-500 text-slate-300 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="shrink-0 mt-1 text-amber-500" />
                <p className="text-sm leading-relaxed">{question.explanation}</p>
              </div>
              
              {!isFinished ? (
                <button 
                  onClick={handleNextQ}
                  className="self-end mt-4 bg-slate-800 border border-slate-700 hover:border-amber-500/50 hover:text-amber-400 text-slate-200 px-6 py-2 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  Próximo Desafio
                </button>
              ) : (
                <button 
                  onClick={onNext}
                  className="self-end mt-4 bg-amber-500 text-slate-950 px-6 py-2 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest hover:bg-amber-400 flex gap-2 items-center"
                >
                  Continuar
                  <ArrowRight size={18} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
