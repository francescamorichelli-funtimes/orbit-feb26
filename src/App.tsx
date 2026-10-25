import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Stethoscope, 
  Search, 
  Filter, 
  Mic, 
  FileText, 
  Activity,
  ChevronRight,
  Lock,
  Database,
  Zap,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  LogOut,
  Settings
} from 'lucide-react';
import { cn } from './lib/utils';
import Markdown from 'react-markdown';

// --- Types ---

interface Meeting {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  diagnosis: string;
  duration: string;
  summary: string;
  analysis: string;
  status: 'completed' | 'processing';
}

// --- Mock Data ---

const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    patientName: 'Sarah Jenkins',
    patientId: 'P-9921',
    date: '2024-02-20',
    diagnosis: 'Type 2 Diabetes Mellitus',
    duration: '18:42',
    summary: 'Routine follow-up for HbA1c monitoring. Patient reports improved adherence to metformin but struggles with dietary changes during work hours.',
    analysis: `### Clinical Pattern Recognition
- **Adherence Pattern:** High medication adherence (95%), Low lifestyle adherence (40%).
- **Metabolic Trend:** HbA1c decreased from 7.8% to 7.2% over 3 months.
- **Risk Factor:** Sedentary work environment identified as primary barrier.

### Medical Literature Grounding
- **ADA 2024 Guidelines:** Recommends GLP-1 RA as secondary agent given patient's BMI of 31.2.
- **NEJM (2023):** "Lifestyle intervention efficacy in corporate environments" suggests micro-breaks for glucose stabilization.
- **Reference:** [Standards of Care in Diabetes—2024](https://diabetesjournals.org/care/article/47/Supplement_1/S1/153954/Introduction-and-Methodology-Standards-of-Care-in)`,
    status: 'completed'
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    patientId: 'P-4402',
    date: '2024-02-19',
    diagnosis: 'Hypertension, Stage 2',
    duration: '12:15',
    summary: 'New patient consultation. Elevated BP (155/95) confirmed over three readings. Family history of early-onset CVD.',
    analysis: `### Clinical Pattern Recognition
- **BP Profile:** Consistent Stage 2 readings.
- **Genetic Predisposition:** Strong paternal history (MI at age 48).
- **Lifestyle:** High sodium intake identified via dietary recall.

### Medical Literature Grounding
- **ACC/AHA Guidelines:** Initiation of dual-therapy (ACEi + CCB) recommended for Stage 2 HTN with CVD risk.
- **JAMA (2022):** "Sodium reduction strategies in urban populations" supports 1500mg/day target.
- **Reference:** [2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline](https://www.ahajournals.org/doi/10.1161/HYP.0000000000000065)`,
    status: 'completed'
  },
  {
    id: '3',
    patientName: 'Elena Rodriguez',
    patientId: 'P-1187',
    date: '2024-02-18',
    diagnosis: 'Generalized Anxiety Disorder',
    duration: '45:00',
    summary: 'Therapy session focusing on cognitive distortions related to health anxiety. GAD-7 score: 16 (Severe).',
    analysis: `### Clinical Pattern Recognition
- **Cognitive Profile:** Frequent "catastrophizing" regarding minor physical sensations.
- **Somatic Symptoms:** Reports tension headaches and insomnia.
- **Response:** Positive engagement with grounding techniques during session.

### Medical Literature Grounding
- **Cochrane Review:** CBT remains gold standard for GAD with NNT of 3.
- **Lancet Psychiatry (2023):** Combined pharmacotherapy and CBT shows 25% higher remission rates than monotherapy.
- **Reference:** [Psychological interventions for generalized anxiety disorder](https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001848.pub4/full)`,
    status: 'completed'
  }
];

