import React, { useState } from 'react';
import { UserProfile, FactorScoreResult, PstSkill } from '../types/psychology';
import { RadarChart } from './RadarChart';
import { InteractiveSkillModal } from './InteractiveSkillModal';
import { 
  Dumbbell, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Play, 
  Clock, 
  Award,
  Layers,
  Activity,
  Flame,
  Zap,
  Target
} from 'lucide-react';

interface PstPlanStepProps {
  profile: UserProfile;
  factorResults: FactorScoreResult[];
  onProceedToTarget: () => void;
  onBackToQuestionnaire: () => void;
}

export const PstPlanStep: React.FC<PstPlanStepProps> = ({
  profile,
  factorResults,
  onProceedToTarget,
  onBackToQuestionnaire,
}) => {
  const [selectedSkillForPractice, setSelectedSkillForPractice] = useState<PstSkill | null>(null);

  // Filter factors that need attention
  // Highest priority first is already ensured by evaluateFactors sorting
  const attentionFactors = factorResults.filter(f => f.needsAttention);
  
  // If zero factors strictly need attention, pick the lowest scoring factor as an optimization target
  const displayFactors = attentionFactors.length > 0 
    ? attentionFactors 
    : [factorResults[factorResults.length - 1]]; // lowest scoring asset

  const isAllOptimal = attentionFactors.length === 0;

  // Calculate average health index
  const avgHealthIndex = Math.round(
    factorResults.reduce((acc, curr) => acc + curr.healthIndex, 0) / factorResults.length
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
          <Dumbbell className="w-3.5 h-3.5" /> Step 4: Psychological Skills Training (PST) Plan
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Prioritized Mental Skills Program
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Tailored specifically for <strong className="text-indigo-600 dark:text-indigo-400">{profile.name}</strong> ({profile.ageGroup} age group • {profile.isAthlete ? `${profile.sport} Athlete` : 'Individual'}). Only factors requiring developmental attention are displayed, ranked by priority.
        </p>
      </div>

      {/* Summary Scorecard & Radar Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Radar Profile */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            10-Factor Psychological Polar Profile
          </span>
          <RadarChart results={factorResults} />
        </div>

        {/* Diagnostic Snapshot Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Psychological Health Index</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{avgHealthIndex}%</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    avgHealthIndex >= 70 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {avgHealthIndex >= 75 ? 'Resilient & Robust' : avgHealthIndex >= 55 ? 'Balanced Potential' : 'Developmental Priority'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Priority Count</span>
                <div className="mt-1 text-2xl font-black text-rose-600 dark:text-rose-400">
                  {attentionFactors.length} of 10 Factors
                </div>
              </div>
            </div>

            {/* Quick Priority Tags */}
            <div className="py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Factors Requiring Immediate Attention (Ranked by Severity):
              </span>
              {attentionFactors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {attentionFactors.map((f, i) => (
                    <span
                      key={f.factorId}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>#{i + 1} {f.title} ({f.healthIndex}% Health)</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Exceptional baseline! All 10 factors are in the healthy asset zone. Showing top optimization opportunity below.</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Age Profile: <strong className="text-slate-800 dark:text-slate-200">{profile.ageGroup}</strong></span>
            <span>Program Type: <strong className="text-slate-800 dark:text-slate-200">{profile.isAthlete ? `Competitive Sport (${profile.sport})` : 'General Performance'}</strong></span>
          </div>
        </div>
      </div>

      {/* Prioritized PST Training Modules */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Targeted Psychological Factors & Matched Skills
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Filtered exclusively to factors needing intervention, ordered highest priority first.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            {displayFactors.length} Active Module{displayFactors.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-6">
          {displayFactors.map((factor, factorIndex) => {
            return (
              <div
                key={factor.factorId}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden"
              >
                {/* Priority ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-xs">
                  {isAllOptimal ? 'Optimization Focus' : `Priority Rank #${factorIndex + 1}`}
                </div>

                {/* Factor Title & Diagnostics */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 pr-24">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {factor.title}
                      </h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        factor.healthIndex < 40 
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {factor.severityLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Current Health Index: <strong className="text-slate-800 dark:text-slate-200 font-bold">{factor.healthIndex}%</strong> (Deficit Priority Index: {factor.attentionPriority})
                    </p>
                  </div>
                </div>

                {/* Age-Group Specific Coaching Tip */}
                <div className="my-5 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                      Tailored Developmental Tip for Age Group {profile.ageGroup}:
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                      "{factor.ageTip}"
                    </p>
                  </div>
                </div>

                {/* The 3 Matched Skills for this Factor */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span>3 Matched Psychological Skills (PST Protocol):</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {factor.matchedSkills.map((skill, sIdx) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 flex flex-col justify-between hover:border-indigo-400 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                              Skill #{sIdx + 1}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {skill.duration.split(' ')[0]}
                            </span>
                          </div>

                          <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-snug mb-1">
                            {skill.name}
                          </h5>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                            {skill.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/70">
                          <button
                            type="button"
                            onClick={() => setSelectedSkillForPractice(skill)}
                            className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-600 hover:text-white border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer group"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Practice Skill</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onBackToQuestionnaire}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Review Questionnaire</span>
        </button>

        <button
          type="button"
          onClick={onProceedToTarget}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Proceed to TARGET Action Plan</span>
          <Target className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Modal */}
      {selectedSkillForPractice && (
        <InteractiveSkillModal
          skill={selectedSkillForPractice}
          onClose={() => setSelectedSkillForPractice(null)}
        />
      )}
    </div>
  );
};
