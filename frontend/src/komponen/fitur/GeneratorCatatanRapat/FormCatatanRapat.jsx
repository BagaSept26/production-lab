import React, { useState } from 'react';
import { FiMic, FiFileText, FiPlay, FiLoader, FiAlertCircle, FiCheckCircle, FiEdit2, FiCopy } from 'react-icons/fi';
import { useModelKu } from '../../../konteks/KonteksModelAi';

const FormCatatanRapat = () => {
  const [transkripRapat, setTranskripRapat] = useState('');
  const [durasiRapat, setDurasiRapat] = useState(''); // Opsional, misal "60 minutes"
  
  const [catatanHasil, setCatatanHasil] = useState(null); // { ringkasan, actionItems, keputusan }
  const [lagiMembuatCatatan, setLagiMembuatCatatan] = useState(false);
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');
  const [sudahCopy, setSudahCopy] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const { modelYangDipake } = useModelKu();

  const handleBuatCatatan = async () => {
    if (!transkripRapat.trim()) {
      setPesanError('Please provide the meeting transcript or key discussion points.');
      return;
    }
    setLagiMembuatCatatan(true);
    setPesanError('');
    setPesanSukses('');
    setCatatanHasil(null);
    setModeEdit(false);

    console.log(`Generating meeting notes: Transcript (length ${transkripRapat.length}), Duration="${durasiRapat}", Model=${modelYangDipake}`);
    await new Promise(resolve => setTimeout(resolve, 2300)); // Simulasi API

    // Hasil dummy catatan rapat
    const catatanDummy = {
      ringkasan: `AI (${modelYangDipake}) Summary: The meeting discussed ${transkripRapat.substring(0,30)}... Key topics included A, B, and C. Overall positive sentiment. Duration approximation: ${durasiRapat || 'Not specified'}.`,
      actionItems: [
        { id: 1, teks: `[AI] Follow up on Topic A`, pic: "John Doe (AI Assigned)" },
        { id: 2, teks: `[AI] Prepare report for Topic B`, pic: "Jane Smith (AI Assigned)" },
      ],
      keputusan: `[AI] It was decided to proceed with Option 1 for Project Alpha. Further discussion on budget needed next week.`,
    };
    
    setCatatanHasil(catatanDummy);
    setPesanSukses(`Meeting notes generated successfully using ${modelYangDipake} model!`);
    setLagiMembuatCatatan(false);
  };
  
  const handleCopyNotes = () => {
    if (catatanHasil) {
      const textToCopy = `Meeting Summary:\n${catatanHasil.ringkasan}\n\nAction Items:\n${catatanHasil.actionItems.map(item => `- ${item.teks} (PIC: ${item.pic})`).join('\n')}\n\nKey Decisions:\n${catatanHasil.keputusan}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setSudahCopy(true);
        setTimeout(() => setSudahCopy(false), 2000);
      }).catch(err => console.error('Copy failed: ', err));
    }
  };
  
  const handleEditField = (field, value, index = null, subField = null) => {
    setCatatanHasil(prev => {
      if (field === 'actionItems' && index !== null && subField) {
        const newActionItems = [...prev.actionItems];
        newActionItems[index] = { ...newActionItems[index], [subField]: value };
        return { ...prev, actionItems: newActionItems };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="meetingTranscript" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Paste Meeting Transcript or Key Discussion Points:
        </label>
        <textarea
          id="meetingTranscript"
          rows="10"
          value={transkripRapat}
          onChange={(e) => setTranskripRapat(e.target.value)}
          placeholder="e.g., John: Welcome everyone. Today we'll discuss Project Phoenix status...\nJane: I have an update on the user testing phase..."
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
        />
      </div>
      <div>
        <label htmlFor="meetingDuration" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Meeting Duration (Optional):
        </label>
        <input
          type="text"
          id="meetingDuration"
          value={durasiRapat}
          onChange={(e) => setDurasiRapat(e.target.value)}
          placeholder="e.g., 60 minutes, 1.5 hours"
          className="w-full md:w-1/2 p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleBuatCatatan}
          disabled={lagiMembuatCatatan || !transkripRapat.trim()}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {lagiMembuatCatatan ? <FiLoader className="animate-spin mr-2" /> : <FiPlay className="mr-2" />}
          Generate Meeting Notes
        </button>
      </div>
      
      {pesanError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && !catatanHasil && (
         <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}

      {catatanHasil && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">AI Generated Meeting Notes:</h3>
            <div className="flex space-x-2">
                <button onClick={() => setModeEdit(!modeEdit)} title={modeEdit ? "View Mode" : "Edit Mode"} className={`p-2 rounded-md ${modeEdit ? 'bg-indigo-100 text-brand-utama' : 'text-slate-500 hover:bg-slate-100'}`}><FiEdit2 size={18}/></button>
                <button onClick={handleCopyNotes} title="Copy Notes" className="p-2 rounded-md text-slate-500 hover:bg-slate-100">{sudahCopy ? <FiCheckCircle className="text-green-500" size={18}/> : <FiCopy size={18}/>}</button>
            </div>
          </div>
          {pesanSukses && <div className="mb-3 p-2 bg-green-50 dark:bg-green-900/20 text-sm text-green-700 dark:text-green-300 rounded flex items-center"><FiCheckCircle className="mr-1.5"/> {pesanSukses}</div>}

          {modeEdit ? (
            <div className="space-y-3">
                <div>
                    <label className="text-sm font-medium">Summary:</label>
                    <textarea value={catatanHasil.ringkasan} onChange={e => handleEditField('ringkasan', e.target.value)} rows="4" className="w-full p-2 mt-1 border rounded-md dark:bg-slate-700 dark:border-slate-600"/>
                </div>
                <div>
                    <label className="text-sm font-medium">Action Items:</label>
                    {catatanHasil.actionItems.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mt-1">
                            <input type="text" value={item.teks} onChange={e => handleEditField('actionItems', e.target.value, index, 'teks')} className="flex-grow p-1.5 border rounded-md dark:bg-slate-700 dark:border-slate-600" placeholder="Action item description"/>
                            <input type="text" value={item.pic} onChange={e => handleEditField('actionItems', e.target.value, index, 'pic')} className="w-1/3 p-1.5 border rounded-md dark:bg-slate-700 dark:border-slate-600" placeholder="PIC"/>
                        </div>
                    ))}
                </div>
                <div>
                    <label className="text-sm font-medium">Key Decisions:</label>
                    <textarea value={catatanHasil.keputusan} onChange={e => handleEditField('keputusan', e.target.value)} rows="3" className="w-full p-2 mt-1 border rounded-md dark:bg-slate-700 dark:border-slate-600"/>
                </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Summary:</h4>
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{catatanHasil.ringkasan}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Action Items:</h4>
                <ul className="list-disc list-inside pl-1 text-slate-600 dark:text-slate-400">
                  {catatanHasil.actionItems.map(item => (
                    <li key={item.id}>{item.teks} <span className="text-xs text-slate-500">(PIC: {item.pic})</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Key Decisions:</h4>
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{catatanHasil.keputusan}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormCatatanRapat;