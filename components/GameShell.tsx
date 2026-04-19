import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, Search, Sword, Target, Trophy, ChevronRight, Menu, X, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';
import IntroStage from '@/components/stages/IntroStage';
import BioStage from '@/components/stages/BioStage';
import CaveTextStage from '@/components/stages/CaveTextStage';
import AnalysisStage from '@/components/stages/AnalysisStage';
import QuizStage from '@/components/stages/QuizStage';
import ReflectionStage from '@/components/stages/ReflectionStage';
import EssayStage from '@/components/stages/EssayStage';
import RewardStage from '@/components/stages/RewardStage';
import GlossaryOverlay from '@/components/GlossaryOverlay';

const STAGES = [
  { id: 'intro', title: 'Ideologia e Realidade', icon: Map },
  { id: 'bio', title: 'Uma Visão Crítica', icon: Search },
  { id: 'cave', title: 'A Alegoria', icon: BookOpen },
  { id: 'analysis', title: 'Dialética e Totalidade', icon: Target },
  { id: 'quiz', title: 'Desafio das Sombras', icon: Sword },
  { id: 'reflection', title: 'Práxis e Emancipação', icon: BookMarked },
  { id: 'essay', title: 'Redação Crítica', icon: BookMarked },
  { id: 'reward', title: 'Consciência Crítica', icon: Trophy },
];

export default function GameShell() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState<number[]>([0]);
  const [showMenu, setShowMenu] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('caverna_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUnlockedStages(parsed.unlockedStages || [0]);
      setCurrentStageIndex(parsed.currentStageIndex || 0);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (index: number, unlocked: number[]) => {
    localStorage.setItem('caverna_progress', JSON.stringify({ currentStageIndex: index, unlockedStages: unlocked }));
  };

  const advanceStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextIndex = currentStageIndex + 1;
      const newUnlocked = Array.from(new Set([...unlockedStages, nextIndex]));
      setUnlockedStages(newUnlocked);
      setCurrentStageIndex(nextIndex);
      saveProgress(nextIndex, newUnlocked);
      window.scrollTo(0, 0);
    }
  };

  const goToStage = (index: number) => {
    if (unlockedStages.includes(index)) {
      setCurrentStageIndex(index);
      saveProgress(index, unlockedStages);
      setShowMenu(false);
      window.scrollTo(0, 0);
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Carregando a jornada...</div>;

  const StageComponent = [
    IntroStage,
    BioStage,
    CaveTextStage,
    AnalysisStage,
    QuizStage,
    ReflectionStage,
    EssayStage,
    RewardStage,
  ][currentStageIndex];

  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto relative pb-24 lg:pb-0 pt-16 lg:pt-0">
      
      {/* Top Mobile Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0f172a] text-slate-100 p-4 flex items-center justify-between lg:hidden border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">Φ</div>
          <div className="font-serif text-lg font-bold italic text-amber-100">A Caverna</div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowGlossary(true)} className="p-2 -m-2 opacity-80 hover:opacity-100" aria-label="Glossário">
            <BookMarked size={20} />
          </button>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 -m-2 opacity-80 hover:opacity-100" aria-label="Menu">
            {showMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Layout - Side Menu + Content */}
      <div className="flex flex-1 w-full relative">
        
        {/* Sidebar Menu - Desktop */}
        <nav className="hidden lg:flex flex-col w-64 bg-[#0f172a] text-slate-300 py-8 px-4 h-screen sticky top-0 border-r border-slate-700">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-700 pb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl">Φ</div>
            <div className="font-serif text-2xl text-slate-100 italic tracking-tight">A Caverna</div>
          </div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4 font-bold px-2">A Jornada</h2>
          <div className="flex-1 flex flex-col gap-2">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const isUnlocked = unlockedStages.includes(i);
              const isActive = i === currentStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => goToStage(i)}
                  disabled={!isUnlocked}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl text-left transition-all border",
                    isActive ? "bg-amber-500 text-slate-950 font-semibold border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : 
                    isUnlocked ? "bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:text-amber-400 group" : 
                    "bg-slate-800/50 border-slate-700/50 opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon size={18} />
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setShowGlossary(true)}
            className="mt-auto p-4 bg-slate-900 rounded-2xl border-l-4 border-amber-500 text-slate-300 hover:text-amber-400 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <BookMarked size={18} />
              <span className="font-bold text-sm">Biblioteca & Glossário</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-30 bg-[#0f172a] text-slate-200 pt-20 px-6 pb-6 lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {STAGES.map((stage, i) => {
                  const Icon = stage.icon;
                  const isUnlocked = unlockedStages.includes(i);
                  const isActive = i === currentStageIndex;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => goToStage(i)}
                      disabled={!isUnlocked}
                      className={cn(
                        "flex items-center gap-4 px-4 py-4 rounded-xl text-left text-lg transition-all border",
                        isActive ? "bg-amber-500 text-slate-950 font-semibold border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : 
                        isUnlocked ? "bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:text-amber-400" : 
                        "bg-slate-800/50 border-slate-700/50 opacity-40"
                      )}
                    >
                      <Icon size={24} />
                      <span>{stage.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 py-8 lg:py-12 overflow-x-hidden min-h-[calc(100vh-4rem)] lg:min-h-screen">
          <div className="flex-1 flex flex-col mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex-1"
              >
                <StageComponent onNext={advanceStage} openGlossary={(term: string) => {}} />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <footer className="w-full text-center py-6 border-t border-slate-800 text-xs text-slate-500 font-mono tracking-widest leading-loose mt-auto">
            Desenvolvido pelo Profº Sérgio Araújo para as turmas do 9º ano<br className="lg:hidden" />
            <span className="hidden lg:inline"> . </span>Língua Portuguesa<br className="lg:hidden" />
            <span className="hidden lg:inline"> . </span>Projeto Juri Simulado<br className="lg:hidden" />
            <span className="hidden lg:inline"> . </span>O Texto dissertativo-argumentativo<br className="lg:hidden" />
            <span className="hidden lg:inline"> . </span>Escola Januário E. de Lima<br className="lg:hidden" />
            <span className="hidden lg:inline"> . </span>2026
          </footer>
        </main>
      </div>
      
      {/* Global Glossary Overlay */}
      <AnimatePresence>
        {showGlossary && <GlossaryOverlay onClose={() => setShowGlossary(false)} />}
      </AnimatePresence>

    </div>
  );
}
