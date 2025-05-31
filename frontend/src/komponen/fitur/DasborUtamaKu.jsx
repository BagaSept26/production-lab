import React from "react";
import KartuFitur from "../umum/KartuFitur";
import PilihanModelAi from '../umum/PilihanModelAI';
import { circOut, motion } from 'framer-motion';
import { FiFileText, FiClipboard, FiMail, FiBarChart2, FiCalendar, FiFilePlus, FiUser, FiEdit3, FiZap } from "react-icons/fi";

const semuaFiturKita = [
    {judul: 'Scan Document', deskripsi: 'Automatically extract data from various document types (KTP, Invoice, etc.) directly into Excel.', ikon: <FiFileText />, linkKe: '/scan-document', warnaBgGradient: 'bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500'},
    {judul: 'PowerPoint', deskripsi: 'Generate engaging PowerPoint presentations from your text input or outlines efforlessly.',ikon: <FiEdit3/>, linkKe:'/powerpoint-generator', warnaBgGradient:'bg-gradient-to-br from-ambel-500 via-orange-500 to-red-500'},
    {judul: 'AI Todo List', deskripsi: 'Let AI help you create, prioritize, and menage yor to-do lists intelligently.', ikon:<FiClipboard/>, linkKe:'/ai-todo-list', warnaBgGradient: 'bg-gradient-to-br from-lime-500 via-green-500 to-emerald-500'},
    {judul: 'Email Generator', deskripsi: 'Craft professional and effective business emails for any situation in seconds.', ikon:<FiMail/>, linkKe:'/email-generator', warnaBgGradient: 'bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500'},
    {judul: 'AI Excel Assistant', deskripsi: 'Analyze data, generate insights, and perform Excel tasks without complex formulas.', ikon:<FiBarChart2/>,linkKe:'/ai-excel-assistant', warnaBgGradient: 'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500'},
    {judul: 'Weekly Scheduler', deskripsi:'Plan your week efficiently with an AI-powered scheduler that understands your priorities.', ikon:<FiCalendar/>,linkKe: '/scheduler', warnaBgGradient: 'bg-gradient-to-br from-teal-500 via-cyan-600 to-sky-700'},
    { judul: 'PDF to Excel', deskripsi: 'Extract tabular data from PDF files and convert it into editable Excel spreadsheets.', ikon: <FiFilePlus />, linkKe: '/pdf-to-excel', warnaBgGradient: 'bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-700' },
  { judul: 'Meeting Notes Gen', deskripsi: 'Automatically generate concise meeting summaries, action items, and key decisions.', ikon: <FiEdit3 />, linkKe: '/meeting-notes', warnaBgGradient: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700' },
  { judul: 'Task Delegator', deskripsi: 'AI assistant to help you assign and delegate tasks effectively within your team.', ikon: <FiUsers />, linkKe: '/task-delegator', warnaBgGradient: 'bg-gradient-to-br from-slate-600 via-gray-600 to-neutral-700' },
];

const varianKontainer ={
    sembunyi: { opacity: 0 },
    tampil: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

const DasborUtamaKu = () =>{
    return(
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y:-30, scale: 0.9}}
                animate={{opacity:1,ease:circOut, delay:0.1}}
                className="mb-8 p-6 rounded-xl shadow-2xl bg-gradient-to-tr from-brand-utama via-indigo-500 to-purple-600 text-white text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                        <FiZap size={48} className="mb-4 sm:mb-0 text-yellow-300 animate-pulse"/>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">Welcome to Your AI Productivity Hub!</h1>
                            <p className="text-lg text-indigo-100/90">
                            All your AI-powered office tools i one placae. Boost your efficiency and get things done smarter.</p>
                        </div>
                    </div>
                </motion.div>
                <PilihanModelAi/>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={varianKontainer}
                    initial="sembunyi"
                    animate="tampil">
                        {semuaFiturKita.map((fitur, index) => (
                            <KartuFitur
                                key={index}
                                judul={fitur.judul}
                                deskripsi={fitur.deskripsi}
                                ikon={fitur.ikon}
                                linkKe={fitur.linkKe}
                                warnaBgGradient={fitur.warnaBgGradient}/>
                        ))}
                    </motion.div>
        </div>
    );
};

export default DasborUtamaKu