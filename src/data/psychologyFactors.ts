import { FactorDefinition, AgeGroup } from '../types/psychology';

export const PSYCHOLOGICAL_FACTORS: FactorDefinition[] = [
  {
    id: 'anxiety',
    title: 'Anxiety',
    shortDescription: 'Management of nervousness, somatic tension, and anticipatory worry.',
    longDescription: 'Anxiety reflects cognitive worry, fear of failure, and physical somatic arousal (rapid heartbeat, muscle tightness, shallow breathing) triggered before or during evaluative situations.',
    iconName: 'Activity',
    colorScheme: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      bar: 'bg-amber-500',
    },
    isDistressMeasure: true,
    matchedSkills: [
      {
        name: 'Controlled Box Breathing (4-4-4-4)',
        category: 'Arousal Regulation',
        tagline: 'Rapid autonomic parasympathetic reset in 60 seconds.',
        description: 'A scientifically validated paced respiration drill that activates the vagus nerve, immediately decelerating heart rate and dropping salivary cortisol during high anxiety moments.',
        howToPractice: [
          'Inhale deeply through your nose for a count of 4, expanding your diaphragm.',
          'Hold your breath gently for a count of 4 with a relaxed throat.',
          'Exhale smoothly through your mouth for a count of 4.',
          'Hold empty for a count of 4 before beginning the next cycle.',
          'Complete 4 to 6 full cycles right before demanding tasks or when nervousness strikes.'
        ],
        duration: '2 to 4 minutes daily or pre-event',
        evidenceBase: 'Standard physiological down-regulation protocol used by Olympic athletes and Navy SEALs.',
        exerciseType: 'breathing',
      },
      {
        name: 'Progressive Muscle Relaxation (PMR)',
        category: 'Somatic Awareness',
        tagline: 'Systematic tension-release to dissolve physical stiffness.',
        description: 'Tensing and releasing specific muscle groups sequentially to teach the brain to differentiate between somatic tension and genuine physical looseness.',
        howToPractice: [
          'Find a quiet posture. Start at your toes and feet, tensing firmly for 5 seconds.',
          'Release abruptly and notice the wave of warmth and relaxation for 10 seconds.',
          'Progress sequentially through calves, thighs, glutes, abdomen, fists, shoulders, and jaw.',
          'Pair the final full-body release with a long sigh and a cue word like "Release" or "Easy".'
        ],
        duration: '8 to 10 minutes post-training or before sleep',
        evidenceBase: 'Jacobson relaxation therapy proven to reduce neuromuscular tremor and performance jitters.',
        exerciseType: 'standard',
      },
      {
        name: 'Cognitive Reframing (Threat to Challenge)',
        category: 'Cognitive Restructuring',
        tagline: 'Rewire "I am terrified" into "My body is getting ready to perform".',
        description: 'Physiologically, excitement and anxiety share near-identical symptoms (adrenaline, elevated pulse). Cognitive appraisal determines whether it impairs or fuels you.',
        howToPractice: [
          'Catch the automatic negative thought (e.g., "What if I choke and everyone sees?").',
          'Acknowledge the physical symptom: "My heart is beating fast because my body is mobilizing oxygen."',
          'Reframe consciously: "This is not panic; this is high-octane readiness. I care about this and I am prepared."',
          'Anchor your focus onto the immediate next mechanical action instead of future consequences.'
        ],
        duration: '1 to 2 minutes whenever catastrophic thoughts emerge',
        evidenceBase: 'Lazarus & Folkman transactional stress model and Brooks Harvard excitement appraisal studies.',
        exerciseType: 'reframing',
      }
    ],
    ageTips: {
      '10-14': 'Remind yourself that "butterflies" in your stomach are completely normal—even your sporting heroes get them. Practice your 4-4-4-4 breathing while walking to the venue or pitch.',
      '15-19': 'At this age, peer evaluation and fear of making mistakes feel massive. Remember: one bad play or grade does not define your worth. Focus only on the action you control right now.',
      '20-24': 'Transitioning to higher-stakes competition and adult responsibility amplifies performance pressure. Treat pre-event arousal as biological turbocharge rather than panic.',
      '25-29': 'Notice early somatic indicators (jaw clenching, shallow breathing) before they escalate. Build a predictable 5-minute pre-performance breathing ritual into your daily warm-up.',
      '30-35': 'Balancing career, family, and sport can strain nervous system bandwidth. Protect quiet transition times between life domains to prevent stress spillover into anxiety.',
      '35 Above': 'Leverage your experience and maturity. You have faced tough tests before; view physical nervousness as proof of your deep commitment and enthusiasm.',
    }
  },
  {
    id: 'stress',
    title: 'Stress',
    shortDescription: 'Balancing perceived demands against internal coping resources.',
    longDescription: 'Stress arises when external pressures (training loads, deadlines, expectations, conflicts) exceed perceived coping reserves, creating chronic physical and mental fatigue.',
    iconName: 'Zap',
    colorScheme: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/20',
      border: 'border-rose-500/30',
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      bar: 'bg-rose-500',
    },
    isDistressMeasure: true,
    matchedSkills: [
      {
        name: 'Time & Energy Micro-Budgeting',
        category: 'Stress Management',
        tagline: 'Audit energy leaks and create strict restorative boundaries.',
        description: 'A proactive scheduling methodology that treats psychological recovery with the exact same non-negotiable status as physical training or work blocks.',
        howToPractice: [
          'Identify your top 3 daily non-negotiable performance priorities.',
          'Schedule guaranteed 15-minute "zero-input" buffer zones between intense blocks.',
          'Delegate or eliminate low-value tasks that drain cognitive energy without contributing to growth.',
          'Define a definitive "tools down" cut-off time each evening.'
        ],
        duration: '10 minutes weekly planning + daily adherence',
        evidenceBase: 'Grounded in athletic periodization and cognitive load recovery research.',
        exerciseType: 'goal_setting',
      },
      {
        name: 'Autogenic Relaxation & Somatosensory De-escalation',
        category: 'Physiological De-escalation',
        tagline: 'Self-directed mental suggestions of warmth and heaviness.',
        description: 'Using verbal autosuggestion to stimulate blood vessel dilation and induce profound physical calm during high-stress weeks.',
        howToPractice: [
          'Lie or sit comfortably with closed eyes.',
          'Silently repeat: "My right arm is heavy and warm... My whole body is heavy, calm, and resting."',
          'Scan slowly from limbs to chest to forehead ("My heartbeat is calm and regular, my forehead is comfortably cool").',
          'Conclude with 3 long, grounding diaphragmatic breaths.'
        ],
        duration: '5 to 7 minutes during midday slump or recovery',
        evidenceBase: 'Schultz autogenic training protocol with proven cardiovascular stress-reduction efficacy.',
        exerciseType: 'breathing',
      },
      {
        name: 'Constructive Compartmentalization ("The Transition Doorway")',
        category: 'Cognitive Boundaries',
        tagline: 'Leave outside stresses outside the arena and vice versa.',
        description: 'A psychological threshold ritual ensuring that academic, workplace, or relationship friction does not poison your training or competition time.',
        howToPractice: [
          'Identify a physical marker (locker room door, arena threshold, tying your laces).',
          'Mentally place all outside worries into an imaginary locked strongbox at that doorway.',
          'Say to yourself: "These can wait. For the next 90 minutes, my sole job is present immersion."',
          'Upon leaving, consciously decide which items are actually worth retrieving.'
        ],
        duration: '30 seconds at the threshold of every practice or match',
        evidenceBase: 'Elite sport psychology transition routines documented by Terry and Orlick.',
        exerciseType: 'standard',
      }
    ],
    ageTips: {
      '10-14': 'Don\'t bottle up worries about school tests or team selection. Talk to a coach, parent, or trusted friend early so problems don\'t feel like an avalanche.',
      '15-19': 'Beware the trap of burning the candle at both ends (late-night studying, social media, early training). Sleep is your primary anti-stress shield.',
      '20-24': 'Recognize that high volume without adequate recovery results in diminishing returns and mood dips. Structure one dedicated rest day each week.',
      '25-29': 'When work and training collide, simplify your routines instead of feeling guilty. A focused 30-minute session beats a stressed, distracted 90-minute one.',
      '30-35': 'Protect family and personal recovery time fiercely. Stress that is unaddressed at work will manifest as premature fatigue in training.',
      '35 Above': 'Respect your body\'s biological recovery curve. Prioritize joint health, quality sleep, and hydration as foundational stress mitigators.',
    }
  },
  {
    id: 'emotion_regulation',
    title: 'Emotion regulation',
    shortDescription: 'Mastery over high-arousal emotional swings and composure.',
    longDescription: 'The capacity to recognize, modulate, and direct emotional surges (frustration, despair, over-excitement) without allowing them to hijack your decisions or technique.',
    iconName: 'HeartHandshake',
    colorScheme: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      bar: 'bg-emerald-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'The 3-Step Emotional Reset Routine (Stop - Breathe - Refocus)',
        category: 'In-Action Composure',
        tagline: 'A 5-second rapid circuit breaker following bad calls or mistakes.',
        description: 'Prevents emotional contagion and cascading errors by intercepting amygdala hijack before your body reacts impulsively.',
        howToPractice: [
          'STEP 1 (STOP): Use a physical cue (clap hands, adjust wristband, tap heel) and say "Park it!".',
          'STEP 2 (BREATHE): Take one deep physiological sigh (double inhale through nose, long oral exhale).',
          'STEP 3 (REFOCUS): Look at a specific focal point (center line, target, ball) and repeat your tactical cue.'
        ],
        duration: '5 seconds immediately following any frustration trigger',
        evidenceBase: 'Core cognitive-behavioral impulse regulation technique used across premier leagues.',
        exerciseType: 'reframing',
      },
      {
        name: 'Affect Labeling ("Name It to Tame It")',
        category: 'Metacognitive Regulation',
        tagline: 'De-escalate emotional intensity through objective verbal naming.',
        description: 'Brain imaging demonstrates that precisely naming an emotional state engages the prefrontal cortex and directly dampens amygdala reactivity.',
        howToPractice: [
          'When feeling overwhelmed or frustrated, pause and observe: "I am noticing intense frustration right now."',
          'Avoid identifying as the emotion ("I am a failure"); treat it as weather passing over a mountain.',
          'Ask: "What constructive message is this emotion trying to tell me about what I care about?"',
          'Choose the action that serves your values rather than the short-term emotional impulse.'
        ],
        duration: '30 seconds during moments of emotional escalation',
        evidenceBase: 'Dr. Matthew Lieberman UCLA fMRI neuroimaging studies on affect labeling.',
        exerciseType: 'reframing',
      },
      {
        name: 'Somatic Anchoring & Neutral Focal Point',
        category: 'Biofeedback & Anchor',
        tagline: 'Tie your emotional equilibrium to a physical landmark.',
        description: 'Conditioning a neutral physical anchor that instantly grounds your physiology and restores neutral posture during intense chaos.',
        howToPractice: [
          'Choose a physical anchor in your environment (the crossbar, your racket strings, your thumbnail).',
          'During training when you feel centered and calm, stare at that anchor and take 3 deep breaths.',
          'In heated moments, lock your eyes onto your anchor for 3 unbroken seconds.',
          'Let your shoulders drop 2 inches, release your jaw, and uncurl your fists.'
        ],
        duration: '3 to 5 seconds during downtime or breaks',
        evidenceBase: 'Pavlovian conditioning and somatic quieting methodologies in performance psychology.',
        exerciseType: 'standard',
      }
    ],
    ageTips: {
      '10-14': 'When you feel like yelling or throwing equipment, count backward from 5 to 1 in your head while taking a deep belly breath. Showing calm makes you look and play like a champion.',
      '15-19': 'It is easy to get worked up over unfair calls or teasing opponents. Remember: whoever controls your emotions controls your performance.',
      '20-24': 'Recognize that emotional suppression is exhausting. Acknowledge frustration swiftly, clear it through a physical reset, and channel that energy into aggressive focus.',
      '25-29': 'Model emotional composure for younger teammates or peers. Your reaction to an error sets the psychological tone for the entire group.',
      '30-35': 'Use emotional intelligence as your tactical edge. While younger competitors often react with hot-headed haste, use calm calculation to outmaneuver them.',
      '35 Above': 'Maintain perspective: mistakes happen across decades of experience. Cultivate calm enjoyment alongside competitive fire.',
    }
  },
  {
    id: 'motivation',
    title: 'Motivation',
    shortDescription: 'Internal drive, purpose, commitment, and sustained effort.',
    longDescription: 'Motivation is the engine of sustained development—encompassing intrinsic enjoyment, purpose-driven grit, and the capacity to execute when initial excitement fades.',
    iconName: 'Flame',
    colorScheme: {
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      border: 'border-orange-500/30',
      text: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      bar: 'bg-orange-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'SMART Process Goal Architecture',
        category: 'Goal Directing',
        tagline: 'Shift attention from uncontrollable outcomes to high-leverage daily inputs.',
        description: 'Outcome goals ("Win the championship") generate anxiety. Process goals ("Hit 50 first serves with high toss every morning") generate reliable daily motivation.',
        howToPractice: [
          'Write down 1 primary outcome goal for the next 3 to 6 months.',
          'Break it down into 2 performance standards (measurable numbers).',
          'Define 3 daily controllable process actions (e.g., 20 mins mobility, 10 mins visualization).',
          'Score yourself solely on execution of the daily process, not on outside opinions.'
        ],
        duration: '15 minutes bi-weekly goal calibration',
        evidenceBase: 'Locke & Latham Goal Setting Theory applied to elite sport performance.',
        exerciseType: 'goal_setting',
      },
      {
        name: 'Intrinsic "Why" Priming',
        category: 'Purpose Alignment',
        tagline: 'Connect daily grinds to your deepest core values and passion.',
        description: 'When training feels monotonous or painful, reconnecting with the foundational emotional reason you began prevents burnout and fuels voluntary effort.',
        howToPractice: [
          'Write down three sentences completing: "I choose to train and compete because..."',
          'Identify the childhood joy, the sense of mastery, or the camaraderie that inspires you.',
          'Review these three sentences before leaving your house or starting a challenging workout.',
          'Notice how shifting from "I have to do this" to "I choose to do this" reclaims personal agency.'
        ],
        duration: '2 minutes before key sessions',
        evidenceBase: 'Deci & Ryan Self-Determination Theory (autonomy, competence, relatedness).',
        exerciseType: 'reframing',
      },
      {
        name: 'Habit Stacking & The "2-Minute Rule"',
        category: 'Behavioral Momentum',
        tagline: 'Overcome activation friction by anchoring onto existing habits.',
        description: 'Willpower is a depleting resource. Tying mental training or recovery drills directly to existing automatic habits guarantees consistency.',
        howToPractice: [
          'Use the formula: "After I [CURRENT HABIT], I will immediately [NEW 2-MINUTE HABIT]."',
          'Example: "After I take off my training shoes, I will do 2 minutes of box breathing on the mat."',
          'Keep the barrier to entry absurdly low so resistance disappears.',
          'Celebrate the completion with a quick mental fist-pump to release dopamine.'
        ],
        duration: '2 minutes integrated into routine',
        evidenceBase: 'Behavioral conditioning and BJ Fogg Stanford behavior design model.',
        exerciseType: 'standard',
      }
    ],
    ageTips: {
      '10-14': 'Keep sport and activities fun! Focus on learning exciting new tricks and celebrating small improvements every single practice rather than just winning or losing.',
      '15-19': 'When motivation dips during tough training blocks, lean on your teammates and training partners. Shared sweat and mutual accountability make hard work enjoyable.',
      '20-24': 'Recognize that motivation comes after starting, not before. Do not wait to "feel like it"—start the warm-up, and the energy will catch up.',
      '25-29': 'Align your training with long-term lifestyle sustainability. Avoid feast-or-famine cycles by maintaining consistent, rhythmic micro-habits.',
      '30-35': 'Reframe your motivation around mastery, longevity, and intelligent efficiency. Quality of training now supersedes mindless volume.',
      '35 Above': 'Celebrate your ongoing vitality and passion. Training is a privilege and a powerful investment in lifelong physical and mental sharpness.',
    }
  },
  {
    id: 'self_confidence',
    title: 'Self-confidence',
    shortDescription: 'Unshakeable belief in your capabilities, preparation, and execution.',
    longDescription: 'Self-efficacy and robust confidence derived from preparation, mastery experiences, and empowering self-dialogue rather than fragile, circumstantial bravado.',
    iconName: 'ShieldCheck',
    colorScheme: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      bar: 'bg-blue-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'Multi-Sensory Success Imagery (PETTLEP Model)',
        category: 'Mental Rehearsal',
        tagline: 'Vividly encode flawless execution and clutch moments in the brain.',
        description: 'The brain fires the exact same neuromuscular pathways during vivid mental simulation as it does in physical execution, solidifying neural confidence.',
        howToPractice: [
          'Find a quiet spot or assume your actual athletic stance (Physical).',
          'Vividly picture the arena, the sounds, the smell of the court/pitch (Environment).',
          'Rehearse a specific high-pressure scenario in real-time speed (Timing).',
          'Feel the muscle tension, the confident emotional pulse, and the clean follow-through.',
          'End by visualizing yourself stepping up and executing with total conviction.'
        ],
        duration: '5 to 7 minutes daily, especially pre-match',
        evidenceBase: 'Holmes & Collins PETTLEP neuro-imagery paradigm recognized worldwide.',
        exerciseType: 'visualization',
      },
      {
        name: 'The Evidence-Based Victory Log',
        category: 'Cognitive Proof Banking',
        tagline: 'Build an undeniable repository of past mastery and resilience.',
        description: 'Doubt flourishes when memories of failure eclipse memories of mastery. Actively cataloging hard-earned successes systematically rebuilds unshakable self-efficacy.',
        howToPractice: [
          'Keep a pocket notebook or digital note titled "Evidence of Capability".',
          'Record 2 specific things you executed well or pushed through after every training session.',
          'Include instances where you overcame adversity, injuries, or tough conditions.',
          'Review this list the evening before major competitions to flood your mind with proof.'
        ],
        duration: '2 minutes post-session + 3 minutes pre-competition review',
        evidenceBase: 'Albert Bandura self-efficacy theory (performance accomplishments as primary driver).',
        exerciseType: 'standard',
      },
      {
        name: 'Constructive Self-Talk Audit & Power Cues',
        category: 'Inner Dialogue',
        tagline: 'Transform toxic internal criticism into commanding performance cues.',
        description: 'Replacing hesitant, passive, or catastrophizing thoughts with decisive, instructional, and motivational micro-phrases.',
        howToPractice: [
          'Identify your typical negative self-talk phrase (e.g., "Don\'t mess this up").',
          'Replace it with an active, instructional action cue (e.g., "Attack the ball", "Fast hands", "Solid base").',
          'Practice saying the power cue aloud during drills until it triggers automatic physical reaction.',
          'Speak to yourself the exact same way a world-class, supportive coach would speak to you.'
        ],
        duration: 'Ongoing throughout training and competitive sets',
        evidenceBase: 'Hatzigeorgiadis meta-analyses on instructional and motivational self-talk.',
        exerciseType: 'reframing',
      }
    ],
    ageTips: {
      '10-14': 'True confidence doesn\'t mean you never make a mistake—it means you know you can try again! Keep a list of 3 skills you are proud of improving this month.',
      '15-19': 'Do not compare your behind-the-scenes struggles to someone else\'s highlight reel on social media. Base your confidence solely on your own preparation and work ethic.',
      '20-24': 'Earn your confidence through the quality of your unglamorous repetitions. When you step up to compete, remind yourself: "I have put in the hours; my body knows what to do."',
      '25-29': 'Separate your confidence from unpredictable external outcomes. Anchor your self-belief in your adaptability, decision-making, and professional discipline.',
      '30-35': 'Trust your accumulated pattern recognition. In crucial moments, trust your instincts without over-analyzing mechanics.',
      '35 Above': 'Your decades of experience and mental resilience are unmatched superpowers. Walk tall, hold your space, and project calm authority.',
    }
  },
  {
    id: 'concentration_focus',
    title: 'Concentration and focus',
    shortDescription: 'Selective attention, cue discrimination, and distraction immunity.',
    longDescription: 'The ability to lock mental spotlight onto task-relevant cues (ball trajectory, opponent positioning, tactical execution) while screening out irrelevant noise.',
    iconName: 'Target',
    colorScheme: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      border: 'border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      bar: 'bg-indigo-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'Nideffer Attentional Grid Shifting',
        category: 'Attentional Agility',
        tagline: 'Fluently zoom from broad tactical scanning to pinpoint execution.',
        description: 'Systematically training the 4 quadrants of attention: Broad-External (tactical scan), Narrow-External (focus on ball/target), Broad-Internal (game plan review), Narrow-Internal (heart rate/kinesthetic feel).',
        howToPractice: [
          'Sit quietly. Spend 30 seconds scanning the entire room broadly (Broad-External).',
          'Narrow down to a single millimeter spot on the wall for 30 seconds (Narrow-External).',
          'Close your eyes and review your overarching strategy (Broad-Internal).',
          'Focus intensely on the sensation of air entering the tip of your nostrils (Narrow-Internal).',
          'Practice shifting between these 4 states on command during tactical walkthroughs.'
        ],
        duration: '4 minutes daily mental drill',
        evidenceBase: 'Dr. Robert Nideffer Theory of Attentional and Interpersonal Style (TAIS).',
        exerciseType: 'standard',
      },
      {
        name: 'Attention Triggers & Verbal Focal Cues',
        category: 'Cue Conditioning',
        tagline: 'Single-syllable verbal locks that pull attention back to the present moment.',
        description: 'When the mind wanders into regret over the last point or fear of future outcomes, an immediate trigger word re-anchors attention to the immediate cue.',
        howToPractice: [
          'Choose one crisp, actionable trigger word: "Ball", "Feet", "Target", or "Here".',
          'The microsecond you catch your mind daydreaming or dwelling, say the word firmly.',
          'Pair the word with locking your gaze onto the immediate physical target.',
          'Notice how words describing verbs or objects prevent internal ruminative dialogue.'
        ],
        duration: 'Immediate micro-intervention during play',
        evidenceBase: 'Moran cognitive sports psychology focus cue research.',
        exerciseType: 'reframing',
      },
      {
        name: '5-4-3-2-1 Sensory Grounding Drill',
        category: 'Present-Moment Reset',
        tagline: 'Rapid somatic anchoring when brain fog or panic distorts focus.',
        description: 'A sensory inventory that forces sensory cortex activation, instantly dragging your attention out of racing head-noise and into the real world.',
        howToPractice: [
          'Acknowledge 5 things you can visually see right now.',
          'Acknowledge 4 things you can physically feel (feet in socks, grip on racket, breeze).',
          'Acknowledge 3 distinct sounds you can hear (shoes squeaking, whistle, breath).',
          'Acknowledge 2 things you can smell or taste.',
          'Take 1 deep centering breath and declare: "I am right here, right now."'
        ],
        duration: '60 to 90 seconds during timeouts, intermissions, or breaks',
        evidenceBase: 'Clinical ACT and sports biofeedback mindfulness grounding.',
        exerciseType: 'standard',
      }
    ],
    ageTips: {
      '10-14': 'Put away mobile devices 30 minutes before training. Practice playing a game where you see how long you can keep your eyes locked on the ball without blinking or looking away.',
      '15-19': 'Notifications and social apps train your brain to have a short attention span. Train your "focus muscle" by doing single-tasking sessions with zero phone interruptions.',
      '20-24': 'Master the art of "parking" distracting thoughts. Keep a scrap of paper nearby during study or preparation; jot down intrusive ideas to deal with later.',
      '25-29': 'In high-intensity environments, focus narrows naturally. Ensure you regularly alternate between broad environmental scanning and narrow execution so you don\'t miss tactical shifts.',
      '30-35': 'Cognitive fatigue from work meetings can sap your evening focus. Use a 3-minute transitional sensory drill before entering practice to sharpen attention.',
      '35 Above': 'Rely on disciplined attentional cues rather than brute willpower. Set clear visual routines before every execution (serves, shots, presentations).',
    }
  },
  {
    id: 'mental_toughness',
    title: 'Mental toughness and resilience',
    shortDescription: 'Grit, perseverance under adversity, and rapid rebound from setbacks.',
    longDescription: 'The psychological stamina to persevere through fatigue, pain, hostile conditions, and crushing setbacks with unwavering commitment and optimism.',
    iconName: 'ShieldAlert',
    colorScheme: {
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      border: 'border-cyan-500/30',
      text: 'text-cyan-600 dark:text-cyan-400',
      badge: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      bar: 'bg-cyan-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'The 24-Hour Objective Debrief Protocol',
        category: 'Constructive Reflection',
        tagline: 'Extract hard lessons from tough defeats without emotional self-flagellation.',
        description: 'A disciplined framework that permits feeling raw emotion for a set window, followed by structured, objective analysis and forward movement.',
        howToPractice: [
          'Allow 60 minutes after a tough loss or mistake for raw emotional cooling.',
          'Within 24 hours, write down answers to: 1) What went well? 2) What was exposed? 3) What is my single training fix this week?',
          'Once written down, close the notebook. The defeat is officially converted into fuel.',
          'Never dwell on or re-litigate the event emotionally after the debrief is complete.'
        ],
        duration: '10 minutes structured debrief post-competition',
        evidenceBase: 'Adapted from military post-mission debriefing and Olympic post-competition protocols.',
        exerciseType: 'goal_setting',
      },
      {
        name: 'Adversity Inoculation & "Worst-Case" Rehearsal',
        category: 'Stress Inoculation',
        tagline: 'Pre-arm your mind for terrible weather, bad calls, and hostile crowds.',
        description: 'If you expect everything to go perfectly, the first unexpected disruption will break you. Mentally encountering worst-case scenarios makes you antifragile.',
        howToPractice: [
          'List the top 3 disruptions that could happen (bad referee, equipment failure, sudden deficit).',
          'Write down your pre-planned resilient response: "If X happens, I will immediately do Y."',
          'Visualize yourself staying calm, smiling, and executing your response under that exact pressure.',
          'In training, intentionally welcome rainy days, noisy environments, or harsh handicaps as mental gym weights.'
        ],
        duration: '5 minutes pre-event contingency prep',
        evidenceBase: 'Meichenbaum Stress Inoculation Training (SIT) for peak performance resilience.',
        exerciseType: 'visualization',
      },
      {
        name: 'The "Friction Point" Growth Mindset Reframe',
        category: 'Cognitive Grit',
        tagline: 'Welcome burning lungs and mental fatigue as the exact moment growth occurs.',
        description: 'Reframing physical and mental suffering not as a signal to quit, but as the golden doorway where adaptation actually takes place.',
        howToPractice: [
          'Identify your typical "quit signal" (heavy legs, burning lungs, feeling overwhelmed).',
          'Reframe that moment: "This is not the end; this is where the real workout begins."',
          'Repeat your resilience mantra: "Tough situations don\'t last; tough competitors do."',
          'Commit to just 60 more seconds of disciplined form rather than worrying about the finish line.'
        ],
        duration: 'Immediate during peak physical exertion',
        evidenceBase: 'Carol Dweck Growth Mindset research and Angela Duckworth grit paradigms.',
        exerciseType: 'reframing',
      }
    ],
    ageTips: {
      '10-14': 'Remember that losing a match or struggling with a hard drill is not failure—it\'s just your brain building new strength muscles! High five your teammates and get back in line.',
      '15-19': 'When things go wrong, avoid making excuses or blaming referees and coaches. Taking 100% ownership of your reaction is the ultimate sign of mental toughness.',
      '20-24': 'Embrace tough training conditions. The athlete who learns to thrive in the rain, cold, and fatigue has a massive psychological edge over fragile competitors.',
      '25-29': 'Resilience is not just about toughing it out—it is also about smart recovery. True toughness includes knowing when to recharge so you don\'t break.',
      '30-35': 'Use your career scar tissue as armor. You have survived slumps, injuries, and setbacks before; let that history give you quiet confidence.',
      '35 Above': 'Patience and perspective are your greatest resilient assets. While others panic under pressure, anchor your group with steady composure.',
    }
  },
  {
    id: 'aggression_anger',
    title: 'Aggression and anger',
    shortDescription: 'Channeling raw competitive fire into disciplined, assertive execution.',
    longDescription: 'Controlling impulsive fury, retaliatory aggression, and hostile temper surges so that intense competitive aggression remains legal, tactical, and clean.',
    iconName: 'FlameKindling',
    colorScheme: {
      bg: 'bg-red-500/10 dark:bg-red-500/20',
      border: 'border-red-500/30',
      text: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      bar: 'bg-red-500',
    },
    isDistressMeasure: true,
    matchedSkills: [
      {
        name: 'The Channeled Assertiveness Protocol',
        category: 'Energy Redirection',
        tagline: 'Convert blind destructive fury into explosive tactical intensity.',
        description: 'Anger provides high physiological horsepower (adrenaline, fast twitch recruitment). The skill is funneling that kinetic drive into lawful, clean execution instead of stupid penalties.',
        howToPractice: [
          'Recognize the internal red alert: "I am feeling fiery anger toward this opponent/situation."',
          'Ask: "Will punching a wall or taking a stupid foul hurt me or help my goals?"',
          'Vow to take revenge through the scoreboard: "I will make them pay with relentless work rate and flawless play."',
          'Channel the physical surge directly into your next sprint, tackle, or technical repetition.'
        ],
        duration: 'Instant cognitive pivot during heated competitive moments',
        evidenceBase: 'Silva & Husman models of instrumental vs hostile aggression in contact sports.',
        exerciseType: 'reframing',
      },
      {
        name: 'The Anger Thermometer & Early Somatic Warning Check',
        category: 'Self-Monitoring',
        tagline: 'Catch irritation at 4/10 before it blows past 9/10 into red-card territory.',
        description: 'Tracking physiological warning signs (clenched jaw, heat in neck, tunnel vision) before emotional control slips beyond conscious regulation.',
        howToPractice: [
          'Identify your personal physical anger signals (tight fists, rapid shallow breathing, teeth grinding).',
          'Mentally rate your temperature on a 1 to 10 scale (1 = icy calm, 10 = blinding rage).',
          'If you hit 6/10, immediately execute a physical release: shake out your wrists, loosen your shoulders.',
          'Remind yourself: "Ice in the head, fire in the belly."'
        ],
        duration: 'Ongoing self-check during high-contact or contentious environments',
        evidenceBase: 'Novaco anger intervention protocol adapted for elite contact sports.',
        exerciseType: 'standard',
      },
      {
        name: 'The 5-Second Neutral Exhale & Tactical Disengagement',
        category: 'Impulse Delay',
        tagline: 'Buy your prefrontal cortex 5 seconds before your fists or tongue react.',
        description: 'When provoked or confronted by an opponent\'s gamesmanship, walking away for 5 full paces while blowing out a long exhale stops retaliatory penalties.',
        howToPractice: [
          'When provoked or fouled, immediately turn your back to the instigator.',
          'Take 5 deliberate paces toward your own team\'s half or neutral territory.',
          'Exhale forcefully through your lips like blowing out a candle.',
          'Look at your coach or team captain for your next tactical assignment.'
        ],
        duration: '5 seconds immediately following provocation',
        evidenceBase: 'Impulse control and emotional regulation research in professional sports officiating.',
        exerciseType: 'breathing',
      }
    ],
    ageTips: {
      '10-14': 'Opponents will sometimes try to get you mad so you get into trouble. Never give them that victory! Smile, walk away, and score on the next play instead.',
      '15-19': 'Hormones and competitive drive are soaring at this age. Remember: yellow cards, technical fouls, or losing your cool hurts your entire team. Channel that fire into hustle.',
      '20-24': 'Develop a reputation as an icy, unflappable competitor. When opponents see that their dirty tactics don\'t faze you, they will lose their own composure.',
      '25-29': 'Distinguish between assertive dominance and reckless aggression. Assertiveness wins games; uncontrolled rage gets you suspended.',
      '30-35': 'Use your experience to de-escalate heated moments on the field or court. Be the voice of reason that prevents teammates from taking retaliatory fouls.',
      '35 Above': 'Play with mature tactical dignity. Let younger, impatient opponents exhaust themselves with emotional outbursts while you dictate the game.',
    }
  },
  {
    id: 'intelligence_learning',
    title: 'Intelligence and learning',
    shortDescription: 'Tactical literacy, rapid skill acquisition, and metacognitive feedback loops.',
    longDescription: 'Cognitive adaptability, pattern recognition, strategic game intelligence, and the humble willingness to solicit and rapidly integrate critical coaching feedback.',
    iconName: 'Brain',
    colorScheme: {
      bg: 'bg-violet-500/10 dark:bg-violet-500/20',
      border: 'border-violet-500/30',
      text: 'text-violet-600 dark:text-violet-400',
      badge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
      bar: 'bg-violet-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'The Deliberate Practice Micro-Loop',
        category: 'Skill Acquisition',
        tagline: 'Replace mindless repetitions with intense, feedback-driven micro-adjustments.',
        description: 'Mindless repetition builds bad habits. Deliberate practice pairs immediate tactical focus with instant self-evaluation and mechanical fine-tuning.',
        howToPractice: [
          'Pick ONE micro-element to master in today\'s session (e.g., foot angle on release, first touch directional control).',
          'Execute a set of 5 repetitions with 100% conscious intent.',
          'Pause and grade yourself: "Did my foot angle hit the target? What made it drift?"',
          'Adjust by 5 degrees on the next set. Track the percentage of perfect reps.'
        ],
        duration: 'Applied across all daily practice drills',
        evidenceBase: 'K. Anders Ericsson research on Deliberate Practice and elite expertise development.',
        exerciseType: 'standard',
      },
      {
        name: 'The Tactical "Chessboard" Scenario Simulation',
        category: 'Cognitive Speed',
        tagline: 'Pre-load tactical decision trees before stepping onto the pitch or court.',
        description: 'High sports intelligence is not faster reflexes—it is earlier anticipation. Studying patterns and mentally walking through situational responses accelerates decision-making.',
        howToPractice: [
          'Review 5 minutes of game footage or tactical diagrams of upcoming matchups.',
          'Freeze-frame moments of play and ask: "Where is the open space? What are the opponent\'s two likely moves?"',
          'Formulate your "If/Then" rule: "If the defense steps up, I immediately exploit the channel behind them."',
          'Test this intuition in scrimmages and notice how much faster you react.'
        ],
        duration: '10 to 15 minutes 2x per week',
        evidenceBase: 'Perceptual-cognitive expertise research by Williams, Ward, and Ericsson.',
        exerciseType: 'visualization',
      },
      {
        name: 'The Humble Inquiry & Feedback Debrief',
        category: 'Metacognition',
        tagline: 'Extract elite coaching wisdom by asking precise, high-leverage questions.',
        description: 'Elite performers do not wait passively for coaches to point out flaws. They proactively ask targeted questions to accelerate their learning curve.',
        howToPractice: [
          'After practice, approach your coach or mentor with one specific observation: "Coach, on that transition drill, how could I position my body to see the blind side faster?"',
          'Listen without defending yourself or making excuses.',
          'Take notes immediately in your training journal.',
          'Apply the coaching cue during the warm-up of the very next session.'
        ],
        duration: '3 minutes after practice + note recording',
        evidenceBase: 'Edmondson psychological safety and self-regulated learning in performance domains.',
        exerciseType: 'standard',
      }
    ],
    ageTips: {
      '10-14': 'Be curious like a detective! If you miss a shot or make a mistake, don\'t feel sad—ask your coach: "What can I try differently next time?" That is how champions learn fast.',
      '15-19': 'Watch game video of world-class athletes playing your exact position. Notice what they do when they DO NOT have the ball or when the play is away from them.',
      '20-24': 'Develop tactical fluency. Learn your team\'s entire playbook and understand the responsibilities of the positions next to you so you can communicate seamlessly.',
      '25-29': 'Use high game intelligence to conserve physical energy. Anticipate patterns so you are already in position before the play develops.',
      '30-35': 'Your athletic IQ and pattern recognition can completely neutralize younger opponents who rely solely on raw speed. Outsmart them with positioning and timing.',
      '35 Above': 'Become an on-field coach and mentor. Share your deep tactical understanding with younger players to elevate the standard of the entire squad.',
    }
  },
  {
    id: 'mood_wellbeing',
    title: 'Mood and wellbeing',
    shortDescription: 'Vitality, psychological recovery, balanced identity, and life joy.',
    longDescription: 'Overall affective wellness, quality sleep, mental rejuvenation, and maintaining a wholesome life identity that prevents burnout and emotional exhaustion.',
    iconName: 'SunMedium',
    colorScheme: {
      bg: 'bg-teal-500/10 dark:bg-teal-500/20',
      border: 'border-teal-500/30',
      text: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      bar: 'bg-teal-500',
    },
    isDistressMeasure: false,
    matchedSkills: [
      {
        name: 'The Non-Negotiable Psychological Recovery Ritual',
        category: 'Restorative Wellness',
        tagline: 'Treat mental downtime with the exact same rigor as high-intensity training.',
        description: 'Continuous high performance requires deliberate parasympathetic downtime. Incorporating sleep hygiene, digital curfews, and nature exposure restores neurochemical balance.',
        howToPractice: [
          'Institute a "Digital Sunset" 45 minutes before sleep (screens off or placed outside bedroom).',
          'Aim for 8+ hours of sleep in a cool, pitch-black room.',
          'Schedule at least 2 hours per week in green/blue spaces (parks, trails, water) without headphones.',
          'Track your subjective morning vitality score on a 1-5 scale.'
        ],
        duration: 'Nightly routine + weekly outdoor decompression',
        evidenceBase: 'Matthew Walker sleep science and nature biophilia restorative wellness paradigms.',
        exerciseType: 'standard',
      },
      {
        name: 'Gratitude & Micro-Joy Priming',
        category: 'Positive Psychology',
        tagline: 'Rewire the brain\'s negativity bias by actively celebrating daily life.',
        description: 'High achievers often suffer from perfectionist tunnel vision. Actively writing down three specific positive moments builds dopamine reserves and emotional resilience.',
        howToPractice: [
          'Before bed, write down 3 specific things you appreciated today.',
          'Make at least one about your sport/work, one about a person, and one simple sensory pleasure (great coffee, sunshine, a good laugh).',
          'Spend 15 seconds genuinely savoring the memory and the feeling of gratitude.',
          'Notice how this shifts your default baseline from deficit to abundance.'
        ],
        duration: '3 minutes every evening',
        evidenceBase: 'Seligman PERMA positive psychology and Emmons gratitude intervention trials.',
        exerciseType: 'reframing',
      },
      {
        name: 'The Multi-Dimensional Identity Protocol',
        category: 'Identity Health',
        tagline: 'Never tie 100% of your self-worth to a scoreboard or a job title.',
        description: 'Athletes and performers who base their entire identity on performance metrics suffer severe mental health crises when injured or in a slump. Cultivating other life pillars provides safety.',
        howToPractice: [
          'Draw an identity pie chart: Athlete/Worker, Friend/Family, Creative/Learner, Explorer.',
          'Ensure the non-performance slices receive at least 2 dedicated hours of nurturing each week.',
          'Affirm your intrinsic value: "I am a human being who participates in sport/work; my worth is not determined by whether I won or lost today."',
          'Engage regularly in a hobby where there is zero expectation to be the best.'
        ],
        duration: 'Weekly reflection & boundary review',
        evidenceBase: 'Brewer athletic identity measurement and athlete mental health transition research.',
        exerciseType: 'goal_setting',
      }
    ],
    ageTips: {
      '10-14': 'Make sure you have time to play with your friends, read, draw, or relax outside of sports and school. Having fun hobbies keeps your heart and mind smiling!',
      '15-19': 'School exams and sport can feel all-consuming. Don\'t sacrifice sleep and healthy meals—your brain and body need fuel to stay happy and energized.',
      '20-24': 'Beware of defining yourself 100% as an athlete or by your job. When you have outside passions and close friendships, you perform with more freedom and joy.',
      '25-29': 'Prioritize true recovery days. Sitting on the couch stressing about what you should be doing is not recovery. Engage in restorative activities that replenish your spirit.',
      '30-35': 'Cultivate work-life-training harmony. Celebrating small daily moments with loved ones provides the emotional bedrock for sustained peak performance.',
      '35 Above': 'Appreciate the joy of movement, health, and vitality. Enjoy your community and celebrate how far your dedication and discipline have carried you.',
    }
  }
];

