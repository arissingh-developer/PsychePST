import React from 'react';
import { UserProfile, AppStep } from '../types/psychology';
import { 
  User, 
  BrainCircuit, 
  ClipboardCheck, 
  Dumbbell, 
  Target, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface HeaderProps {
  currentStep: AppStep;
  onSelectStep: (step: AppStep) => void;
  profile: UserProfile | null;
  onReset: () => void;
  canNavigateToStep: (step: AppStep) => boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onSelectStep,
  profile,
  onReset,
  canNavigateToStep,
}) => {
  const steps: { key: AppStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'profile', label: '1. Profile', icon: User },
    { key: 'factors_overview', label: '2. Factors', icon: BrainCircuit },
    { key: 'questionnaire', label: '3. Measure', icon: ClipboardCheck },
    { key: 'pst_plan', label: '4. PST Plan', icon: Dumbbell },
    { key: 'target', label: '5. TARGET', icon: Target },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">PsychePST</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                  <Sparkles className="w-3 h-3" /> Mental Training Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">10-Factor Psychological Skills System</p>
            </div>
          </div>

          {/* Active Profile Pill (if completed) */}
          {profile && profile.name && profile.ageGroup && (
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">{profile.name}</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-600 dark:text-slate-300">{profile.age} yrs</span>
              <span className="px-1.5 py-0.5 rounded-sm bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px]">
                {profile.ageGroup}
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                {profile.isAthlete ? (
                  <>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Athlete ({profile.sport || 'Sports'})</span>
                  </>
                ) : (
                  <span>Non-Athlete</span>
                )}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {profile && (
              <button
                onClick={onReset}
                title="Start New Assessment"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Workflow Breadcrumb Stepper matching notebook diagram */}
        <div className="py-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/60">
          <nav className="flex items-center min-w-max space-x-1 sm:space-x-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isAllowed = canNavigateToStep(step.key);

              return (
                <button
                  key={step.key}
                  disabled={!isAllowed}
                  onClick={() => onSelectStep(step.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isAllowed
                      ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                      : 'text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                  <span>{step.label}</span>
                  {idx < steps.length - 1 && (
                    <span className="ml-1 text-slate-300 dark:text-slate-700 pointer-events-none">&rarr;</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
