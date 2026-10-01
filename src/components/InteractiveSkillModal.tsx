import React, { useState, useEffect } from 'react';
import { PstSkill } from '../types/psychology';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface InteractiveSkillModalProps {
  skill: PstSkill | null;
  onClose: () => void;
}

export const InteractiveSkillModal: React.FC<InteractiveSkillModalProps> = ({
  skill,
  onClose,
}) => {
  // Breathing timer state
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Reframing tool state
  const [negativeThought, setNegativeThought] = useState<string>('What if I choke and everyone sees?');
  const [challengeReframe, setChallengeReframe] = useState<string>(
    'My heart is racing because my body is releasing oxygen and adrenaline to help me react faster. I am prepared and focused on my next move.'
  );

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Breathing Box Timer Loop (4-4-4-4)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive && skill?.exerciseType === 'breathing') {
      interval = setInterval(() => {
        setPhaseSeconds((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Transition phase
            setBreathingPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold (Full)';
              if (currentPhase === 'Hold (Full)') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Hold (Empty)';
              // Completed full cycle
              setCompletedCycles((c) => c + 1);
              return 'Inhale';
            });
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, skill?.exerciseType]);

  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {skill.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {skill.duration}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {skill.name}
          </h2>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
            {skill.tagline}
          </p>
        </div>

        {/* Live Interactive Widget if applicable */}
        {skill.exerciseType === 'breathing' && (
          <div className="mb-6 p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-4">
              Interactive Autonomic Pacer (4-4-4-4 Box Rhythm)
            </h3>

            {/* Pacer Ring */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-4">
              <div 
                className={`absolute inset-0 rounded-full border-4 border-indigo-500/30 transition-transform duration-1000 ${
                  breathingActive && (breathingPhase === 'Inhale' || breathingPhase === 'Hold (Full)')
                    ? 'scale-110 bg-indigo-500/20'
                    : 'scale-90 bg-indigo-500/5'
                }`}
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  {breathingPhase}
                </span>
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white my-1">
                  {phaseSeconds}s
                </span>
                <span className="text-[11px] text-slate-500">
                  Cycle #{completedCycles + 1}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setBreathingActive(!breathingActive)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                {breathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{breathingActive ? 'Pause Pacer' : 'Start 4-4-4-4 Pacer'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setBreathingActive(false);
                  setBreathingPhase('Inhale');
                  setPhaseSeconds(4);
                  setCompletedCycles(0);
                }}
                className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset Cycles"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {skill.exerciseType === 'reframing' && (
          <div className="mb-6 p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              Interactive Cognitive Reframing Studio
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Automatic Doubting Thought (Threat):
              </label>
              <input
                type="text"
                value={negativeThought}
                onChange={(e) => setNegativeThought(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                Constructive High-Performance Reframe (Challenge):
              </label>
              <textarea
                rows={2}
                value={challengeReframe}
                onChange={(e) => setChallengeReframe(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Step-by-Step Training Protocol */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>PST Execution Protocol:</span>
          </h3>
          <div className="space-y-2.5">
            {skill.howToPractice.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Evidence Base */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Scientific Foundation: </strong>
            <span>{skill.evidenceBase}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            Done Practicing
          </button>
        </div>
      </div>
    </div>
  );
};