const Navbar = ({ onStart }: { onStart: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 orbit-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand-indigo/20">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tighter">Orbit</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-brand-indigo transition-colors">Intelligence</a>
          <a href="#demo" className="hover:text-brand-indigo transition-colors">Demo</a>
          <a href="#value" className="hover:text-brand-indigo transition-colors">Value</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <button onClick={onStart} className="text-sm font-bold text-slate-600 hover:text-brand-indigo">Sign In</button>
            <button onClick={onStart} className="orbit-gradient text-white px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-brand-indigo/20">
              Launch Orbit
            </button>
          </div>
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn("w-full h-0.5 bg-current transition-all", isMenuOpen && "rotate-45 translate-y-2")} />
              <span className={cn("w-full h-0.5 bg-current transition-all", isMenuOpen && "opacity-0")} />
              <span className={cn("w-full h-0.5 bg-current transition-all", isMenuOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Intelligence</a>
              <a href="#demo" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Demo</a>
              <a href="#value" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Value</a>
              <div className="pt-4 w-full space-y-4">
                <button onClick={() => { onStart(); setIsMenuOpen(false); }} className="w-full py-4 text-lg font-bold text-slate-600">Sign In</button>
                <button onClick={() => { onStart(); setIsMenuOpen(false); }} className="w-full py-4 orbit-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-indigo/20">
                  Launch Orbit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => (
  <section className="relative pt-32 pb-24 px-8 overflow-hidden medical-grid">
    <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Now in Clinical Beta</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tight leading-[1.1] md:leading-[0.95]"
      >
        Clinical Intelligence <br className="hidden sm:block" />
        <span className="orbit-text-gradient">Beyond Transcription</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
      >
        Orbit transcribes encounters, suggests evidence-based diagnoses, and recognizes patterns across your entire patient history.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <button 
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 orbit-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-indigo/20 hover:scale-105 transition-all"
        >
          Start Your First Session
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
          View Demo
        </button>
      </motion.div>

      {/* Mockup Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="pt-16 max-w-5xl mx-auto"
      >
        <div className="orbit-glass rounded-[32px] overflow-hidden p-2">
          <div className="bg-slate-900 rounded-[28px] overflow-hidden min-h-[500px] md:aspect-[16/9] relative shadow-2xl">
             <div className="absolute inset-0 p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden">
                <div className="w-full md:w-2/3 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col gap-4 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-indigo/20 flex items-center justify-center">
                        <User className="text-brand-indigo w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-bold text-sm md:text-base">Sarah Jenkins</div>
                        <div className="text-white/40 text-[10px] md:text-xs">P-9921 • Feb 22, 2026</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">Completed</div>
                  </div>
                  <div className="flex-1 space-y-4 text-left overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-2">
                      <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">S.O.A.P. Note</div>
                      <div className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-4 md:line-clamp-none">
                        Patient reports improved adherence to metformin but struggles with dietary changes during work hours. HbA1c decreased from 7.8% to 7.2% over 3 months. Sedentary work environment identified as primary barrier...
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-brand-indigo text-[10px] font-bold uppercase mb-2">Assessment</div>
                        <div className="text-white/90 text-[10px] md:text-xs">Type 2 Diabetes Mellitus, improving metabolic control.</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-brand-pink text-[10px] font-bold uppercase mb-2">Plan</div>
                        <div className="text-white/90 text-[10px] md:text-xs">Continue Metformin 500mg BID. Discuss GLP-1 RA titration.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:flex-1 flex flex-col gap-6 overflow-hidden">
                  <div className="flex-1 orbit-gradient rounded-2xl p-6 text-left text-white shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Database className="w-5 h-5" />
                        <span className="font-bold text-sm">Diagnostic Hypothesis</span>
                      </div>
                      <div className="text-[10px] md:text-xs leading-relaxed opacity-90 line-clamp-3">
                        Based on pattern recognition across 14 encounters, patient exhibits secondary resistance patterns consistent with sedentary metabolic syndrome.
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between shrink-0">
                      <span className="text-[10px] font-bold opacity-70">Grounding: ADA 2024</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </div>
                  </div>
                  <div className="h-24 md:h-1/3 bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col justify-center items-center text-center shrink-0">
                    <Mic className="text-brand-pink w-6 h-6 mb-2" />
                    <div className="text-white/40 text-[10px] font-bold uppercase">Real-time Audio</div>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1 h-4 bg-brand-pink/40 rounded-full animate-pulse" />)}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const BentoGrid = () => (
  <section id="features" className="py-24 px-6 sm:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Serious Medicine, Fresh Design.</h2>
        <p className="text-slate-500 text-base md:text-lg font-medium">The "Core Four" pillars of Orbit clinical intelligence.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Pillar 1 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 orbit-glass rounded-[32px] sm:rounded-[40px] p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative min-h-[300px] sm:min-h-[340px]"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
              <Mic className="text-brand-indigo w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">High-Fidelity Transcription</h3>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Word-for-word accuracy with professional speaker labeling and medical entity recognition. Orbit captures every nuance of the clinical conversation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10 mt-6 sm:mt-8">
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">99.8% Accuracy</span>
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Speaker Diarization</span>
          </div>
        </motion.div>

        {/* Pillar 2 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="orbit-glass rounded-[32px] sm:rounded-[40px] p-8 md:p-10 flex flex-col justify-between group min-h-[300px] sm:min-h-[340px]"
        >
          <div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
              <Database className="text-brand-purple w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Diagnostic Grounding</h3>
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
              AI analysis backed by global medical literature and pattern recognition across your entire practice history.
            </p>
          </div>
          <div className="text-brand-purple font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-4">
            Learn more <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Pillar 3 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="orbit-glass rounded-[32px] sm:rounded-[40px] p-8 md:p-10 flex flex-col justify-between group min-h-[300px] sm:min-h-[340px]"
        >
          <div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
              <FileText className="text-brand-pink w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">S.O.A.P. Automation</h3>
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
              Automatic generation of Subjective, Objective, Assessment, and Plan notes directly from your clinical encounters.
            </p>
          </div>
          <div className="text-brand-pink font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-4">
            View Templates <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Pillar 4 */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 orbit-glass rounded-[32px] sm:rounded-[40px] p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative min-h-[300px] sm:min-h-[340px]"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
              <Search className="text-emerald-500 w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Global Archive Consult</h3>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              A "Searchable Brain" for your practice. Ask questions across all past meetings to find recurring symptoms or specific cases instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10 mt-6 sm:mt-8">
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Cross-Patient Search</span>
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Pattern Recognition</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ValueProp = () => (
  <section id="value" className="py-24 px-6 sm:px-8 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl orbit-gradient flex items-center justify-center shadow-lg shadow-brand-indigo/20 mx-auto md:mx-0">
            <Stethoscope className="text-white w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">For the Physician</h3>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Reduce documentation time by 80%. Focus on the patient, not the keyboard. Orbit handles the busy work so you can handle the medicine.
          </p>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl orbit-gradient flex items-center justify-center shadow-lg shadow-brand-purple/20 mx-auto md:mx-0">
            <Activity className="text-white w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">For the Patient</h3>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Better outcomes through AI-assisted pattern recognition that catches what might be missed. Patients feel heard, not just recorded.
          </p>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl orbit-gradient flex items-center justify-center shadow-lg shadow-brand-pink/20 mx-auto md:mx-0">
            <Database className="text-white w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">For the Practice</h3>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            A perfectly organized, searchable library of every clinical encounter. Turn your practice's data into a strategic asset.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const DemoSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  
  const handleMove = (clientX: number, currentTarget: HTMLElement) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100));
  };

  return (
    <section id="demo" className="py-24 px-6 sm:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Not just a tool, a consultant.</h2>
          <p className="text-slate-500 text-base md:text-lg font-medium">See how Orbit transforms raw clinical data into intelligence.</p>
        </div>

        <div className="relative aspect-[16/12] sm:aspect-[16/10] rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl group cursor-ew-resize select-none"
             onMouseMove={(e) => {
               if (e.buttons === 1) handleMove(e.clientX, e.currentTarget);
             }}
             onTouchMove={(e) => {
               handleMove(e.touches[0].clientX, e.currentTarget);
             }}>
          {/* Before */}
          <div className="absolute inset-0 bg-slate-100 p-6 sm:p-12 text-left">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">Before: Raw Clinical Notes</div>
            <div className="space-y-4 text-slate-400 font-mono text-xs sm:text-sm">
              <p>Patient comes in complaining of thirst and fatigue. BP is 140/90. Says they are taking metformin but not always. Working a lot lately, sitting down mostly. HbA1c was high last time. Need to check again. Maybe add something else to the meds? Patient seems stressed.</p>
              <p className="hidden sm:block">Physical exam: BMI 31. Lungs clear. Heart RRR. No edema.</p>
            </div>
          </div>

          {/* After */}
          <div className="absolute inset-0 orbit-glass p-6 sm:p-12 text-left"
               style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
            <div className="orbit-text-gradient text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6">After: Orbit Intelligence</div>
            <div className="space-y-4 sm:space-y-6">
              <div className="p-3 sm:p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <div className="text-brand-indigo text-[10px] font-bold uppercase mb-1 sm:mb-2">Summary</div>
                <div className="text-slate-700 text-xs sm:text-sm">Routine follow-up for HbA1c monitoring. Patient reports improved adherence to metformin but struggles with dietary changes.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <div className="text-brand-purple text-[10px] font-bold uppercase mb-1 sm:mb-2">Diagnosis</div>
                  <div className="text-slate-700 text-xs sm:text-sm font-bold">Type 2 Diabetes Mellitus</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-pink-50/50 border border-pink-100">
                  <div className="text-brand-pink text-[10px] font-bold uppercase mb-1 sm:mb-2">Treatment</div>
                  <div className="text-slate-700 text-xs sm:text-sm font-bold">GLP-1 RA Titration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div className="absolute top-0 bottom-0 w-1 orbit-gradient z-20"
               style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 h-10 orbit-glass rounded-full flex items-center justify-center shadow-xl">
              <div className="flex gap-1">
                <div className="w-0.5 h-3 sm:h-4 bg-slate-400 rounded-full" />
                <div className="w-0.5 h-3 sm:h-4 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Drag or touch to compare</p>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        <div className="sm:col-span-2 md:col-span-1 space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 orbit-gradient rounded-lg flex items-center justify-center shadow-lg">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tighter">Orbit</span>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
            Your clinical memory, amplified. Serious medicine, fresh design.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Product</h4>
          <ul className="space-y-4 text-slate-500 font-medium">
            <li><a href="#" className="hover:text-brand-indigo transition-colors">Intelligence</a></li>
            <li><a href="#" className="hover:text-brand-indigo transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-brand-indigo transition-colors">Security</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Company</h4>
          <ul className="space-y-4 text-slate-500 font-medium">
            <li><a href="#" className="hover:text-brand-indigo transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-indigo transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-brand-indigo transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-100 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center md:text-left">
        <p>© 2026 Orbit Intelligence Inc.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
          <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

const Dashboard = ({ onSelectMeeting, onLogout }: { onSelectMeeting: (m: Meeting) => void, onLogout: () => void }) => {
  const [search, setSearch] = useState('');
  const [filterDiagnosis, setFilterDiagnosis] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredMeetings = useMemo(() => {
    return MOCK_MEETINGS.filter(m => {
      const matchesSearch = m.patientName.toLowerCase().includes(search.toLowerCase()) || m.patientId.toLowerCase().includes(search.toLowerCase());
      const matchesDiagnosis = filterDiagnosis === 'All' || m.diagnosis.includes(filterDiagnosis);
      return matchesSearch && matchesDiagnosis;
    });
  }, [search, filterDiagnosis]);

  const diagnoses = ['All', ...Array.from(new Set(MOCK_MEETINGS.map(m => m.diagnosis.split(',')[0])))];

  return (
    <div className="min-h-screen bg-slate-50 flex relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white flex flex-col z-50 transition-transform lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="w-8 h-8 orbit-gradient rounded-lg flex items-center justify-center shadow-lg">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Orbit</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-indigo/10 text-brand-indigo font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Encounters
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
            <User className="w-5 h-5" />
            Patients
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
            <Database className="w-5 h-5" />
            Library
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">Patient Encounters</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-indigo rounded-lg text-sm w-40 md:w-64 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="orbit-gradient text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-brand-indigo/20">
              <Mic className="w-4 h-4" />
              <span className="hidden xs:inline">New Encounter</span>
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Filter className="w-4 h-4" />
              Filter by:
            </div>
            <select 
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-indigo outline-none w-full sm:w-auto"
              value={filterDiagnosis}
              onChange={(e) => setFilterDiagnosis(e.target.value)}
            >
              {diagnoses.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Table / List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMeetings.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{meeting.patientName}</div>
                      <div className="text-xs text-slate-500">{meeting.patientId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                        {meeting.diagnosis}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {meeting.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {meeting.duration}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onSelectMeeting(meeting)}
                        className="text-brand-indigo hover:text-brand-purple font-bold text-sm transition-colors"
                      >
                        View Analysis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const MeetingDetail = ({ meeting, onBack }: { meeting: Meeting, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="h-16 border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3 sm:gap-4 truncate">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="truncate">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">{meeting.patientName}</h1>
            <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-2 truncate">
              <Calendar className="w-3 h-3" /> {meeting.date} • <Clock className="w-3 h-3" /> {meeting.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="hidden sm:block px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
            Export SOAP
          </button>
          <button className="px-3 sm:px-4 py-2 rounded-lg orbit-gradient text-white text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-brand-indigo/20">
            Share
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Clinical Summary
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-sm sm:text-base leading-relaxed">
              {meeting.summary}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Expert Analysis
            </h2>
            <div className="prose prose-slate max-w-none markdown-body text-sm sm:text-base">
              <Markdown>{meeting.analysis}</Markdown>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl border border-brand-indigo/10 bg-brand-indigo/5">
            <h3 className="text-xs font-bold text-brand-indigo uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Key Observations
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                Patient adherence is improving but remains fragile.
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                Diagnosis confirmed via longitudinal data tracking.
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                Next follow-up recommended in 4 weeks.
              </li>
            </ul>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Patient Information</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Patient ID</div>
                <div className="text-sm font-medium text-slate-700">{meeting.patientId}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Primary Diagnosis</div>
                <div className="text-sm font-medium text-slate-700">{meeting.diagnosis}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Last Encounter</div>
                <div className="text-sm font-medium text-slate-700">14 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Compliance = () => (
  <section className="py-24 px-6 sm:px-8 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            Enterprise Grade Security
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Your Data, Protected by the Highest Standards.</h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Orbit is built with a "Privacy First" architecture. We never train our models on your patient data, and every byte is encrypted with AES-256 at rest and TLS 1.3 in transit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-700 font-bold text-sm sm:text-base">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
              HIPAA Compliant
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-700 font-bold text-sm sm:text-base">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
              GDPR Ready
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-700 font-bold text-sm sm:text-base">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
              SOC2 Type II
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-700 font-bold text-sm sm:text-base">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
              ISO 27001
            </div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md">
          <div className="orbit-glass p-6 sm:p-8 rounded-[32px] flex flex-col items-center text-center space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Lock className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Zero-Knowledge Encryption</div>
          </div>
          <div className="orbit-glass p-6 sm:p-8 rounded-[32px] flex flex-col items-center text-center space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Database className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Regional Data Residency</div>
          </div>
          <div className="orbit-glass p-6 sm:p-8 rounded-[32px] flex flex-col items-center text-center space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <ShieldCheck className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Continuous Auditing</div>
          </div>
          <div className="orbit-glass p-6 sm:p-8 rounded-[32px] flex flex-col items-center text-center space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Zap className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Instant Data Deletion</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'meeting'>('landing');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handleSelectMeeting = (m: Meeting) => {
    setSelectedMeeting(m);
    setView('meeting');
  };

  if (view === 'dashboard') {
    return <Dashboard onSelectMeeting={handleSelectMeeting} onLogout={() => setView('landing')} />;
  }

  if (view === 'meeting' && selectedMeeting) {
    return <MeetingDetail meeting={selectedMeeting} onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen selection:bg-brand-indigo/20">
      <Navbar onStart={() => setView('dashboard')} />
      <Hero onStart={() => setView('dashboard')} />
      <BentoGrid />
      <ValueProp />
      <DemoSlider />
      <Compliance />
      <section className="py-24 orbit-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 medical-grid" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to transform your practice?</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Join 5,000+ healthcare professionals who save 2+ hours of documentation every day with Orbit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setView('dashboard')}
              className="bg-white text-brand-indigo px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-2xl"
            >
              Start Your First Session
            </button>
            <button className="bg-slate-900 text-white border border-white/10 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-black transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
