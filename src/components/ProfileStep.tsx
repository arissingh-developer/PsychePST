import React, { useState, useEffect } from 'react';
import { UserProfile, AgeGroup, Sex, AthleteLevel } from '../types/psychology';
import { calculateAgeFromDob } from '../utils/calculator';
import { 
  User, 
  Calendar, 
  MapPin, 
  Dumbbell, 
  Medal, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ProfileStepProps {
  initialProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({
  initialProfile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [dob, setDob] = useState(initialProfile?.dob || '2008-05-15');
  const [city, setCity] = useState(initialProfile?.city || '');
  const [sex, setSex] = useState<Sex>(initialProfile?.sex || 'Male');
  const [isAthlete, setIsAthlete] = useState<boolean>(initialProfile?.isAthlete ?? true);
  
  // Athlete-specific fields
  const [sport, setSport] = useState(initialProfile?.sport || 'Football / Soccer');
  const [customSport, setCustomSport] = useState('');
  const [athleteLevel, setAthleteLevel] = useState<AthleteLevel>(
    initialProfile?.athleteLevel || 'State / Regional'
  );
  const [yearsOfTraining, setYearsOfTraining] = useState<number>(
    initialProfile?.yearsOfTraining ?? 5
  );

  // Live calculated age & group
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [calculatedGroup, setCalculatedGroup] = useState<AgeGroup | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (dob) {
      const res = calculateAgeFromDob(dob);
      if (res) {
        setCalculatedAge(res.age);
        setCalculatedGroup(res.ageGroup);
      } else {
        setCalculatedAge(null);
        setCalculatedGroup(null);
      }
    } else {
      setCalculatedAge(null);
      setCalculatedGroup(null);
    }
  }, [dob]);

  const sportsList = [
    'Football / Soccer',
    'Basketball',
    'Tennis',
    'Swimming',
    'Athletics / Track & Field',
    'Cricket',
    'Combat Sports (Boxing, MMA, Judo)',
    'Gymnastics',
    'Badminton',
    'Volleyball',
    'Rowing / Kayak',
    'Golf',
    'Field Hockey',
    'Rugby',
    'Table Tennis',
    'Other (Specify)'
  ];

  const athleteLevels: AthleteLevel[] = [
    'Grassroots / School',
    'District / Club',
    'State / Regional',
    'National',
    'International / Elite',
  ];

  const handleApplyPreset = (preset: {
    name: string;
    dob: string;
    city: string;
    sex: Sex;
    isAthlete: boolean;
    sport: string;
    athleteLevel: AthleteLevel;
    yearsOfTraining: number;
  }) => {
    setName(preset.name);
    setDob(preset.dob);
    setCity(preset.city);
    setSex(preset.sex);
    setIsAthlete(preset.isAthlete);
    setSport(preset.sport);
    setAthleteLevel(preset.athleteLevel);
    setYearsOfTraining(preset.yearsOfTraining);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!dob) {
      setErrorMsg('Please select your Date of Birth.');
      return;
    }
    if (!calculatedAge || !calculatedGroup) {
      setErrorMsg('Invalid Date of Birth. Please check the entered date.');
      return;
    }
    if (!city.trim()) {
      setErrorMsg('Please enter your city.');
      return;
    }

    const finalSport = sport === 'Other (Specify)' ? (customSport.trim() || 'General Sport') : sport;

    const profileData: UserProfile = {
      name: name.trim(),
      dob,
      age: calculatedAge,
      ageGroup: calculatedGroup,
      city: city.trim(),
      sex,
      isAthlete,
      sport: isAthlete ? finalSport : undefined,
      athleteLevel: isAthlete ? athleteLevel : undefined,
      yearsOfTraining: isAthlete ? Number(yearsOfTraining) : undefined,
    };

    onSaveProfile(profileData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title & Introduction */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Step 1: Athlete & Individual Profile
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Psychological Assessment Profile
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your age and age bracket are automatically computed from your Date of Birth to tailor the psychological questions, diagnostic thresholds, and PST training tips.
        </p>
      </div>

      {/* Quick Presets for Rapid Evaluation */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Demo Profiles (Test Across Age Groups):
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'Leo Kumar',
              dob: '2013-04-12', // ~13 yrs (10-14)
              city: 'Chicago',
              sex: 'Male',
              isAthlete: true,
              sport: 'Swimming',
              athleteLevel: 'District / Club',
              yearsOfTraining: 4
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">10-14 Youth</div>
            <div className="text-[11px] text-slate-500">13y Swimmer</div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'Maya Rodriguez',
              dob: '2009-08-20', // ~17 yrs (15-19)
              city: 'Barcelona',
              sex: 'Female',
              isAthlete: true,
              sport: 'Football / Soccer',
              athleteLevel: 'State / Regional',
              yearsOfTraining: 7
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">15-19 Junior</div>
            <div className="text-[11px] text-slate-500">17y Soccer</div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'Jordan Vance',
              dob: '2004-03-15', // ~22 yrs (20-24)
              city: 'Melbourne',
              sex: 'Male',
              isAthlete: true,
              sport: 'Athletics / Track & Field',
              athleteLevel: 'National',
              yearsOfTraining: 9
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">20-24 Collegiate</div>
            <div className="text-[11px] text-slate-500">22y Sprinter</div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'Elena Rostova',
              dob: '1999-11-04', // ~27 yrs (25-29)
              city: 'London',
              sex: 'Female',
              isAthlete: true,
              sport: 'Tennis',
              athleteLevel: 'International / Elite',
              yearsOfTraining: 14
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">25-29 Pro</div>
            <div className="text-[11px] text-slate-500">27y Tennis Pro</div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'David Thorne',
              dob: '1993-02-18', // ~33 yrs (30-35)
              city: 'Toronto',
              sex: 'Male',
              isAthlete: false,
              sport: 'Football / Soccer',
              athleteLevel: 'District / Club',
              yearsOfTraining: 3
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">30-35 Non-Athlete</div>
            <div className="text-[11px] text-slate-500">33y Executive</div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              name: 'Dr. Sarah Mitchell',
              dob: '1984-06-10', // ~42 yrs (35 Above)
              city: 'San Francisco',
              sex: 'Female',
              isAthlete: true,
              sport: 'Combat Sports (Boxing, MMA, Judo)',
              athleteLevel: 'State / Regional',
              yearsOfTraining: 18
            })}
            className="p-2 text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all text-xs cursor-pointer group"
          >
            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">35 Above Master</div>
            <div className="text-[11px] text-slate-500">42y Martial Arts</div>
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center gap-2.5 text-rose-700 dark:text-rose-300 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              City / Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Manchester, London, Boston"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* Date of Birth & Live Age Computation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                <input
                  type="date"
                  required
                  value={dob}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            {/* Live Age & Age Group Badge */}
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-indigo-200/80 dark:border-indigo-800/80 flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Automated Age Group Detection:
              </span>
              {calculatedAge !== null && calculatedGroup ? (
                <div className="mt-1 flex items-center flex-wrap gap-2">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    {calculatedAge} Years Old
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
                    Group: {calculatedGroup}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Calibrated
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic mt-1">Select date of birth to calculate age group</span>
              )}
            </div>
          </div>
          <p className="mt-2.5 text-xs text-indigo-900/70 dark:text-indigo-300/70">
            Age brackets supported: <strong className="font-bold">10-14</strong>, <strong className="font-bold">15-19</strong>, <strong className="font-bold">20-24</strong>, <strong className="font-bold">25-29</strong>, <strong className="font-bold">30-35</strong>, and <strong className="font-bold">35 Above</strong>.
          </p>
        </div>

        {/* Sex and Athlete Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Sex
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Male', 'Female', 'Other', 'Prefer not to say'] as Sex[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSex(option)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    sex === option
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Profile Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsAthlete(true)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAthlete
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Medal className="w-4 h-4" /> Athlete
              </button>
              <button
                type="button"
                onClick={() => setIsAthlete(false)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isAthlete
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" /> Non-Athlete
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              {isAthlete 
                ? 'Athletes receive an extra 4th sport-specific question per psychological factor.'
                : 'Standard 3 questions per factor tailored for general performance and wellness.'}
            </p>
          </div>
        </div>

        {/* Athlete-specific Fields: Sport, Level, Years of Training */}
        {isAthlete && (
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-sm font-bold">
              <Dumbbell className="w-4 h-4" />
              <span>Athletic Background Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sport */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Sport
                </label>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300/80 dark:border-amber-700/80 rounded-xl text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {sportsList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {sport === 'Other (Specify)' && (
                  <input
                    type="text"
                    placeholder="Enter sport name..."
                    value={customSport}
                    onChange={(e) => setCustomSport(e.target.value)}
                    className="mt-2 w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-amber-300 rounded-lg text-xs"
                  />
                )}
              </div>

              {/* Competitive Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Competitive Level
                </label>
                <select
                  value={athleteLevel}
                  onChange={(e) => setAthleteLevel(e.target.value as AthleteLevel)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300/80 dark:border-amber-700/80 rounded-xl text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {athleteLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Years of Training */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Years of Training
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    max="60"
                    step="1"
                    value={yearsOfTraining}
                    onChange={(e) => setYearsOfTraining(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-amber-300/80 dark:border-amber-700/80 rounded-xl text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Proceed to 10 Psychological Factors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
