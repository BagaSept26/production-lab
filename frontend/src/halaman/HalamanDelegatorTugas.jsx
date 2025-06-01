import React from 'react';
import AntarmukaDelegasiTugas from '../komponen/fitur/DelegatorTugas/AntarmukaDelegasiTugas.jsx';

const HalamanDelegatorTugas = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">AI Task Delegator</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Describe the task, list your team members, and (optionally) skills required. AI will suggest who might be best suited for the task.
        </p>
      </div>
      <AntarmukaDelegasiTugas />
    </div>
  );
};
export default HalamanDelegatorTugas;