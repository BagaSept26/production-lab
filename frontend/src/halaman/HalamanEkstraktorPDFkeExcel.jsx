import React from "react";
import FormEkstraktorPDFExcel from "../komponen/fitur/EkstraktorPDFkeExcel/FormEkstraktorPDFExcel";

const HalamanEkstraktorPDFkeExcel =()=>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">PDF to Excel Extractor</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Upload a PDF file containing tables, and the AI will attempt to extract the data into an Excel-ready format.
                </p>
            </div>
            <FormEkstraktorPDFExcel/>
        </div>
    );
};

export default HalamanEkstraktorPDFkeExcel;