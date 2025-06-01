import React, { useState } from 'react';
import { FiUsers, FiBriefcase, FiShuffle, FiLoader, FiAlertCircle, FiCheckCircle, FiUserCheck } from 'react-icons/fi';
import { useModelKu } from '../../../konteks/KonteksModelAi.jsx';

const AntarmukaDelegasiTugas = () => {
  const [deskripsiTugas, setDeskripsiTugas] = useState('');
  const [skillDibutuhkan, setSkillDibutuhkan] = useState(''); // Opsional
  const [anggotaTim, setAnggotaTim] = useState(''); // Nama dipisah koma
  
  const [saranDelegasi, setSaranDelegasi] = useState(null); // { tugas, delegasiKe, alasan }
  const [lagiMencari, setLagiMencari] = useState(false);
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');
  const { modelYangDipake } = useModelKu();

  const handleSaranDelegasi = async () => {
    if (!deskripsiTugas.trim() || !anggotaTim.trim()) {
      setPesanError('Please describe the task and list team members.');
      return;
    }
    setLagiMencari(true);
    setPesanError('');
    setPesanSukses('');
    setSaranDelegasi(null);

    const tim = anggotaTim.split(',').map(nama => nama.trim()).filter(nama => nama);
    if (tim.length === 0) {
        setPesanError('Please list valid team members, separated by commas.');
        setLagiMencari(false);
        return;
    }

    console.log(`Delegating task: "${deskripsiTugas}", Skills="${skillDibutuhkan}", Team=${tim.join(', ')}, Model=${modelYangDipake}`);
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulasi API

    // Hasil dummy delegasi
    const delegasiKeDummy = tim[Math.floor(Math.random() * tim.length)]; // Pilih acak dari tim
    const alasanDummy = `AI (${modelYangDipake}) suggests ${delegasiKeDummy} based on simulated skill matching for "${skillDibutuhkan || 'general task capabilities'}" and current workload (simulated).`;
    
    setSaranDelegasi({
      tugas: deskripsiTugas,
      delegasiKe: delegasiKeDummy,
      alasan: alasanDummy,
    });
    setPesanSukses(`Task delegation suggestion generated using ${modelYangDipake} model!`);
    setLagiMencari(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="taskDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Describe the Task to Delegate:
        </label>
        <textarea
          id="taskDescription"
          rows="4"
          value={deskripsiTugas}
          onChange={(e) => setDeskripsiTugas(e.target.value)}
          placeholder="e.g., Create marketing campaign for new product, Analyze Q3 sales data, Design user interface for mobile app..."
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="skillsRequired" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Skills Required (Optional, comma-separated):
          </label>
          <input
            type="text"
            id="skillsRequired"
            value={skillDibutuhkan}
            onChange={(e) => setSkillDibutuhkan(e.target.value)}
            placeholder="e.g., Graphic Design, Python, Copywriting"
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="teamMembers" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Team Members (Comma-separated):
          </label>
          <input
            type="text"
            id="teamMembers"
            value={anggotaTim}
            onChange={(e) => setAnggotaTim(e.target.value)}
            placeholder="e.g., Alice, Bob, Charlie, Diana"
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSaranDelegasi}
          disabled={lagiMencari || !deskripsiTugas.trim() || !anggotaTim.trim()}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {lagiMencari ? <FiLoader className="animate-spin mr-2" /> : <FiShuffle className="mr-2" />}
          Get Delegation Suggestion
        </button>
      </div>
      
      {pesanError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && !saranDelegasi && (
         <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}

      {saranDelegasi && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
          <FiUserCheck className="text-5xl text-brand-kedua dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">AI Delegation Suggestion:</h3>
          {pesanSukses && <p className="text-sm text-green-600 dark:text-green-400 mb-3">{pesanSukses}</p>}
          <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-left space-y-1">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold">Task:</span> {saranDelegasi.tugas}
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-100">
              <span className="font-semibold">Delegate to:</span> <span className="text-brand-utama font-bold">{saranDelegasi.delegasiKe}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              <span className="font-semibold">Reasoning (AI):</span> {saranDelegasi.alasan}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntarmukaDelegasiTugas;