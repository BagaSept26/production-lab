import React from "react";
import { Link } from 'react-router-dom';

import { FiArrowRightCircle } from 'react-icons/fi';

const KartuFitur = ({ judul, deskripsi, ikon, linkKe, warnaBgGradient }) => {
    const varianKartu = {
        sembunyi: { opacity: 0, y: 30, scale: 0.95 },
        tampil: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {type: "spring", stiffness: 100, damping:12 }
        }
    };

    return(
        <motion.div
            variants={varianKartu}
            className={`rounded-2xl shadow-xl overflow-hidden glassmorphic h-full flex flex-col group`}>
            <div className={`p-6 flex-grow flex flex-col justify-between ${warnaBgGradient || 'bg-gradient-to-br from-indigo-500 via-puple-500 to-pink-500'}`}>
                <div>
                <div className="text-white/80 mb-4 text-xl">
                {ikon || <div className="w-10 h-10 bg-white/20 rounded-lg animate-pulse"/>}
                </div>   
                <h3 className="text-xl lg:text-indigo-100/90 line-clamp-3 leading-relaxed">{judul}</h3>
                <p className="text-sm text-indigo-100/90 line-clamp-3 leading-relaxed">{deskripsi}</p>
                </div>
                <Link
                    to={linkKe}
                    className="mt-6 inline-flex items-center justify-center space-x-2 bg-white/25 hover:bg-white/40 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 ease-out text-center group-hover:shadow-lg group-hover:scale-105 transform">
                        <span>Open Tool</span>
                        <FiArrowRightCircle className="group-hover:translate-x-1 transition-transform duration-200" size={20}/>
                    </Link>
            </div>
            </motion.div>
    );
};

export default KartuFitur;