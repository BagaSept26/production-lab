import React from 'react';
import FormCatatanRapat from '../komponen/fitur/GeneratorCatatanRapat/FormCatatanRapat';

const HalamanGeneratorCatatanRapat = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">AI Meeting Notes Generator</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Paste your meeting transcript or key discussion points, and let AI generate a summary, action items, and key decisions.
        </p>
      </div>
      <FormCatatanRapat />
    </div>
  );
};
export default HalamanGeneratorCatatanRapat;