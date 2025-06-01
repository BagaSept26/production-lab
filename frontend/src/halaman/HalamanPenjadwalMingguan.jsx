import React from "react";
import AntarmukaPenjadwal from "../komponen/fitur/PenjadwalMingguan/AntarmukaPenjadwal";

const HalamanPenjadwalMingguan = () =>{
    return(
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Plan your week effectively. Input your main tasks, deadlines, and prefences, and let AO suggest a schedule.
                </p>
            </div>
            <AntarmukaPenjadwal/>
        </div>
    );
};

export default HalamanPenjadwalMingguan;