import React from "react";
import DasborUtamaKu from '../komponen/fitur/DasborUtamaKu.jsx';

const HalamanDasbor = () => {
    console.log("HalamanDasbor dirender");
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Dashboard</h1>
            <DasborUtamaKu/>
        </div>
    );
};

export default HalamanDasbor;