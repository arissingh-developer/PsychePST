/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, AppStep, FactorScoreResult } from './types/psychology';
import { PSYCHOLOGICAL_FACTORS } from './data/psychologyFactors';
import { evaluateFactors } from './utils/calculator';
import { Header } from './components/Header';
import { ProfileStep } from './components/ProfileStep';
import { FactorsOverviewStep } from './components/FactorsOverviewStep';
import { QuestionnaireStep } from './components/QuestionnaireStep';
import { PstPlanStep } from './components/PstPlanStep';
import { TargetStep } from './components/TargetStep';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('profile');
  
  // Stored state with local storage fallback
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('psychepst_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('psychepst_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Factor assessment score results
  const [factorResults, setFactorResults] = useState<FactorScoreResult[]>([]);

  // Keep state synced in localStorage
  useEffect(() => {
    try {
      if (profile) {
        localStorage.setItem('psychepst_profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('psychepst_profile');
      }
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('psychepst_answers', JSON.stringify(answers));
    } catch (e) {
      console.error(e);
    }
  }, [answers]);

  // Recalculate factor results whenever answers or profile change
  useEffect(() => {
    if (profile && profile.ageGroup) {
      const results = evaluateFactors(
        answers,
        PSYCHOLOGICAL_FACTORS,
        profile.ageGroup,
        profile.isAthlete
      );
      setFactorResults(results);
    }
  }, [answers, profile]);

  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setCurrentStep('factors_overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerChange = (questionKey: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: score,
    }));
  };

  const handleBulkSetAnswers = (newAnswers: Record<string, number>) => {
    setAnswers(prev => ({
      ...prev,
      ...newAnswers,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Start a new psychological assessment? This will reset current profile answers.')) {
      setProfile(null);
      setAnswers({});
      setFactorResults([]);
      setCurrentStep('profile');
      localStorage.removeItem('psychepst_profile');
      localStorage.removeItem('psychepst_answers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canNavigateToStep = (step: AppStep): boolean => {
    if (step === 'profile') return true;
    if (!profile) return false;
    if (step === 'factors_overview') return true;
    if (step === 'questionnaire') return true;
    if (step === 'pst_plan') {
      // Check if user has answered questions
      return Object.keys(answers).length > 0;
    }
    if (step === 'target') {
      return Object.keys(answers).length > 0;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Header with Navigation Pipeline */}
      <Header
        currentStep={currentStep}
        onSelectStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
        onReset={handleReset}
        canNavigateToStep={canNavigateToStep}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentStep === 'profile' && (
          <ProfileStep
            initialProfile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {currentStep === 'factors_overview' && profile && (
          <FactorsOverviewStep
            profile={profile}
            onProceedToQuestionnaire={() => {
              setCurrentStep('questionnaire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToProfile={() => {
              setCurrentStep('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'questionnaire' && profile && (
          <QuestionnaireStep
            profile={profile}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onBulkSetAnswers={handleBulkSetAnswers}
            onCompleteQuestionnaire={() => {
              setCurrentStep('pst_plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToOverview={() => {
              setCurrentStep('factors_overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'pst_plan' && profile && (
          <PstPlanStep
            profile={profile}
            factorResults={factorResults}
            onProceedToTarget={() => {
              setCurrentStep('target');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToQuestionnaire={() => {
              setCurrentStep('questionnaire');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'target' && profile && (
          <TargetStep
            profile={profile}
            factorResults={factorResults}
            onBackToPst={() => {
              setCurrentStep('pst_plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestartAssessment={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden">
        <p>PsychePST • Sports Psychology & Performance Mental Skills Training System</p>
      </footer>
    </div>
  );
}
