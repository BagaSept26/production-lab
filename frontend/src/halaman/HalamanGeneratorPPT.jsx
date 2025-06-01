import React from "react";
import FormBikinPPT from "../komponen/fitur/BikinPPT otomatis/FormBikinPPT.jsx";

const HalamanGeneratorPPT=()=>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Auto PowerPoint Generator</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Provide a topic or outline, and let AI create a draft PowerPoint presentation for you.</p>
            </div>
            <FormBikinPPT/>
        </div>
    );
};

export default HalamanGeneratorPPT;