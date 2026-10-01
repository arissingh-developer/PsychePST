import React, { useState } from 'react';
import { UserProfile, FactorScoreResult, TargetPlanItem } from '../types/psychology';
import { 
  Target, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Download, 
  RotateCcw, 
  Award, 
  Clock, 
  Layers, 
  PenTool, 
  FileText 
} from 'lucide-react';

interface TargetStepProps {
  profile: UserProfile;
  factorResults: FactorScoreResult[];
  onBackToPst: () => void;
  onRestartAssessment: () => void;
}

export const TargetStep: React.FC<TargetStepProps> = ({
  profile,
  factorResults,
  onBackToPst,
  onRestartAssessment,
}) => {
  const attentionFactors = factorResults.filter(f => f.needsAttention);
  const primaryFactors = attentionFactors.length > 0 
    ? attentionFactors 
    : [factorResults[factorResults.length - 1]];

  // Generate initial target goals for each factor needing attention
  const [targetItems, setTargetItems] = useState<TargetPlanItem[]>(() => {
    return primaryFactors.map(f => {
      const current = f.healthIndex;
      const target = Math.min(95, Math.max(current + 25, 75));
      const firstSkill = f.matchedSkills[0]?.name || 'PST Skill Drill';

      return {
        id: f.factorId,
        factorId: f.factorId,
        factorTitle: f.title,
        currentHealthScore: current,
        targetHealthScore: target,
        primarySkill: firstSkill,
        weeklyTargetRoutine: `Practice ${firstSkill} 3x per week (4 mins/session)`,
        fourWeekTargetGoal: `Elevate ${f.title} health index from ${current}% to &ge;${target}%`,
      };
    });
  });

  const [signatureName, setSignatureName] = useState<string>(profile.name);
  const [targetCommitmentSigned, setTargetCommitmentSigned] = useState<boolean>(true);
  const [currentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleScoreChange = (factorId: string, newTarget: number) => {
    setTargetItems(prev => prev.map(item => 
      item.factorId === factorId ? { ...item, targetHealthScore: newTarget } : item
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const reportData = {
      profile,
      assessmentDate: new Date().toISOString(),
      factorResults: factorResults.map(f => ({
        factor: f.title,
        healthIndex: f.healthIndex,
        needsAttention: f.needsAttention,
        severity: f.severityLabel,
      })),
      targetPlan: targetItems,
      athleteSignature: signatureName,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PsychePST_Target_Plan_${profile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Printable Report Header (visible on screen and in print) */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Final Step: TARGET Mental Training Plan
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          PST Target Milestones & Action Roadmap
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The culmination of your psychological assessment. Define your target performance scores, structured weekly practice routines, and accountability checkpoints.
        </p>
      </div>

      {/* Target Action Bar (Print / Export / Retake) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 print:hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Target Roadmap Ready for <strong className="text-slate-900 dark:text-white">{profile.name}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-indigo-500" />
            <span>Print / Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Athlete Dossier Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Athlete / Individual Dossier</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{profile.name}</h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span>{profile.city}</span>
              <span>•</span>
              <span>{profile.age} Years Old (Group: {profile.ageGroup})</span>
              <span>•</span>
              <span>{profile.sex}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            {profile.isAthlete ? (
              <>
                <Award className="w-7 h-7 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{profile.sport}</div>
                  <div className="text-[11px] text-slate-500">{profile.athleteLevel} • {profile.yearsOfTraining}y exp</div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">General Performance Track</div>
                <div className="text-[11px] text-slate-500">Non-Athlete Wellness</div>
              </div>
            )}
          </div>
        </div>

        {/* Target Milestone Metrics Table */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-500" />
              <span>PST Factor Improvement Targets:</span>
            </h3>
            <span className="text-[11px] text-slate-400">4-Week & 12-Week Benchmarks</span>
          </div>

          <div className="space-y-4">
            {targetItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {item.factorTitle}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Primary Assigned Skill: <strong className="text-indigo-600 dark:text-indigo-400">{item.primarySkill}</strong>
                    </p>
                  </div>

                  {/* Target Score Sliders / Steppers */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Current</span>
                      <span className="text-xl font-black text-rose-600 dark:text-rose-400">{item.currentHealthScore}%</span>
                    </div>

                    <div className="text-slate-300 dark:text-slate-600 text-xl font-bold">&rarr;</div>

                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">4-Wk Target</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={Math.min(item.currentHealthScore + 5, 90)}
                          max="100"
                          step="5"
                          value={item.targetHealthScore}
                          onChange={(e) => handleScoreChange(item.factorId, parseInt(e.target.value))}
                          className="w-20 accent-indigo-600 cursor-pointer print:hidden"
                        />
                        <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{item.targetHealthScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Weekly PST Routine: </span>
                    <span className="text-slate-600 dark:text-slate-400">{item.weeklyTargetRoutine}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Target Outcome: </span>
                    <span className="text-slate-600 dark:text-slate-400">{item.fourWeekTargetGoal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Micro-Routine Planner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span>Weekly Target Micro-Routine Schedule:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60">
            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
              Phase 1: Pre-Performance Trigger
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>4-Min Controlled Breathing:</strong> Execute 4-4-4-4 Box Breathing immediately during arrival or warm-up.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Trigger Words:</strong> Set 2 crisp tactical cues (e.g. "Attack", "Feet Front").</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60">
            <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
              Phase 2: In-Action Regulation
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>The 5-Second Reset:</strong> Tap heel, physiological sigh, lock gaze onto neutral target.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Affect Reframe:</strong> Treat high heart rate as fuel for speed, not fear.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/60">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
              Phase 3: Post-Session Debrief
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>24-Hour Debrief:</strong> Record 2 successes, 1 technical fix, then close the book.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Digital Sunset:</strong> Screens off 45 mins before sleep to recharge deep recovery.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 12-Week Milestone Review Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>Target Milestone Checkpoint Timeline:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Week 1-2</span>
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Skill Conditioning</h5>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Ingrain box breathing and cue words in low-stakes training environments.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Week 4</span>
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">First Target Retest</h5>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Retake the 10-factor assessment. Target minimum +15% improvement in priority zones.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Week 8</span>
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Pressure Inoculation</h5>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Apply mental resets in hostile scrimmages, competition trials, and under fatigue.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Week 12</span>
            <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Automatic Mastery</h5>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Psychological skills fire unconsciously without deliberate effort under crunch pressure.
            </p>
          </div>
        </div>
      </div>

      {/* Target Commitment & Sign-Off Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 dark:border-indigo-900/60 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-3 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
          <PenTool className="w-4 h-4" />
          <span>Target Commitment Contract</span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
          "I, <strong className="text-indigo-900 dark:text-indigo-200">{profile.name}</strong>, commit to executing my personalized Psychological Skills Training (PST) routines. I recognize that mental toughness and composure are trained skills, not accidental gifts. I will practice my primary target skills with the same disciplined dedication that I bring to physical conditioning."
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-indigo-200/60 dark:border-indigo-800/60">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Athlete / Individual Signature
            </label>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              {signatureName} (Signed Electronically)
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Effective Date
            </label>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-mono text-xs text-slate-800 dark:text-slate-200">
              {currentDate}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 print:hidden">
        <button
          type="button"
          onClick={onBackToPst}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to PST Plan</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRestartAssessment}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
