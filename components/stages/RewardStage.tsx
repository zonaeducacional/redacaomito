import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Sun, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';

interface StageProps {
  onNext: () => void;
  openGlossary: (term: string) => void;
}

export default function RewardStage() {
  const [name, setName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [scores, setScores] = useState({
    quiz: 0,
    reflexao: 0,
    redacao: 0,
    total: 0
  });

  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Collect specific scores
    const quizCount = parseInt(localStorage.getItem('caverna_quiz_score') || '0', 10);
    const quizScore = Math.min((quizCount / 10) * 0.5, 0.5);

    let reflexaoScore = 0;
    try {
      const refArr = JSON.parse(localStorage.getItem('caverna_refs_array') || '[]');
      const validAnswers = refArr.filter((r: string) => r.trim().length > 10).length;
      if (validAnswers >= 5) reflexaoScore = 0.5;
    } catch(e) {}

    const essayRaw = parseInt(localStorage.getItem('caverna_essay_score') || '0', 10);
    const essayScore = Math.max(0, Math.min(essayRaw / 1000, 1.0));

    setScores({
      quiz: Number(quizScore.toFixed(2)),
      reflexao: Number(reflexaoScore.toFixed(2)),
      redacao: Number(essayScore.toFixed(2)),
      total: Number((quizScore + reflexaoScore + essayScore).toFixed(2))
    });

    // Run simple confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fde047', '#fbbf24', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fde047', '#fbbf24', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const generatePDF = () => {
    setIsGenerating(true);
    try {
      // Usar unidades padrão (mm) e formato A4 para máxima compatibilidade
      const pdf = new jsPDF('l', 'mm', 'a4');
      const width = 297;
      const height = 210;

      // Fundo
      pdf.setFillColor(2, 6, 23);
      pdf.rect(0, 0, width, height, 'F');

      // Bordas Decorativas
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(1);
      pdf.rect(5, 5, width - 10, height - 10, 'S');
      pdf.setLineWidth(0.2);
      pdf.rect(7, 7, width - 14, height - 14, 'S');

      // Ícone Sol
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(1);
      pdf.circle(width / 2, 40, 8, 'S');
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        pdf.line(
          width / 2 + Math.cos(angle) * 10, 40 + Math.sin(angle) * 10,
          width / 2 + Math.cos(angle) * 14, 40 + Math.sin(angle) * 14
        );
      }

      // Título
      pdf.setTextColor(251, 191, 36);
      pdf.setFont('times', 'bold');
      pdf.setFontSize(40);
      pdf.text('CERTIFICADO', width / 2, 70, { align: 'center' });
      
      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(16);
      pdf.setFont('times', 'normal');
      pdf.text('DE CONSCIÊNCIA CRÍTICA', width / 2, 80, { align: 'center' });

      // Nome do Aluno
      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(12);
      pdf.text('Certificamos que', width / 2, 100, { align: 'center' });
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(30);
      pdf.setFont('times', 'italic');
      pdf.text((name || 'ALUNO(A)').toUpperCase(), width / 2, 115, { align: 'center' });
      pdf.setDrawColor(245, 158, 11);
      pdf.line(width / 2 - 60, 118, width / 2 + 60, 118);

      // Descrição
      pdf.setTextColor(203, 213, 225);
      pdf.setFontSize(11);
      pdf.setFont('times', 'normal');
      const desc = 'completou com sucesso o exercício de construção de texto dissertativo-argumentativo através da Alegoria da Caverna. Adquiriu as bases da análise crítica e assumiu o compromisso da Práxis em prol da autonomia do pensamento na sociedade contemporânea.';
      const splitDesc = pdf.splitTextToSize(desc, 220);
      pdf.text(splitDesc, width / 2, 135, { align: 'center' });

      // Tabela de Notas
      pdf.setDrawColor(51, 65, 85);
      pdf.line(50, 160, width - 50, 160);
      pdf.line(50, 185, width - 50, 185);

      pdf.setTextColor(148, 163, 184);
      pdf.setFontSize(9);
      pdf.text('QUIZ', 75, 168, { align: 'center' });
      pdf.text('REFLEXÃO', 125, 168, { align: 'center' });
      pdf.text('DISSERTAÇÃO', 175, 168, { align: 'center' });
      pdf.setTextColor(245, 158, 11);
      pdf.text('NOTA FINAL', 225, 168, { align: 'center' });

      pdf.setTextColor(251, 191, 36);
      pdf.setFontSize(14);
      pdf.text(scores.quiz.toFixed(2), 75, 178, { align: 'center' });
      pdf.text(scores.reflexao.toFixed(2), 125, 178, { align: 'center' });
      pdf.text(scores.redacao.toFixed(2), 175, 178, { align: 'center' });
      pdf.setFontSize(18);
      pdf.text(scores.total.toFixed(2), 225, 178, { align: 'center' });

      // Data
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(9);
      pdf.text(`DATA DE EMISSÃO: ${new Date().toLocaleDateString('pt-BR')}`, width / 2, 200, { align: 'center' });

      // Download Direto
      pdf.save('Certificado_Mito_da_Caverna.pdf');
    } catch (error: any) {
      console.error('Error generating PDF', error);
      alert('Erro técnico: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 rounded-full animate-pulse" />
        <div className="bg-slate-900 border-4 border-amber-400 text-amber-400 p-8 rounded-full shadow-[0_0_40px_rgba(245,158,11,0.3)] relative z-10 flex flex-col items-center justify-center">
          <Sun size={64} className="mb-2" />
        </div>
        <Sparkles className="absolute top-0 right-0 text-amber-500 animate-bounce" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-100 mb-4">
          Consciência Crítica
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
          Parabéns! Você completou a jornada. Você viu as sombras da alienação, compreendeu a ideologia por trás delas e reconheceu a importância da ação prática (a práxis) para transformar a nossa sociedade atual.
        </p>

        <div className="bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-amber-500/30 w-full max-w-md mx-auto text-left shadow-[0_0_30px_rgba(245,158,11,0.1)]">
          <label className="block text-xs font-bold text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Award size={16} /> Certificado de Autonomia
          </label>
          <input 
            type="text" 
            placeholder="Seu nome" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-xl font-medium focus:ring-1 ring-amber-500 focus:outline-none mb-4 text-slate-100 placeholder:text-slate-600"
          />
          <div className="text-sm text-slate-300">
            <p className="mb-1">Certificamos que <strong className="text-amber-400">{name || '__________'}</strong> adquiriu as bases da análise crítica, comprometendo-se a unir pensamento e atitude para superar as ilusões impostas no dia a dia.</p>
            <p className="text-slate-500 mt-4 text-[10px] tracking-widest font-mono uppercase">Data: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          
          <div className="mt-6 space-y-2 border-t border-slate-700/50 pt-4 text-xs font-mono">
            <div className="flex justify-between text-slate-400"><span>Quiz Desafio:</span> <span>{scores.quiz.toFixed(2)} / 0.50</span></div>
            <div className="flex justify-between text-slate-400"><span>Práxis e Voz:</span> <span>{scores.reflexao.toFixed(2)} / 0.50</span></div>
            <div className="flex justify-between text-slate-400"><span>Redação Final:</span> <span>{scores.redacao.toFixed(2)} / 1.00</span></div>
            <div className="flex justify-between font-bold text-amber-500 pt-2 border-t border-slate-700/50"><span>NOTA FINAL:</span> <span>{scores.total.toFixed(2)} / 2.00</span></div>
          </div>

          <button 
            disabled={!name || isGenerating}
            onClick={generatePDF}
            className="w-full mt-6 bg-slate-100 hover:bg-white text-slate-900 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed p-4 rounded-xl font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 transition-colors"
          >
            {isGenerating ? 'Gerando...' : 'Baixar Certificado em PDF (v1.2)'} <Download size={16} />
          </button>
        </div>
      </motion.div>

      {/* Hidden Layout for PDF Canvas - Adjusted for better browser rendering */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '1123px', 
          height: '794px', 
          zIndex: -9999, 
          pointerEvents: 'none', 
          opacity: 0
        }}
      >
        <div 
          ref={certRef} 
          className="bg-slate-950 text-slate-100 w-[1123px] h-[794px] p-16 flex flex-col items-center justify-center relative font-serif"
        >
          {/* Decorative Borders */}
          <div className="absolute inset-4 border-2 border-amber-500/50"></div>
          <div className="absolute inset-6 border border-amber-500/20"></div>
          
          <Sun size={80} className="text-amber-500 mb-6" />
          
          <h1 className="text-5xl font-black text-amber-400 mb-2 tracking-widest uppercase">Certificado</h1>
          <h2 className="text-2xl font-light tracking-[0.3em] text-slate-400 mb-12 uppercase">de Consciência Crítica</h2>
          
          <p className="text-xl text-slate-400 mb-4 font-sans">Certificamos que</p>
          <p className="text-6xl text-white border-b-2 border-amber-500/30 px-12 pb-4 mb-10 italic">
            {name || "NOME DO ALUNO"}
          </p>
          
          <p className="text-xl text-slate-300 max-w-3xl text-center leading-relaxed mb-12">
            completou com sucesso o exercício de construção de texto dissertativo-argumentativo através da Alegoria da Caverna. 
            Adquiriu as bases da análise crítica e assumiu o compromisso da Práxis em prol da autonomia do pensamento na sociedade contemporânea.
          </p>

          <div className="grid grid-cols-4 gap-8 mb-12 text-center w-full max-w-3xl border-t border-b border-slate-700 py-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-sans font-bold">Resolução (Quiz)</p>
              <p className="text-2xl text-amber-400 font-bold">{scores.quiz.toFixed(2)}</p>
              <p className="text-xs text-slate-600 mt-1">/ 0.50</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-sans font-bold">Reflexão Cidadã</p>
              <p className="text-2xl text-amber-400 font-bold">{scores.reflexao.toFixed(2)}</p>
              <p className="text-xs text-slate-600 mt-1">/ 0.50</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-sans font-bold">Dissertação Analítica</p>
              <p className="text-2xl text-amber-400 font-bold">{scores.redacao.toFixed(2)}</p>
              <p className="text-xs text-slate-600 mt-1">/ 1.00</p>
            </div>
            <div className="bg-amber-900/20 rounded-xl p-2 -my-2 border border-amber-500/30 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-1 font-sans font-bold">Ponto Final</p>
              <p className="text-3xl text-amber-400 font-black">{scores.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="text-slate-500 font-mono text-sm tracking-widest mt-auto border-t border-slate-800 pt-6 px-12">
            DATA DE EMISSÃO: {new Date().toLocaleDateString('pt-BR')} 
          </div>
        </div>
      </div>
    </div>
  );
}
