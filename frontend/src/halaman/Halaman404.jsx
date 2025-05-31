import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const Halaman404 =()=>{
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center px-4">
            <FiAlertTriangle className="text-yellow-500 text-7xl mb-6 animate-bounce"/>
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-utama mb-4">404</h1>
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-6">Halaman tidak ada!</p>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">Halaman yang kamu cari sudah pindah, ganti nama, atau lagi ngopi dulu. Coba balik ke dashboard aja.</p>
            <Link
                to="/"
                className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105">Balik ke Dashboard</Link>
        </div>
    );
};

export default Halaman404;