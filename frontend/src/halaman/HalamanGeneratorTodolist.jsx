import React from "react";
import AntarmukaTodoListAI from "../komponen/fitur/GeneratorTodoList/AntarmukaTodoListAI.jsx";

const HalamanGeneratorTodoList = () =>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">AI To-Do Lisst Generator</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Describe your main goal, and the AI will help generate a list of task to achieve it.</p>
            </div>
            <AntarmukaTodoListAI/>
        </div>
    );
};

export default HalamanGeneratorTodoList;