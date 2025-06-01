import React, {useState} from "react";
import { FiCalendar, FiClock, FiPlayCircle, FiLoader, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { useModelKu } from "../../../konteks/KonteksModelAi";

const hariDalamMinggu = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AntarmukaPenjadwal = () =>{
    const [tugasUtama, setTugasUtama] = useState('');
    const [deadlinePenting, setDeadlinePenting] = useState('');
    const [preferensiWaktu, setPreferensiWaktu] = useState('');

    const [jadwalMingguan, setJadwalMingguan] = useState(null);
    const [lagiBuatJadwal, setLagiBuatJadwal] = useState(false);
    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');
    const {modelYangDipake} = useModelKu();

    const handleBuatJadwal =async ()=>{
        if(!tugasUtama.trim()){
            setPesanError('Please list your main task for the week.');
            return;
        }

        setLagiBuatJadwal(true);
        setPesanError('');
        setPesanSukses('');
        setJadwalMingguan(null);

        console.log(`Creating weekly schedule: Task="${tugasUtama}",Deadlines="${deadlinePenting}", Prefences="${preferensiWaktu}",Model=${modelYangDipake}`);
        await new Promise(resolve=> setTimeout(resolve, 2000)); //API

        //dummy
        const jadwalDummy = hariDalamMinggu.map(hari=>({
            hari:hari,
            tugas: [
                {id: 1, teks: `Task A for ${hari}(AI${modelYangDipake})`,waktu: "09:00 - 11:00"},
                {id: 2, teks: `Task B related to "${tugasUtama.substring(0,15)}.."`, waktu: "14:00 - 16:00"},...(Math.random()>0.5 ? [{id:3, teks: `Optional Task/Break`, waktu: "Flexible"}]: [])
            ]
        }));

        setJadwalMingguan(jadwalDummy);
        setPesanSukses(`Weekly schedule generated successfully using ${modelYangDipake} model!`);
        setLagiBuatJadwal(false);
    };

    return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="mainTasks" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Tasks for the Week:</label>
          <textarea
            id="mainTasks"
            rows="3"
            value={tugasUtama}
            onChange={(e) => setTugasUtama(e.target.value)}
            placeholder="e.g., Finish Project Alpha report, Prepare presentation for client, Team meeting..."
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="deadlines" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Important Deadlines (Optional):</label>
          <input
            type="text"
            id="deadlines"
            value={deadlinePenting}
            onChange={(e) => setDeadlinePenting(e.target.value)}
            placeholder="e.g., Report due Friday, Presentation on Wednesday"
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="preferences" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time Preferences (Optional):</label>
          <input
            type="text"
            id="preferences"
            value={preferensiWaktu}
            onChange={(e) => setPreferensiWaktu(e.target.value)}
            placeholder="e.g., Morning for deep work, Avoid meetings on Friday"
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleBuatJadwal}
          disabled={lagiBuatJadwal || !tugasUtama.trim()}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {lagiBuatJadwal ? <FiLoader className="animate-spin mr-2" /> : <FiPlayCircle className="mr-2" />}
          Generate Weekly Schedule
        </button>
      </div>
      
      {pesanError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}

      {jadwalMingguan && (
        <div className="mt-6 bg-white dark:bg-slate-800/70 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
            <FiCalendar className="mr-2"/> Your AI Generated Weekly Schedule:
          </h3>
          <div className="space-y-4">
            {jadwalMingguan.map(itemHari => (
              <div key={itemHari.hari} className="p-3 bg-slate-50 dark:bg-slate-700/60 rounded-lg shadow">
                <h4 className="font-semibold text-brand-utama dark:text-indigo-400 mb-2">{itemHari.hari}</h4>
                {itemHari.tugas.length > 0 ? (
                  <ul className="space-y-1 list-disc list-inside pl-2">
                    {itemHari.tugas.map(tgs => (
                      <li key={tgs.id} className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-medium">{tgs.waktu}:</span> {tgs.teks}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">No specific tasks scheduled by AI (or it's a free day!).</p>
                )}
              </div>
            ))}
          </div>
           <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center">
            <FiInfo className="mr-1" /> This is a_simulated schedule. A real AI might consider task dependencies, priorities, and break times more deeply.
          </p>
        </div>
      )}
       {!lagiBuatJadwal && !jadwalMingguan && tugasUtama && (
          <div className="mt-6 flex flex-col items-center justify-center h-40 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-6">
             <FiClock size={38} className="text-slate-400 dark:text-slate-500 mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-center">Click "Generate Weekly Schedule" to see your plan.</p>
          </div>
      )}
    </div>
  );
};

export default AntarmukaPenjadwal;