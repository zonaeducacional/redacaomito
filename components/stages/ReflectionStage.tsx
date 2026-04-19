import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Save, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

const REFLECTIONS_DATA = [
  {
    id: "ref1",
    label: "1. Ideologia: Qual discurso atual ou propaganda na sociedade você percebe que tenta normalizar algo que, no fundo, causa sofrimento ou não é justo?",
    placeholder: "Ex: A romantização do esgotamento, falsos padrões de sucesso ou beleza..."
  },
  {
    id: "ref2",
    label: "2. Práxis: Unir a reflexão crítica à ação real. Como os estudantes e as pessoas podem aplicar isso no dia a dia para transformar espaços na sua vizinhança ou escola?",
    placeholder: "Ex: Não compactuar com preconceitos, formar grupos de estudo coletivo..."
  },
  {
    id: "ref3",
    label: "3. O 'Fogo': Atualmente os algoritmos mediam boa parte do que vemos. Como essa tecnologia molda diretamente ou disfarçadamente nossos desejos ou opiniões?",
    placeholder: "Ex: Como as propagandas me afetam e alteram opiniões que seriam minhas..."
  },
  {
    id: "ref4",
    label: "4. As Correntes: Num mundo dominado por consumo de produtos e de imagem (likes), que padrão social de 'importância' você já sentiu a pressão para seguir?",
    placeholder: "Descreva um padrão que sentiu a necessidade ou tentaram te colocar..."
  },
  {
    id: "ref5",
    label: "5. A Confusão Inicial: Ver que as antigas prioridades não faziam sentido no fim das contas costuma causar angústia. Você já se desiludiu com algo e precisou amadurecer a partir disso?",
    placeholder: "Ex: Focar muito num sonho vendido e perceber depois que o importante era outra coisa..."
  },
  {
    id: "ref6",
    label: "6. Agressão do Status Quo: Ao tentar expor que uma crença difundida é falsa, você ou alguém que conheceu perdeu o apoio de conhecidos (como no caso do liberto retornar às amarras)?",
    placeholder: "Comente se já foi desencorajado após contestar atitudes injustas..."
  },
  {
    id: "ref7",
    label: "7. Aparência vs Essência: A 'Caverna' dita o 'parecer', o mundo ensina a 'ser'. Como você tem tentado alinhar o autoconhecimento íntimo para priorizar sua própria essência humana?",
    placeholder: "Ex: Separar momentos de introspecção e tempo para a família antes das telas..."
  },
  {
    id: "ref8",
    label: "8. Distinguindo a Luz: Frente à era das fake news e polarização manipulada, que mecanismos ou atitudes podem nos auxiliar a focar na verdade fatual?",
    placeholder: "O que te ajuda a evitar repassar falsas luzes projetadas pelos outros?..."
  },
  {
    id: "ref9",
    label: "9. Combate à Alienação: A repetição diária de 'apenas realizar suas tarefas e não raciocinar o sentido' reduz a presença de alguém. O que reaviva a sua presença humana por trás das tarefas rotineiras?",
    placeholder: "Mundo interior, criatividade, hobbies profundos, laços sociais..."
  },
  {
    id: "ref10",
    label: "10. Se organizar em prol da emancipação: Para romper correntes enraizadas, toda ajuda conta. Descreva uma pequena iniciativa para mudar sua comunidade ou que instigue o questionamento dos outros.",
    placeholder: "Fazer perguntas chaves a quem está alienado. Promover campanhas informativas..."
  }
];

export default function ReflectionStage({ onNext }: StageProps) {
  const [reflections, setReflections] = useState<string[]>(Array(10).fill(''));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedArr = localStorage.getItem('caverna_refs_array');
    if (savedArr) {
      setReflections(JSON.parse(savedArr));
    } else {
      // Legacy fallback
      const r1 = localStorage.getItem('caverna_ref1');
      const r2 = localStorage.getItem('caverna_ref2');
      if (r1 || r2) {
        const newArr = Array(10).fill('');
        newArr[0] = r1 || '';
        newArr[1] = r2 || '';
        setReflections(newArr);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('caverna_refs_array', JSON.stringify(reflections));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateRef = (index: number, val: string) => {
    const newArr = [...reflections];
    newArr[index] = val;
    setReflections(newArr);
  };

  const filledCount = reflections.filter(r => r.trim().length > 10).length;
  // Consider finished if at least 5 meaningful answers are given (since 10 questions is a huge amount)
  const isSufficient = filledCount >= 5;

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">Práxis</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Da Teoria Crítica à Ação Transformadora
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="text-sm text-slate-300 leading-relaxed space-y-4"
      >
        <p>A filosofia não existe apenas para nos dar conforto intelectual. Segundo a tradição do pensamento crítico, ela deve servir de ferramenta prática para a nossa vida visando melhorar o coletivo.</p>
        <p>A <strong className="text-amber-400">Práxis</strong> surge como a união entre a reflexão teórica (entender as amarras) e a ação consciente na vida real para superar as ilusões do dia a dia.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-slate-900 border-l-4 border-amber-500 p-4 text-sm text-slate-300 rounded-r-xl">
          <p>Para concluir a jornada, responda satisfatoriamente a pelo menos <strong className="text-amber-400">5 das 10 questões</strong> na Práxis. Lembre-se, o exercício é para você. Exponha sua voz e o que sente ao ver na nossa cultura moderna aspectos da Caverna de antanho.</p>
        </div>

        <div className="space-y-8">
          {REFLECTIONS_DATA.map((item, idx) => (
            <div key={item.id} className="flex-1 bg-slate-800/30 rounded-3xl border border-slate-700 p-6 md:p-8 flex flex-col focus-within:border-amber-500/50 transition-all">
              <label htmlFor={item.id} className="block text-xl font-serif text-amber-100 mb-4 cursor-pointer leading-snug">
                {item.label}
              </label>
              <textarea 
                id={item.id}
                value={reflections[idx]}
                onChange={(e) => updateRef(idx, e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none h-32 md:h-40"
                placeholder={item.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 sticky bottom-4 z-20 bg-[#0f172a]/90 backdrop-blur pb-4 pt-6 border-t border-slate-800">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-400 text-xs px-4 py-2 uppercase tracking-widest font-bold transition-colors"
          >
            {saved ? <Check className="text-emerald-500" /> : <Save size={16} />}
            {saved ? 'Salvo!' : 'Salvar Respostas'}
          </button>
          
          <button
            onClick={() => {
              handleSave();
              onNext();
            }}
            disabled={!isSufficient}
            className={cn(
              "inline-flex items-center gap-2 py-3 px-6 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.2)]",
              (!isSufficient) ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500" : "bg-amber-500 hover:bg-amber-400 text-slate-950"
            )}
          >
            {isSufficient ? 'Concluir Jornada' : `Preencha mais ${Math.max(0, 5 - filledCount)}`}
            {isSufficient && <ArrowRight size={18} />}
          </button>
        </div>
      </motion.div>

    </div>
  );
}
