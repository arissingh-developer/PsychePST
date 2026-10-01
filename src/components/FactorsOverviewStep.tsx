import React, { useState } from 'react';
import { FactorDefinition, UserProfile } from '../types/psychology';
import { PSYCHOLOGICAL_FACTORS } from '../data/psychologyFactors';
import { 
  Activity, 
  Zap, 
  HeartHandshake, 
  Flame, 
  ShieldCheck, 
  Target, 
  ShieldAlert, 
  FlameKindling, 
  Brain, 
  SunMedium, 
  ArrowRight, 
  Info,
  CheckCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface FactorsOverviewStepProps {
  profile: UserProfile;
  onProceedToQuestionnaire: () => void;
  onBackToProfile: () => void;
}

export const FactorsOverviewStep: React.FC<FactorsOverviewStepProps> = ({
  profile,
  onProceedToQuestionnaire,
  onBackToProfile,
}) => {
  const [selectedFactorId, setSelectedFactorId] = useState<string>('anxiety');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity': return Activity;
      case 'Zap': return Zap;
      case 'HeartHandshake': return HeartHandshake;
      case 'Flame': return Flame;
      case 'ShieldCheck': return ShieldCheck;
      case 'Target': return Target;
      case 'ShieldAlert': return ShieldAlert;
      case 'FlameKindling': return FlameKindling;
      case 'Brain': return Brain;
      case 'SunMedium': return SunMedium;
      default: return Activity;
    }
  };

  const selectedFactor = PSYCHOLOGICAL_FACTORS.find(f => f.id === selectedFactorId) || PSYCHOLOGICAL_FACTORS[0];
  const SelectedIcon = getIcon(selectedFactor.iconName);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Step 2: The 10 Psychological Factors
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Psychological Blueprint Architecture
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Following our performance pathway, each of the 10 psychological pillars is evaluated with age-tailored calibration for <strong className="text-indigo-600 dark:text-indigo-400">Age {profile.ageGroup}</strong> and {profile.isAthlete ? `sport-specific context for ${profile.sport}` : 'general performance wellness'}.
        </p>
      </div>

      {/* Grid of the 10 Factors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {PSYCHOLOGICAL_FACTORS.map((factor, idx) => {
          const Icon = getIcon(factor.iconName);
          const isSelected = factor.id === selectedFactorId;

          return (
            <button
              key={factor.id}
              onClick={() => setSelectedFactorId(factor.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-indigo-600 ring-2 ring-indigo-500/30 shadow-md -translate-y-0.5'
                  : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${factor.colorScheme.bg} ${factor.colorScheme.text}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">#{idx + 1}</span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {factor.title}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                <span className={factor.isDistressMeasure ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}>
                  {factor.isDistressMeasure ? 'Distress' : 'Capability'}
                </span>
                <span className="text-slate-400 font-medium">3 Skills</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Factor Detailed Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${selectedFactor.colorScheme.bg} ${selectedFactor.colorScheme.text}`}>
              <SelectedIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {selectedFactor.title}
                </h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${selectedFactor.colorScheme.badge}`}>
                  {selectedFactor.isDistressMeasure ? 'Regulation Target' : 'Empowerment Target'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                {selectedFactor.longDescription}
              </p>
            </div>
          </div>

          {/* Age-Specific Tailored Tip Box */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 md:max-w-xs shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Tailored for Age {profile.ageGroup}:</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{selectedFactor.ageTips[profile.ageGroup || '20-24']}"
            </p>
          </div>
        </div>

        {/* The 3 Matched Skills Preview */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3 Matched Psychological Skills (PST Protocol):
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Activated based on your assessment results
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedFactor.matchedSkills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Skill #{idx + 1}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                      {skill.duration}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{skill.tagline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBackToProfile}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>

        <button
          type="button"
          onClick={onProceedToQuestionnaire}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Begin Questionnaire ({profile.isAthlete ? '40 Questions' : '30 Questions'})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
