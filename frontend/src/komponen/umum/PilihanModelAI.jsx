import React from "react";
import { useModelKu } from "../../konteks/KonteksModelAi";
import { FiCpu, FiZap, FiLoader } from "react-icons/fi";

const PilihanModelAi = () =>{
    const{
        modelYangDipake,
        modelGedeAktif,
        lagiLoadingStatus,
        pilihModelKecil,
        pilihModelGede,
        gantiStatusModelGedeBuatDemo
    } = useModelKu();

    return(
        <div className="p-4 mb-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 glassmorphic">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Select AI Model</h3>
            {lagiLoadingStatus ? (
                <div className="flex items-center justify-center py-4">
                    <FiLoader size={24} className="animate-spin mr-2 text-brand-utama"/>
                    <p className="text-sm text-slate-600 dark:text=slate-400">Checking large model status... </p>
                </div>
            ) : (
                <>
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <button
                        onClick={pilihModelKecil}
                        disabled={modelYangDipake === 'kecil'}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                            ${modelYangDipake === 'kecil'
                                ? 'bg-brand-utama text-white border-brand-utama cursor-not-allowed ring-brand-utama'
                                : 'bg-white dark:bg-slate-700 text-brand-utama dark:text-indigo-300 border-indigo-300 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-600 ring-indigo-300'
                            }`}>
                                <FiCpu size={18}/>
                                <span>Use Small Model (Fast, Always On)</span>
                            </button>
                            <button
                                onClick={pilihModelGede}
                                disabled={!modelGedeAktif || modelYangDipake === 'besar'}
                                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                                    ${!modelGedeAktif
                                        ? 'bg-slate=300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 cursor-not-allowed ring-slate-300'
                                        : modelYangDipake === 'besar'
                                        ? 'bg-brand-kedua text-white border-brand-kedua cursor-not-allowed ring-brand-kedua'
                                        : 'bg-white darl:bg-slate-700 text-brand-kedua dark:text-emerald-300 border-emerald-300 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-600 ring-emerald-300'
                                    }`}>
                                        <FiZap size={18}/>
                                        <span>Use Large Model {modelGedeAktif ? '(Active)' : '(Inactive)'}</span>
                                    </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    Currently using: <span className="font-semibold">{modelYangDipake === 'kecil' ? 'Small Model' : 'Large Model'}</span>
                    Large Model Status: {modelGedeAktif ? 
                    <span className="text-green-500 font-semibold">Active</span> :
                    <span className="text-red-500 font-semibold">Inactive</span>}.
                </p>
                </>
            )}
            <button
                onClick={gantiStatusModelGedeBuatDemo}
                className="mt-3 text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300">
                    (Demo) Toggle Large Model Status
                </button>
        </div>
    );
};

export default PilihanModelAi;