export interface FactorQuestionSet {
  factorId: string;
  generalQuestions: {
    '10-14': string[];
    '15-19': string[];
    '20+': string[];
  };
  athleteQuestion: string;
}

export const FACTOR_QUESTIONS: Record<string, FactorQuestionSet> = {
  anxiety: {
    factorId: 'anxiety',
    generalQuestions: {
      '10-14': [
        'I get nervous butterflies, shaky hands, or tummy aches before an important game, test, or tryout.',
        'I worry a lot that I might make a bad mistake and let my team, coach, or parents down.',
        'When I start feeling nervous, my heart beats fast and my mind feels too crowded to think straight.'
      ],
      '15-19': [
        'I experience noticeable physical jitters, muscle tension, or shallow breathing prior to big events or assessments.',
        'I catch myself overthinking worst-case scenarios and fearing what others will think of my performance.',
        'Anticipatory anxiety and self-doubt make it difficult for me to feel relaxed and ready to execute.'
      ],
      '20+': [
        'I experience somatic anxiety (elevated heart rate, muscular stiffness, butterflies) prior to major high-stakes demands.',
        'I struggle with cognitive apprehension, excessive worry, and second-guessing my preparation before competing.',
        'Elevated nervousness impairs my ability to trust my training and execute skills with fluid automaticity.'
      ]
    },
    athleteQuestion: 'Before matches or competitions, pre-game anxiety and nervousness negatively impact my warm-up focus and early game rhythm.'
  },
  stress: {
    factorId: 'stress',
    generalQuestions: {
      '10-14': [
        'Having so much homework, practice, and busy schedules makes me feel super tired and cranky.',
        'When there is too much going on at once, I get headaches, feel grumpy, or want to give up.',
        'It feels hard for me to unwind, calm down, and sleep well after a super busy or intense day.'
      ],
      '15-19': [
        'Juggling school assignments, training schedules, and social expectations leaves me feeling drained and overwhelmed.',
        'Prolonged pressure makes me irritable, harms my sleep, or causes physical exhaustion.',
        'When multiple demands pile up simultaneously, I struggle to compartmentalize and prioritize calmly.'
      ],
      '20+': [
        'I experience chronic psychological strain and fatigue resulting from competing demands, workloads, and expectations.',
        'Sustained stress impairs my cognitive clarity, recovery rate, and overall day-to-day energy levels.',
        'I find it difficult to mentally disconnect and down-regulate my nervous system between intense commitments.'
      ]
    },
    athleteQuestion: 'The combined physical load of training, competition travel, and selection expectations leaves me feeling mentally fatigued.'
  },
  emotion_regulation: {
    factorId: 'emotion_regulation',
    generalQuestions: {
      '10-14': [
        'When I get upset, angry, or disappointed, I can take a deep breath and calm myself down quickly.',
        'If something feels unfair or a referee makes a bad call, I keep my cool without losing my temper.',
        'I can easily bounce back and keep smiling even after a frustrating error or bad play.'
      ],
      '15-19': [
        'I remain composed and in control of my reactions even when facing frustrating setbacks or bad officiating.',
        'I can rapidly reset my emotional baseline after making a mistake without letting it ruin the rest of the session.',
        'I know how to channel intense feelings like frustration or excitement into steady, focused performance.'
      ],
      '20+': [
        'I maintain emotional equilibrium and affective composure under provocative, hostile, or chaotic conditions.',
        'I can decouple an instinctive surge of frustration from my subsequent decisions and body language.',
        'I skillfully regulate my arousal levels, transitioning smoothly from high intensity back to calm focus.'
      ]
    },
    athleteQuestion: 'During competitive action, bad calls, opponent taunts, or missed opportunities do not destabilize my emotional game face.'
  },
  motivation: {
    factorId: 'motivation',
    generalQuestions: {
      '10-14': [
        'I genuinely look forward to practicing, playing, and learning new skills every single week.',
        'Even on days when I feel tired or lazy, I still show up and give my best effort.',
        'I play because I truly love the game and having fun, not just to collect trophies or praise.'
      ],
      '15-19': [
        'I possess strong internal drive and dedication to push my limits and develop my full potential.',
        'Even when motivation is low or training gets repetitive, I maintain discipline and execute my routines.',
        'My commitment is fueled by personal mastery and passion rather than solely external validation.'
      ],
      '20+': [
        'I possess relentless self-determination and an intrinsic drive to strive for peak excellence daily.',
        'I demonstrate disciplined consistency and work ethic on days when emotional inspiration is absent.',
        'My motivation is anchored in core personal values and process mastery rather than outside acclaim.'
      ]
    },
    athleteQuestion: 'My dedication to rigorous conditioning, tactical study, and recovery drills remains high regardless of recent wins or losses.'
  },
  self_confidence: {
    factorId: 'self_confidence',
    generalQuestions: {
      '10-14': [
        'I believe in myself and know I have the skills to do well when I try hard.',
        'When facing tough competitors or hard drills, I feel excited to test myself rather than scared of failing.',
        'If I make a mistake, I quickly remind myself of all the things I do well and keep playing with confidence.'
      ],
      '15-19': [
        'I have robust self-belief in my capabilities, preparation, and tactical strengths.',
        'Facing superior opponents or high expectations stimulates my determination rather than eroding my confidence.',
        'I maintain strong self-trust in my abilities even during competitive slumps or challenging phases.'
      ],
      '20+': [
        'I possess an unshakeable, evidence-based belief in my physical preparation, skills, and tactical competence.',
        'In critical, high-pressure moments, I trust my instincts and execute decisively without second-guessing.',
        'I preserve stable self-efficacy that is independent of short-term outcomes or external opinions.'
      ]
    },
    athleteQuestion: 'In crunch-time situations (match points, decisive final minutes, penalty shootouts), I actively want the ball or responsibility.'
  },
  concentration_focus: {
    factorId: 'concentration_focus',
    generalQuestions: {
      '10-14': [
        'I can keep my eyes and mind locked on what I am doing without getting distracted by sideline noise or phone alerts.',
        'I stay fully tuned in and alert from the very start of practice until the coach blows the final whistle.',
        'If my mind starts daydreaming, I can instantly bring my focus right back to the current play.'
      ],
      '15-19': [
        'I can effectively screen out external distractions (crowd noise, spectators, opponents) and focus on key cues.',
        'I sustain mental alertness and sharp concentration throughout long, demanding training sessions and matches.',
        'When my mind drifts to past mistakes or future results, I quickly re-center into the present moment.'
      ],
      '20+': [
        'I selectively direct my attentional spotlight onto task-relevant tactical cues while filtering out environmental noise.',
        'I maintain uninterrupted cognitive vigilance and situational awareness through the entirety of demanding events.',
        'I rapidly suppress intrusive thoughts and execute present-moment attentional resets on demand.'
      ]
    },
    athleteQuestion: 'During rapid, chaotic gameplay, I maintain crisp visual tracking and tactical decision-making without succumbing to tunnel vision.'
  },
  mental_toughness: {
    factorId: 'mental_toughness',
    generalQuestions: {
      '10-14': [
        'When things get tough, tiring, or painful, I keep pushing forward without giving up or crying.',
        'If our team falls behind, I try even harder instead of hanging my head down.',
        'I view hard challenges and losses as fun puzzles that make me stronger for the next time.'
      ],
      '15-19': [
        'I possess the mental grit to push through extreme physical fatigue, burning muscles, and discomfort.',
        'Adverse conditions (poor weather, hostile crowds, bad surfaces) bring out my best competitive fighting spirit.',
        'I treat painful losses and setbacks as valuable diagnostic feedback rather than personal defeats.'
      ],
      '20+': [
        'I demonstrate exceptional psychological resilience and grit when confronting prolonged adversity and physical strain.',
        'I remain mentally formidable and tactically disciplined when circumstances, decisions, or conditions turn severely against me.',
        'I extract clear strategic lessons from critical failures and immediately channel them into intensified preparation.'
      ]
    },
    athleteQuestion: 'When facing a score deficit or extreme late-game fatigue, my competitive intensity and fighting spirit escalate.'
  },
  aggression_anger: {
    factorId: 'aggression_anger',
    generalQuestions: {
      '10-14': [
        'I sometimes feel sudden bursts of angry temper where I want to shout, slam something, or kick equipment.',
        'When another player does something mean or pushes me, it is really hard to stop myself from retaliating.',
        'I stay mad for a long time after getting called for a foul or told off, which makes me play sloppy.'
      ],
      '15-19': [
        'I experience sudden surges of explosive anger or hostility when things go against me during competition.',
        'When provoked by opponents or what feels like unfair treatment, I struggle to inhibit aggressive retaliatory impulses.',
        'Lingering resentment and temper flare-ups cloud my judgment and lead to careless mistakes or penalties.'
      ],
      '20+': [
        'I experience intense bursts of hostile anger that threaten to overwhelm my tactical judgment and emotional composure.',
        'I feel strong impulses toward retaliatory aggression when confronted by unsportsmanlike behavior or perceived injustice.',
        'Unchecked frustration sometimes impairs my discipline, risking costly penalties or tactical breakdowns.'
      ]
    },
    athleteQuestion: 'Under intense competitive heat, I sometimes struggle to keep my aggression strictly within legal, tactical boundaries.'
  },
  intelligence_learning: {
    factorId: 'intelligence_learning',
    generalQuestions: {
      '10-14': [
        'I love learning new techniques, tricks, and moves, and I pick them up pretty quickly during practice.',
        'I listen carefully to my coach\'s advice and immediately try to do what they asked me to do.',
        'I can easily understand what our team plan is and know where I should be standing during a play.'
      ],
      '15-19': [
        'I grasp complex technical skills, tactical patterns, and positional strategies with high cognitive speed.',
        'I actively seek out constructive critique and video feedback to accelerate my development curve.',
        'I can diagnose my own errors during play and make quick tactical adjustments without being reminded.'
      ],
      '20+': [
        'I exhibit advanced tactical literacy, perceptual anticipation, and rapid recognition of opponent tendencies.',
        'I operate with a deliberate learning mindset, constantly seeking critical feedback and biomechanical optimization.',
        'I demonstrate rapid on-the-fly cognitive adaptability, adjusting strategic game plans in response to situational demands.'
      ]
    },
    athleteQuestion: 'I possess high game intelligence and actively anticipate tactical shifts before opponents can exploit them.'
  },
  mood_wellbeing: {
    factorId: 'mood_wellbeing',
    generalQuestions: {
      '10-14': [
        'Most days I wake up feeling happy, excited, and full of energy to play and learn.',
        'I have great friends, fun hobbies outside of sports, and time to laugh and play every single day.',
        'I feel really good about who I am both on and off the field or court.'
      ],
      '15-19': [
        'I maintain an overall positive, optimistic mood and feel energized across my daily routines.',
        'I enjoy a healthy balance between training, academic life, social relationships, and restful downtime.',
        'My sense of self-worth is well-rounded and doesn\'t collapse if I have a bad training day or poor result.'
      ],
      '20+': [
        'I experience high subjective vitality, emotional wellness, and optimism across both athletic and personal domains.',
        'I maintain effective lifestyle equilibrium, protecting restorative sleep, nutrition, and mental decompression.',
        'My athletic identity is healthy and integrated into a broader, fulfilling life purpose without chronic burnout.'
      ]
    },
    athleteQuestion: 'My athletic career enhances my life satisfaction and mental health rather than generating chronic emotional burnout.'
  }
};
