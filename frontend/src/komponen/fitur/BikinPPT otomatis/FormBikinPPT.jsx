import React, { useState } from "react";
import { FiEdit3, FiLoader, FiDownload, FiAlertCircle, FiCheckCircle, FiZap } from 'react-icons/fi';
import { useModelKu } from "../../../konteks/KonteksModelAi.jsx";
//import { apiBikinPPT } from '../../../servis/panggilanApi;

const FormBikinPPT = () =>{
    const [inputText, setInputText] = useState('');
    const [jumlahSlide, setJumlahSlide] = useState(5);
    const [hasilPPT, setHasilPPT] = useState(null);
    const [lagiBikin, setLagiBikin] = useState(false);
    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');
    const { modelYangDipake } = useModelKu();

    const handleGeneratePPT = async()=>{
        if(!inputText.trim()){
            setPesanError('Please provide some text or an outline for your presentation.');
            return;
        }
        setLagiBikin(true);
        setPesanError('');
        setPesanSukses('');
        setHasilPPT(null);

        console.log(`Generating PPT with ${modelYangDipake} model, input: "${inputText}", slides: ${jumlahSlide}`);
        //panggil API
        await new Promise(resolve => setTimeout(resolve,2500));

        //dummy
        const linkDummyPPT = `https://dummy-ppt-link.com/presentation-${Date.now()}.pptx`;
        setHasilPPT({
            link: linkDummyPPT,
            message: `PowerPoint presentation generated succcessfully using ${modelYangDipake} model! (Simulated ${jumlahSlide} slides)`,
        });
        setPesanSukses(`PPT generation initiated with ${modelYangDipake} model!`);
        setLagiBikin(false);
    };

    return (
    <div className="space-y-6">
      <div>
        <label htmlFor="pptInput" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Enter your topic, outline, or main content for the presentation:
        </label>
        <textarea
          id="pptInput"
          rows="8"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          placeholder="e.g., Quarterly Business Review, AI in Healthcare, My Awesome Vacation..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="jumlahSlide" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Number of Slides (approximate):
        </label>
        <input
          type="number"
          id="jumlahSlide"
          min="3"
          max="20"
          value={jumlahSlide}
          onChange={(e) => setJumlahSlide(parseInt(e.target.value))}
          className="w-32 p-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleGeneratePPT}
          disabled={lagiBikin || !inputText.trim()}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {lagiBikin ? (
            <>
              <FiLoader className="animate-spin mr-2" /> Generating Presentation...
            </>
          ) : (
            <>
              <FiEdit3 className="mr-2" /> Generate PowerPoint
            </>
          )}
        </button>
      </div>
      
      {pesanError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {/* Tampilkan pesanSukses hanya jika belum ada hasilPPT untuk menghindari duplikasi pesan */}
      {pesanSukses && !hasilPPT && ( 
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300 rounded-lg flex items-center space-x-2">
          <FiZap /> <span>{pesanSukses}</span>
        </div>
      )}

      {hasilPPT && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-slate-700 rounded-xl shadow-lg text-center">
          <FiCheckCircle className="text-5xl text-green-500 dark:text-green-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Presentation Ready!</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{hasilPPT.message}</p>
          <a
            href={hasilPPT.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-kedua text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <FiDownload className="mr-2" /> Download Presentation (Simulated)
          </a>
        </div>
      )}
    </div>
  );
};

export default FormBikinPPT;