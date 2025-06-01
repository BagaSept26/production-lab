import React from "react";
import FormGeneratorEmail from "../komponen/fitur/GeneratorEmail/FormGeneratorEmail";

const HalamanGeneratorEmail = () =>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">AI Email Generator</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Craft Professional or bussiness emails quickly. just selecet the type, done, and provide key points.</p>
            </div>
            <FormGeneratorEmail/>
        </div>
    );
};

export default HalamanGeneratorEmail;