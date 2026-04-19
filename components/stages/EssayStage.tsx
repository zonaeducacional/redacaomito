import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Send, AlertTriangle, BookOpen, CheckCircle, ArrowRight, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function EssayStage({ onNext }: StageProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'prompt' | 'write' | 'result' | 'guide'>('prompt');
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('caverna_essay');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    localStorage.setItem('caverna_essay', e.target.value);
  };

  const simulateEvaluation = () => {
    const cleanText = text.trim();
    if (cleanText.length < 150) {
      alert("Texto muito curto para avaliação. Desenvolva melhor seus argumentos (mínimo exigido).");
      return;
    }

    let c1 = 200, c2 = 40, c3 = 40, c4 = 40, c5 = 0;
    
    // Regras C1: Norma Culta (Simulação via gírias/abreviações e primeira pessoa)
    // O guia proíbe expressamente: 'Eu acho', 'Na minha opinião' (evitar no ENEM)
    const orality = /\b(vc|q|pq|tá|tb|tbm|pra|pro|net|tipo|né|zap|eu acho|na minha opinião|pra mim|minha visão|eu penso)\b/gi;
    const oralityMatch = cleanText.match(orality);
    if (oralityMatch) c1 -= (oralityMatch.length * 40);
    c1 = Math.max(40, c1); // Min score

    // Regras C2: Tema e Estrutura (Simulação via parágrafos e palavras-chave)
    const paragraphs = cleanText.split(/\n+/).filter(p => p.trim().length > 15);
    if (paragraphs.length >= 3) c2 += 80;
    if (paragraphs.length >= 4) c2 += 40;
    const themeRx = /\b(caverna|alienação|ilusão|realidade|sociedade|crítica|algoritmo|mídia|manipulação|consumo|tecnologia)\b/gi;
    const themeMatch = cleanText.match(themeRx);
    if (themeMatch && themeMatch.length > 2) c2 += 40;
    c2 = Math.min(200, c2);

    // Regras C3: Argumentação (Simulação via marcadores de argumento/causa/autoridade)
    const argRx = /\b(porque|já que|visto que|uma vez que|pois|motivo|evidência|prova|pesquisa|dados|histórico|consequência|segundo|de acordo com|conforme|exemplo)\b/gi;
    const argMatch = cleanText.match(argRx);
    if (argMatch) c3 += (argMatch.length * 40);
    c3 = Math.min(200, c3);

    // Regras C4: Coesão (Conectivos do Guia)
    const conRx = /\b(além disso|ademais|também|outrossim|entretanto|porém|contudo|todavia|no entanto|apesar de|porque|pois|uma vez que|visto que|já que|portanto|logo|assim|por isso|consequentemente|embora|ainda que|mesmo que|por exemplo|em suma|em conclusão|diante do exposto|dessa forma)\b/gi;
    const conMatch = cleanText.match(conRx);
    if (conMatch) c4 += (conMatch.length * 40);
    c4 = Math.min(200, c4);

    // Regras C5: Proposta de Intervenção (Os 5 Elementos do Guia)
    const agentRx = /\b(governo|estado|escola|família|sociedade|ministério|ong|mídia|escolas|educação|ongs|parcerias|iniciativa privada|poder público)\b/gi; // Agente
    const actionRx = /\b(deve|precisa|necessita|cabe a|promover|criar|fomentar|investir|conscientizar|ampliar|fortalecer|combater|garantir|implementar)\b/gi; // Ação
    const meansRx = /\b(por meio de|através de|mediante|com o uso de|utilizando|por intermédio de)\b/gi; // Modo/Meio
    const effectRx = /\b(a fim de|para que|com o intuito de|visando|objetivando|com o propósito de)\b/gi; // Efeito
    const detailRx = /\b(como, por exemplo|a exemplo de|tais como|como|especialmente|ou seja|isto é|em especial|focado em)\b/gi; // Detalhamento
    
    if (agentRx.test(cleanText)) c5 += 40;
    if (actionRx.test(cleanText)) c5 += 40;
    if (meansRx.test(cleanText)) c5 += 40;
    if (effectRx.test(cleanText)) c5 += 40;
    if (detailRx.test(cleanText)) c5 += 40;
    c5 = Math.min(200, c5);

    // Destaques Visuais no Texto (Heurística simples de replace)
    let processedHTML = cleanText
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Escape básico de segurança

    const highlights = [
      { rx: orality, class: "bg-red-500/40 border-b-2 border-red-500 text-slate-50 cursor-help px-1 rounded", title: "C1 (Erro): Uso de informalidade ou primeira pessoa ('Eu acho'). Seja impessoal." },
      { rx: conRx, class: "bg-emerald-500/40 border-b-2 border-emerald-500 text-slate-50 cursor-help px-1 rounded", title: "C4 (Acerto): Uso de conectivo." },
      { rx: agentRx, class: "bg-blue-500/40 border-b-2 border-blue-500 text-slate-50 cursor-help px-1 rounded", title: "C5 (Acerto): Agente da intervenção." },
      { rx: actionRx, class: "bg-purple-500/40 border-b-2 border-purple-500 text-slate-50 cursor-help px-1 rounded", title: "C5 (Acerto): Ação de intervenção." },
      { rx: meansRx, class: "bg-amber-500/40 border-b-2 border-amber-500 text-slate-900 cursor-help px-1 rounded", title: "C5 (Acerto): Modo/Meio (" },
      { rx: effectRx, class: "bg-pink-500/40 border-b-2 border-pink-500 text-slate-50 cursor-help px-1 rounded", title: "C5 (Acerto): Efeito esperado." },
      { rx: detailRx, class: "bg-teal-500/40 border-b-2 border-teal-500 text-slate-50 cursor-help px-1 rounded", title: "C5 (Acerto): Detalhamento da proposta." }
    ];

    highlights.forEach(h => {
      processedHTML = processedHTML.replace(h.rx, `<mark class="${h.class}" title="${h.title}">$1</mark>`);
    });

    // Converter quebras de linha em BR
    processedHTML = processedHTML.replace(/\n/g, "<br/>");

    const sumTotal = c1 + c2 + c3 + c4 + c5;
    localStorage.setItem('caverna_essay_score', sumTotal.toString());

    setEvaluation({
      scores: { c1, c2, c3, c4, c5 },
      total: sumTotal,
      html: processedHTML
    });
    setMode('result');
  };

  return (
    <div className="space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-serif text-4xl font-bold text-amber-100 mb-2">Redação Crítica</h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Estruture sua visão de mundo (Simulador ENEM)
        </p>
      </motion.div>

      {/* Navegação Interna da Redação */}
      <div className="flex bg-slate-900 border border-slate-700/50 rounded-xl p-1 w-full flex-wrap md:flex-nowrap">
        <button 
          onClick={() => setMode('prompt')}
          className={cn("px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2", mode === 'prompt' ? "bg-amber-500/20 text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200")}
        >
          <BookOpen size={16} /> Textos Motivadores
        </button>
        <button 
          onClick={() => setMode('guide')}
          className={cn("px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2", mode === 'guide' ? "bg-amber-500/20 text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200")}
        >
          <BookMarked size={16} /> Guia Estrutural
        </button>
        <button 
          onClick={() => setMode('write')}
          className={cn("px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2", mode === 'write' ? "bg-amber-500/20 text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200")}
        >
          <FileText size={16} /> Escrever Texto
        </button>
        {evaluation && (
          <button 
            onClick={() => setMode('result')}
            className={cn("px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2", mode === 'result' ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200")}
          >
            <CheckCircle size={16} /> Correção
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'prompt' && (
          <motion.div 
            key="prompt"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="bg-amber-900/10 border border-amber-500/30 p-6 rounded-2xl">
              <h3 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Tema da Redação</h3>
              <p className="font-serif text-2xl text-slate-100">
                "O papel da tecnologia e dos algoritmos como a nova 'Caverna' e as vias para alcançar a autonomia do pensamento."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
                <h4 className="text-slate-400 text-xs font-bold uppercase mb-4 mb-3 border-b border-slate-700 pb-2">Texto I</h4>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "As redes sociais criam algoritmos que nos mostram apenas aquilo que já concordamos. Formam-se bolhas de filtro onde não há mais o choque do contraditório. O indivíduo pensa estar vendo o mundo, mas está apenas vendo um espelho moldado para mantê-lo consumindo conteúdo pelo maior tempo possível."
                </p>
                <p className="text-xs text-slate-500 mt-2 text-right">— Crítica da Mídia Contemporânea</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
                <h4 className="text-slate-400 text-xs font-bold uppercase mb-4 mb-3 border-b border-slate-700 pb-2">Texto II</h4>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "O prisioneiro liberto é forçado a olhar a própria luz e seus olhos doem; ele tenta voltar para as sombras, que lhe parecem mais claras e seguras do que os objetos que estão sendo mostrados agora. A desalienação exige o esforço de suportar a luz."
                </p>
                <p className="text-xs text-slate-500 mt-2 text-right">— Alegoria Atualizada</p>
              </div>
            </div>

            <div className="bg-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <p className="text-sm text-slate-300">
                A partir da leitura dos textos motivadores e com base nos seus conhecimentos sociológicos contruídos, redija um texto dissertativo-argumentativo em norma padrão. Apresente uma <strong>proposta de intervenção</strong> que respeite os direitos humanos.
              </p>
            </div>

            <button 
              onClick={() => setMode('guide')}
              className="mt-6 bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors w-full justify-center"
            >
              Consultar o Guia de Estrutura <BookMarked size={16} />
            </button>
          </motion.div>
        )}

        {mode === 'guide' && (
          <motion.div 
            key="guide"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            className="space-y-6 text-slate-300"
          >
            <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
              <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-4 border-b border-slate-700 pb-2">Como construir sua Redação (Estilo ENEM)</h3>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">1. Introdução (1 parágrafo)</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2 text-slate-400">
                    <li><strong className="text-slate-200">Contextualização:</strong> Use alusão histórica, dados ou filósofos (ex: Caverna de Platão).</li>
                    <li><strong className="text-slate-200">Problematização:</strong> Mostre como a contextualização se liga ao problema atual.</li>
                    <li><strong className="text-slate-200">Tese:</strong> Seu ponto de vista claro sobre o tema abordado.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">2. Desenvolvimento (2 a 3 parágrafos)</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2 text-slate-400">
                    <li><strong className="text-slate-200">Tópico Frasal:</strong> Resuma a ideia principal do parágrafo na primeira frase.</li>
                    <li><strong className="text-slate-200">Argumentação:</strong> Defenda a tese com provas, causas/consequências e autoridades.</li>
                    <li><strong className="text-slate-200">Conclusão Parcial:</strong> Conecte a ideia de volta ao tema central.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">3. Conclusão e Intervenção (C5)</h4>
                  <p className="text-sm text-slate-400 mb-2">Para alcançar 200 pontos na C5, ofereça uma proposta concreta respeitando os Direitos Humanos contendo os 5 elementos:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2 text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <li><strong className="text-amber-300">Agente:</strong> Quem vai agir? (ex: O Estado, Ministério da Educação)</li>
                    <li><strong className="text-amber-300">Ação:</strong> O que fará? (ex: deve implementar, criar, investir)</li>
                    <li><strong className="text-amber-300">Modo/Meio:</strong> Como? (ex: por meio de, mediante, através de)</li>
                    <li><strong className="text-amber-300">Efeito:</strong> Para quê? (ex: a fim de, com o intuito de)</li>
                    <li><strong className="text-amber-300">Detalhamento:</strong> Especifique (ex: como oficinas de letramento digital, por exemplo)</li>
                  </ul>
                </div>

                <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                  <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2">O que Evitar (Erros Fatais)</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-slate-400">
                    <li>O uso da 1ª Pessoa (<em>Eu acho</em>, <em>Na minha opinião</em>). A impessoalidade é fundamental.</li>
                    <li>Argumentos sem conclusão ou contraditórios.</li>
                    <li>Fugir do recorte temático do texto motivador.</li>
                    <li>A redação precisa ter um desenvolvimento argumentativo de bom tamanho (recomendado entre 25 e 30 linhas como cobrado no formato ENEM).</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setMode('write')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors ml-auto shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Iniciar Redação <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {mode === 'write' && (
          <motion.div 
            key="write"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Seu Texto</p>
              <p className={cn("text-xs", text.length < 150 ? "text-red-400" : "text-emerald-400")}>
                {text.length} caracteres
              </p>
            </div>
            
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="Comece sua dissertação aqui... Estruture em parágrafos. Use conectivos. (Não esqueça a proposta de intervenção no final!)."
              className="w-full h-80 md:h-[450px] bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none font-serif leading-relaxed text-lg"
            />

            <div className="flex justify-between items-center pt-4">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <AlertTriangle size={14} /> Salvo automaticamente
              </p>
              <button 
                onClick={simulateEvaluation}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Submeter para Correção <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'result' && evaluation && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-slate-800/40 border border-slate-700 p-6 md:p-8 rounded-3xl text-center">
              <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold mb-2">Nota Final (Simulação)</p>
              <h2 className="text-6xl md:text-8xl font-black text-amber-400 font-serif mb-6">{evaluation.total}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">C1: Norma Culta</p>
                  <p className={cn("text-xl font-bold", evaluation.scores.c1 >= 160 ? "text-emerald-400" : "text-amber-400")}>{evaluation.scores.c1}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">C2: Estrutura/Tema</p>
                  <p className={cn("text-xl font-bold", evaluation.scores.c2 >= 160 ? "text-emerald-400" : "text-amber-400")}>{evaluation.scores.c2}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">C3: Argumentação</p>
                  <p className={cn("text-xl font-bold", evaluation.scores.c3 >= 160 ? "text-emerald-400" : "text-amber-400")}>{evaluation.scores.c3}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">C4: Coesão</p>
                  <p className={cn("text-xl font-bold", evaluation.scores.c4 >= 160 ? "text-emerald-400" : "text-amber-400")}>{evaluation.scores.c4}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">C5: Intervenção</p>
                  <p className={cn("text-xl font-bold", evaluation.scores.c5 >= 160 ? "text-emerald-400" : "text-amber-400")}>{evaluation.scores.c5}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8">
              <h3 className="text-amber-100 font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                <BookMarked size={20} className="text-amber-500" />
                Seu Texto Explicado
              </h3>
              
              <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Gíria / 1ª Pessoa</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Conectivo (C4)</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Agente (C5)</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-sm"></div> Ação (C5)</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Modo (C5)</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-pink-500 rounded-sm"></div> Efeito (C5)</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded-sm"></div> Detalhamento (C5)</span>
              </div>

              <div 
                className="prose prose-invert max-w-none font-serif text-lg leading-loose text-slate-300"
                dangerouslySetInnerHTML={{ __html: evaluation.html }}
              />

              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 italic">
                Nota: Esta é uma simulação heurística simplificada estruturada nos 5 elementos (C5) e nos bloqueios de impessoalidade avaliados pelo ENEM (e descritos no seu Guia). Para avaliações oficiais unicamente semânticas, consulte seu professor.
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={onNext}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                Concluir Redação e Avançar <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
