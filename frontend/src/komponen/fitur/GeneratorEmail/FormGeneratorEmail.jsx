import React, {useState, useRef} from "react";
import { FiMail, FiSend, FiLoader, FiAlertCircle, FiCheckCircle, FiClipboard, FiEdit2 } from "react-icons/fi";
import { useModelKu } from "../../../konteks/KonteksModelAi";

const tipeEmailOptions = [
    { value: 'follow_up', label: 'Follow-up'},
    { value: 'sales_pitch', label: 'Sales Pitch'},
    { value: 'thank_you', label: 'Thank You Note'},
    { value: 'inquiry', label: 'Inquiry'},
    { value: 'complaint', label: 'Complaint'},
    { value: 'apology', label: 'Apology'},
    { value: 'custom', label: 'Custom (Describe below)'},
];

const nadaSuaraOptions = [
    { value: 'professional', label: 'Professional'},
    { value: 'friendly', label: 'Friendly'},
    { value: 'formal', label: 'Formal'},
    { value: 'persuasive', label: 'Persuasive'},
    { value: 'direct', label: 'Direct'},
];

const FormGeneratorEmail =() =>{
    const [tipeEmail, setTipeEmail] = useState('follow_up');
    const [nadaSuara, setNadaSuara] = useState('professional');
    const [penerima, setPenerima] = useState('');
    const [poinUtama, setPoinUtama] = useState('');
    const [infoTambahan, setInfoTambahan] = useState('');

    const [hasilEmail, setHasilEmail] = useState({ subjek: '', isi: ''});
    const [lagiGenerate, setLagiGenerate] = useState(false);
    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');
    const [sudahDicopy, setSudahDicopy] = useState(false);
    const [modeEdit, setModeEdit] = useState(false);

    const {modelYangDipake} = useModelKu();
    const hasilTextareaRef = useRef(null);

    const handleGenerateEmail = async()=>{
        if((tipeEmail !== 'custom' && !poinUtama.trim()) || (tipeEmail === 'custom' && !infoTambahan.trim())){
            setPesanError('Please fill in the key points or describe the email content.');
            return;
        }
        setLagiGenerate(true);
        setPesanError('');
        setPesanSukses('');
        setHasilEmail({subjek: '', isi: ''});
        setModeEdit(false);

        console.log(`Generating email: Type=${tipeEmail}, Tone=${nadaSuara}, To=${penerima}, Points=${poinUtama}, Additional=${infoTambahan}, Model=${modelYangDipake}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const subjekDummy = `Subject: ${tipeEmail.replace('_',' ')} - Regarding ${poinUtama.substring(0,20) || infoTambahan.substring(0,20)}... (AI ${modelYangDipake})`;
    const isiDummy = `Dear ${penerima || '[Recipient Name]'},\n\nThis is a professionally crafted ${nadaSuara} email regarding "${poinUtama || infoTambahan}".\n\n[AI Generated Content based on your points - Model: ${modelYangDipake}]\n\n- Point 1: Elaboration on the first key aspect.\n- Point 2: Further details or call to action.\n\nThank you for your time.\n\nSincerely,\n[Your Name/Company]`;
    
    setHasilEmail({ subjek: subjekDummy, isi: isiDummy });
    setPesanSukses(`Email draft generated successfully using ${modelYangDipake} model!`);
    setLagiGenerate(false);
    };
    const handleCopyEmail = () => {
    if (hasilTextareaRef.current) {
      const fullEmailText = `Subject: ${hasilEmail.subjek}\n\n${hasilEmail.isi}`;
      navigator.clipboard.writeText(fullEmailText).then(() => {
        setSudahDicopy(true);
        setTimeout(() => setSudahDicopy(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        setPesanError('Failed to copy email. Please try manual copy.');
      });
    }
};
const handleEditEmail = (field,value)=>{
    setHasilEmail(prev=> ({...prev, [field]: value}));
};
return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Kolom Input */}
      <div className="space-y-5 p-1">
        <div>
          <label htmlFor="emailType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Type:</label>
          <select
            id="emailType"
            value={tipeEmail}
            onChange={(e) => setTipeEmail(e.target.value)}
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          >
            {tipeEmailOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tone of Voice:</label>
          <select
            id="tone"
            value={nadaSuara}
            onChange={(e) => setNadaSuara(e.target.value)}
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          >
            {nadaSuaraOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Recipient (Optional):</label>
          <input
            type="text"
            id="recipient"
            value={penerima}
            onChange={(e) => setPenerima(e.target.value)}
            placeholder="e.g., John Doe or Client Team"
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
        
        {tipeEmail === 'custom' ? (
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Describe the Email Content:</label>
            <textarea
              id="additionalInfo"
              rows="4"
              value={infoTambahan}
              onChange={(e) => setInfoTambahan(e.target.value)}
              placeholder="e.g., Write an email to congratulate a team member on their promotion and highlight their key contributions..."
              className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="keyPoints" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Key Points / Main Message:</label>
            <textarea
              id="keyPoints"
              rows="4"
              value={poinUtama}
              onChange={(e) => setPoinUtama(e.target.value)}
              placeholder="e.g., - Follow up on our meeting last Tuesday regarding Project X.\n- Discuss next steps and timeline.\n- Confirm availability for a quick call next week."
              className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleGenerateEmail}
            disabled={lagiGenerate}
            className="w-full px-6 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center"
          >
            {lagiGenerate ? <FiLoader className="animate-spin mr-2" /> : <FiSend className="mr-2" />}
            Generate Email
          </button>
        </div>
        {pesanError && (
          <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
            <FiAlertCircle /> <span>{pesanError}</span>
          </div>
        )}
      </div>

      {/* Kolom Output */}
      <div className="space-y-4 p-1">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <FiMail className="mr-2"/> Generated Email Draft:
        </h3>
        {lagiGenerate && !hasilEmail.isi && (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <FiLoader className="animate-spin text-4xl text-brand-utama mb-3" />
            <p className="text-slate-600 dark:text-slate-300">AI is drafting your email...</p>
          </div>
        )}

        {!lagiGenerate && !hasilEmail.isi && (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-6">
             <FiMail size={48} className="text-slate-400 dark:text-slate-500 mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-center">Your generated email will appear here once you provide the details and click "Generate Email".</p>
          </div>
        )}

        {pesanSukses && hasilEmail.isi && (
          <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
            <FiCheckCircle /> <span>{pesanSukses}</span>
          </div>
        )}

        {hasilEmail.isi && (
          <div className="bg-white dark:bg-slate-800/70 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-end space-x-2 mb-2">
              <button
                onClick={() => setModeEdit(!modeEdit)}
                title={modeEdit ? "View Mode" : "Edit Mode"}
                className={`p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${modeEdit ? 'bg-indigo-100 dark:bg-indigo-700 text-brand-utama' : 'text-slate-600 dark:text-slate-300'}`}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={handleCopyEmail}
                title="Copy Email"
                className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {sudahDicopy ? <FiCheckCircle className="text-green-500" size={18}/> : <FiClipboard size={18}/>}
              </button>
            </div>
            
            {modeEdit ? (
              <>
                <input 
                  type="text"
                  value={hasilEmail.subjek}
                  onChange={(e) => handleEditEmail('subjek', e.target.value)}
                  className="w-full mb-2 p-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 font-semibold"
                  placeholder="Subject"
                />
                <textarea
                  ref={hasilTextareaRef}
                  value={hasilEmail.isi}
                  onChange={(e) => handleEditEmail('isi', e.target.value)}
                  rows="12"
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 leading-relaxed"
                  placeholder="Email body"
                />
              </>
            ) : (
              <>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Subject: {hasilEmail.subjek}</h4>
                <div 
                  ref={hasilTextareaRef} // Ref tetap di sini untuk copy non-edit mode juga bisa (atau gabung text)
                  className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md"
                  dangerouslySetInnerHTML={{ __html: hasilEmail.isi.replace(/\n/g, '<br />') }} // Jaga line breaks
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
);
};

export default FormGeneratorEmail;
