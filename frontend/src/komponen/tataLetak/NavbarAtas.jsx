import React from "react";
import { Link } from "react-icons/fi";
import TombolModeGelap from "../umum/TombolModeGelap";
import { SiOpenai } from "react-icons-si"

const NavbarAtas = () =>{
    return(
        <nav className="sticky top-0 z-50 glassmorphic shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-brand-utama dark:text-indigo-400 hover:opacity-80 transition-opacity">
                <SiOpenai size={30}/>
                <span className="hidden sm:inline">AI Productivity Lab</span>
                <span className="sm:hidden">AI Lab</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <TombolModeGelap/>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAtas;