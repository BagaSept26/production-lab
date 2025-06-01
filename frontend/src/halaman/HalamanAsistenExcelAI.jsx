import React from "react";
import AntarmukaAsistenExcel from "../komponen/fitur/AsistenExcelAI/AntarMukaAsistenExcel";

const HalamanAsistenExcelAI = ()=>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">AI Excel Asistant</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Get insights from your data without complex formulas. Ask question in plain English or upload an Excel file for analysis.
                </p>
            </div>
            <AntarmukaAsistenExcel/>
        </div>
    );
};

export default HalamanAsistenExcelAI;