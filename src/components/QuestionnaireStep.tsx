import React, { useState } from 'react';
import { UserProfile, FactorId } from '../types/psychology';
import { PSYCHOLOGICAL_FACTORS, FACTOR_QUESTIONS } from '../data/psychologyFactors';
import { getWordingAgeCategory } from '../utils/calculator';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Sparkles, 
  Sliders, 
  Zap, 
  Activity,
  HeartHandshake,
  Flame,
  ShieldCheck,
  Target,
  ShieldAlert,
  FlameKindling,
  Brain,
  SunMedium
} from 'lucide-react';

interface QuestionnaireStepProps {
  profile: UserProfile;
  answers: Record<string, number>;
  onAnswerChange: (questionKey: string, score: number) => void;
  onBulkSetAnswers: (newAnswers: Record<string, number>) => void;
  onCompleteQuestionnaire: () => void;
  onBackToOverview: () => void;
}

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  profile,
  answers,
  onAnswerChange,
  onBulkSetAnswers,
  onCompleteQuestionnaire,
  onBackToOverview,
}) => {
  const [currentFactorIndex, setCurrentFactorIndex] = useState<number>(0);

  const wordingCategory = getWordingAgeCategory(profile.ageGroup);
  const currentFactor = PSYCHOLOGICAL_FACTORS[currentFactorIndex];
  const questionSet = FACTOR_QUESTIONS[currentFactor.id];

  const totalFactors = PSYCHOLOGICAL_FACTORS.length; // 10
  const isAthlete = profile.isAthlete;
  const questionsPerFactor = isAthlete ? 4 : 3;

  // Retrieve general questions based on age group
  const generalQuestions = questionSet?.generalQuestions[wordingCategory] || [
    'Question 1',
    'Question 2',
    'Question 3'
  ];

  // The list of questions for current factor page
  const pageQuestions: { key: string; text: string; isAthleteSpecific: boolean }[] = [
    { key: `q_${currentFactor.id}_1`, text: generalQuestions[0], isAthleteSpecific: false },
    { key: `q_${currentFactor.id}_2`, text: generalQuestions[1], isAthleteSpecific: false },
    { key: `q_${currentFactor.id}_3`, text: generalQuestions[2], isAthleteSpecific: false },
  ];

  if (isAthlete && questionSet?.athleteQuestion) {
    pageQuestions.push({
      key: `q_${currentFactor.id}_4`,
      text: questionSet.athleteQuestion,
      isAthleteSpecific: true,
    });
  }

  // Check if all questions on current page are answered
  const allCurrentAnswered = pageQuestions.every((q) => answers[q.key] !== undefined);

  // Calculate overall answered percentage
  let totalRequiredQuestions = 0;
  let totalAnsweredCount = 0;

  PSYCHOLOGICAL_FACTORS.forEach((factor) => {
    const count = isAthlete ? 4 : 3;
    totalRequiredQuestions += count;
    for (let i = 1; i <= count; i++) {
      if (answers[`q_${factor.id}_${i}`] !== undefined) {
        totalAnsweredCount++;
      }
    }
  });

  const overallProgressPercentage = Math.round((totalAnsweredCount / totalRequiredQuestions) * 100);

  const likertScale = [
    { value: 1, label: 'Never / Strongly Disagree', short: '1 - Strongly Disagree', color: 'hover:border-rose-300' },
    { value: 2, label: 'Rarely / Disagree', short: '2 - Disagree', color: 'hover:border-amber-300' },
    { value: 3, label: 'Sometimes / Neutral', short: '3 - Neutral', color: 'hover:border-slate-300' },
    { value: 4, label: 'Often / Agree', short: '4 - Agree', color: 'hover:border-teal-300' },
    { value: 5, label: 'Almost Always / Strongly Agree', short: '5 - Strongly Agree', color: 'hover:border-emerald-300' },
  ];

  const handleNext = () => {
    if (currentFactorIndex < totalFactors - 1) {
      setCurrentFactorIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCompleteQuestionnaire();
    }
  };

  const handlePrevious = () => {
    if (currentFactorIndex > 0) {
      setCurrentFactorIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToOverview();
    }
  };

  // Quick fill demo responses tailored to create realistic, interesting PST opportunities
  const handleQuickFill = () => {
    const sampleAnswers: Record<string, number> = {};
    PSYCHOLOGICAL_FACTORS.forEach((factor, idx) => {
      const count = isAthlete ? 4 : 3;
      for (let i = 1; i <= count; i++) {
        const key = `q_${factor.id}_${i}`;
        // Give high anxiety, high stress, or moderate confidence to test PST prioritized skills
        if (factor.id === 'anxiety') {
          sampleAnswers[key] = i === 1 ? 4 : i === 2 ? 5 : 4; // High anxiety -> needs attention
        } else if (factor.id === 'stress') {
          sampleAnswers[key] = i === 1 ? 4 : i === 2 ? 4 : 3; // Moderate/high stress -> needs attention
        } else if (factor.id === 'self_confidence') {
          sampleAnswers[key] = i === 1 ? 2 : i === 2 ? 3 : 2; // Low confidence -> needs attention
        } else if (factor.id === 'concentration_focus') {
          sampleAnswers[key] = i === 1 ? 3 : i === 2 ? 2 : 3; // Moderate concentration need
        } else if (factor.id === 'aggression_anger') {
          sampleAnswers[key] = i === 1 ? 2 : i === 2 ? 1 : 2; // Well managed
        } else {
          sampleAnswers[key] = 4; // Balanced / good
        }
      }
    });
    onBulkSetAnswers(sampleAnswers);
  };

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

  const FactorIcon = getIcon(currentFactor.iconName);

  const isAgeSpecificFactor = ['anxiety', 'stress', 'emotion_regulation'].includes(currentFactor.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Progress & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Psychological Factor Assessment
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Factor {currentFactorIndex + 1} of {totalFactors}: {currentFactor.title}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleQuickFill}
            title="Auto-fill sample answers for quick testing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            <span>Quick Fill Sample</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Factor Breadcrumbs */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Overall Progress: {totalAnsweredCount} / {totalRequiredQuestions} answered</span>
          <span>{overallProgressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallProgressPercentage}%` }}
          />
        </div>

        {/* Mini 10-step progress dots */}
        <div className="grid grid-cols-10 gap-1.5 pt-1">
          {PSYCHOLOGICAL_FACTORS.map((f, i) => {
            const isCompleted = [1, 2, 3, ...(isAthlete ? [4] : [])].every(
              n => answers[`q_${f.id}_${n}`] !== undefined
            );
            const isCurrent = i === currentFactorIndex;

            return (
              <button
                key={f.id}
                onClick={() => setCurrentFactorIndex(i)}
                title={`${i + 1}. ${f.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 ring-2 ring-indigo-400'
                    : isCompleted
                    ? 'bg-emerald-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Factor Context Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${currentFactor.colorScheme.bg} ${currentFactor.colorScheme.text}`}>
            <FactorIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentFactor.title}
              </h2>
              {isAgeSpecificFactor && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Age-adapted ({wordingCategory})
                </span>
              )}
              {currentFactor.isDistressMeasure ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Lower is healthier
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Higher is healthier
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentFactor.shortDescription}
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          Page {currentFactorIndex + 1} of 10 • {questionsPerFactor} Questions
        </div>
      </div>

      {/* The Questions for this Factor */}
      <div className="space-y-4 mb-8">
        {pageQuestions.map((q, qIndex) => {
          const currentSelected = answers[q.key];

          return (
            <div
              key={q.key}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                currentSelected !== undefined
                  ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Question Header & Prompt */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    currentSelected !== undefined
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {qIndex + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {q.text}
                    </p>
                    {q.isAthleteSpecific && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        <Award className="w-3 h-3" /> Sport-Specific Athlete Question ({profile.sport || 'Athlete'})
                      </span>
                    )}
                  </div>
                </div>

                {currentSelected !== undefined && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>

              {/* 5-Point Likert Rating Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
                {likertScale.map((rating) => {
                  const isChecked = currentSelected === rating.value;

                  return (
                    <button
                      key={rating.value}
                      type="button"
                      onClick={() => onAnswerChange(q.key, rating.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                        isChecked
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs font-bold scale-[1.02]'
                          : `bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium ${rating.color}`
                      }`}
                    >
                      <span className="text-xs font-bold">{rating.value}</span>
                      <span className="text-[11px] leading-tight text-center">
                        {rating.label.split(' / ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handlePrevious}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentFactorIndex === 0 ? 'Back to Overview' : 'Previous Factor'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            allCurrentAnswered
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
              : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white'
          }`}
        >
          <span>
            {currentFactorIndex < totalFactors - 1
              ? `Next: ${PSYCHOLOGICAL_FACTORS[currentFactorIndex + 1].title}`
              : 'Generate PST Plan'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
