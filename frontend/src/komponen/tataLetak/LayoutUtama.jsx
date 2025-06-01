import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import NavbarAtas from './NavbarAtas.jsx';
import SidebarMenu from './SidebarMenu.jsx';
// eslint-disable-next-line no-unused-vars
import {  motion,AnimatePresence } from 'framer-motion';

const LayoutUtama = () => {
    const lokasi = useLocation();
    return(
        <div className="flex flex-col min-h-screen">
            <NavbarAtas/>
            <div className="flex flex-1 pt-16">
                <SidebarMenu/>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={lokasi.pathname}
                            initial={{opacity:0, y:20}}
                            animate={{opacity: 1, y:0}}
                            exit={{opacity: 0, y:-20}}
                            transition={{duration:0.3, ease:"easeInOut"}}>
                                <Outlet/>
                            </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default LayoutUtama;