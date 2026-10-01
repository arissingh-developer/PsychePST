import { AgeGroup, FactorId, FactorScoreResult, FactorDefinition } from '../types/psychology';

export function calculateAgeFromDob(dobString: string): { age: number; ageGroup: AgeGroup } | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 0) return null;

  let ageGroup: AgeGroup;
  if (age <= 14) {
    ageGroup = '10-14';
  } else if (age <= 19) {
    ageGroup = '15-19';
  } else if (age <= 24) {
    ageGroup = '20-24';
  } else if (age <= 29) {
    ageGroup = '25-29';
  } else if (age <= 35) {
    ageGroup = '30-35';
  } else {
    ageGroup = '35 Above';
  }

  return { age, ageGroup };
}

export function getWordingAgeCategory(ageGroup: AgeGroup | null): '10-14' | '15-19' | '20+' {
  if (!ageGroup || ageGroup === '10-14') return '10-14';
  if (ageGroup === '15-19') return '15-19';
  return '20+';
}

export function evaluateFactors(
  answers: Record<string, number>,
  factors: FactorDefinition[],
  userAgeGroup: AgeGroup,
  isAthlete: boolean
): FactorScoreResult[] {
  const results: FactorScoreResult[] = [];

  for (const factor of factors) {
    // Collect all answers for this factor
    const questionPrefix = `q_${factor.id}_`;
    const relevantEntries = Object.entries(answers).filter(([k]) => k.startsWith(questionPrefix));

    // Number of expected questions: 3 for non-athletes, 4 for athletes
    const expectedCount = isAthlete ? 4 : 3;
    const maxScore = expectedCount * 5; // 5 is max score per question (1-5 scale)
    const minScore = expectedCount * 1;

    let rawScore = 0;
    let answeredCount = 0;

    for (let i = 1; i <= expectedCount; i++) {
      const qKey = `${questionPrefix}${i}`;
      if (answers[qKey] !== undefined) {
        rawScore += answers[qKey];
        answeredCount++;
      }
    }

    // Default if partly unanswered
    if (answeredCount === 0) {
      rawScore = expectedCount * 3; // neutral default
    } else if (answeredCount < expectedCount) {
      rawScore = Math.round((rawScore / answeredCount) * expectedCount);
    }

    const scorePercentage = Math.round(((rawScore - minScore) / (maxScore - minScore)) * 100);

    let healthIndex: number;
    let needsAttention: boolean;
    let attentionPriority: number; // higher = higher priority need
    let severityLabel: 'High Need' | 'Moderate Need' | 'Balanced' | 'Strong Asset';

    if (factor.isDistressMeasure) {
      // For Distress Measures (Anxiety, Stress, Aggression):
      // High raw score is negative, low raw score is healthy!
      healthIndex = 100 - scorePercentage;
      
      if (healthIndex < 40) {
        // Raw distress > 60%
        needsAttention = true;
        attentionPriority = 100 - healthIndex; // e.g. 75
        severityLabel = 'High Need';
      } else if (healthIndex < 65) {
        // Raw distress 35-60%
        needsAttention = true;
        attentionPriority = 100 - healthIndex; // e.g. 45
        severityLabel = 'Moderate Need';
      } else if (healthIndex < 85) {
        needsAttention = false;
        attentionPriority = 100 - healthIndex;
        severityLabel = 'Balanced';
      } else {
        needsAttention = false;
        attentionPriority = 0;
        severityLabel = 'Strong Asset';
      }
    } else {
      // For Positive Capability Measures (Emotion Reg, Motivation, Confidence, Focus, Resilience, Intelligence, Wellbeing):
      // High raw score is healthy, low raw score is negative!
      healthIndex = scorePercentage;

      if (healthIndex < 40) {
        needsAttention = true;
        attentionPriority = 100 - healthIndex;
        severityLabel = 'High Need';
      } else if (healthIndex < 65) {
        needsAttention = true;
        attentionPriority = 100 - healthIndex;
        severityLabel = 'Moderate Need';
      } else if (healthIndex < 85) {
        needsAttention = false;
        attentionPriority = 100 - healthIndex;
        severityLabel = 'Balanced';
      } else {
        needsAttention = false;
        attentionPriority = 0;
        severityLabel = 'Strong Asset';
      }
    }

    const ageTip = factor.ageTips[userAgeGroup] || factor.ageTips['20-24'];

    results.push({
      factorId: factor.id,
      title: factor.title,
      rawScore,
      maxScore,
      scorePercentage,
      healthIndex,
      needsAttention,
      attentionPriority,
      severityLabel,
      matchedSkills: factor.matchedSkills,
      ageTip,
    });
  }

  // Sort: factors needing attention first, highest priority (worst deficit) first
  return results.sort((a, b) => b.attentionPriority - a.attentionPriority);
}
