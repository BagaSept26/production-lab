import React from "react";
import { useTemaKu } from "../../konteks/KonteksTemaGelap";
import { FiSun, FiMoon} from 'react-icons/fi';

const TombolModeGelap=()=>{
    const {tema,gantiTema} = useTemaKu();

    return(
        <button
            onClick={gantiTema}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-utama/50 transition-colors duration-200"
            aria-label="Ganti mode gelap/terang">
                {tema === 'light' ? <FiMoon size={22} className="text-slate-700"/>: <FiSun size={22} className="text-yellow-400"/>}
            </button>
    );
};
export default TombolModeGelap;