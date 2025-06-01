import React from "react";
import FormScanDokumen from "../komponen/fitur/ScanDokumen/FormScanDokumen.jsx";

const HalamanScanDokumen = ()=>{
    /*const judulHalamanIni = "Scan Dokumen jadi Excel";*/
    return(
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Scan Dokument to Excel</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-4">This is where you'll upload your documents (image or PDFs) to automaticly extract data into an Excel file. The AI will try to understand the document type adn pull out the relevant info.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">(Feature under construction, UI Elemants will appear here soon!)</p>
            <FormScanDokumen/>
        </div>
    );
};

export default HalamanScanDokumen;