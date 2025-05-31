import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import { FiGrid,FiFileText, FiUser,FiEdit3,FiChevronLeft, FiMenu, FiClipboard, FiMail, FiBarChart2, FiCalendar, FiFilePlus, FiChevronsLeft } from "react-icons/fi";

const daftarLinkMenu = [
    {nama: 'Dashboard', path:'/', ikon:<FiGrid size={20}/>},
    {nama: 'Scan Document', path:'/scan-document', ikon:<FiFileText size={20}/>},
    {nama: 'PPT Generator', path:'/powerpoint-generator', ikon:<FiEdit3 size={20}/>},
    {nama: 'Todo List AI', path:'/ai-todo-list', ikon: <FiClipboard size={20}/>},
    {nama: 'Email Generator', path:'/email-generator', ikon:<FiMail size={20}/>},
    {nama: 'Excel Assistant', path:'/ai-excel-assistant', ikon:<FiBarChart2 size={20}/>},
    {nama: 'Weekly Scheduler', path:'/scheduler', ikon:<FiCalendar size={20}/>},
    {nama: 'PDF to Excel', path:'/pdf-to-excel', ikon:<FiFilePlus size={20}/>},
    {nama: 'Meeting Notes', path:'/meeting-notes',ikon:<FiEdit3 size={20}/>},
    {nama: 'Task Delegator', path: '/task-delegator', ikon:<FiUser size={20}/>},
];

const SidebarMenu = ()=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = ()=> setIsSidebarOpen(!isSidebarOpen);
    return(
        <>
        <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white dark:bg-slate-700 rounded-md shadow-md"
            aria-label="Toggle sidebar">
                {isSidebarOpen ? <FiChevronsLeft size={20}/> : <FiMenu size={20}/>}
            </button>
            <aside
                className={`
                    fixed lg:sticky top-0 lg:top-16 z-40 lg:z-30 h-screen lg:h-[calc(100vh-4rem)]
                    overflow-y-auto overflow-x-hidden p-4 bg-white dark:bg-slate-800 shadow-xl lg:shadow-md transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}>
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:flex absolute top-2 right-2 p-1 text-slate-500 hover:text-brand-utama"
                            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}>
                                <FiChevronsLeft size={24} className={`transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}/>
                            </button>
                            <nav className={`mt-10 lg:mt-4 ${isSidebarOpen ? '' : 'lg:flex lg:flex-col lg:items-center'}`}>
                                <ul>
                                    {daftarLinkMenu.map((link) => (
                                        <li key={link.nama} className="mb-2">
                                            <NavLink
                                                to={link.path}
                                                onClick={()=>{if (window.innerWidth < 1024) setIsSidebarOpen(false);}}
                                                className={({isActive})=>
                                                `flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 group
                                                ${isSidebarOpen ? '' : 'lg:justify-center'}
                                                ${isActive ? 'bg-brand-utama text-white font-semibold shadow-md dark:bg-indigo-600'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-slate-700 hover:text-brand-utama dark:hover:text-indigo-300'
                                                }`
                                            }
                                            title={link.nama}>
                                                <span className={`${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:absolute lg:w-0'} transition-opacity duration-200`}>{link.nama}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                    </aside>
                    {isSidebarOpen && <div onClick={toggleSidebar} className="lg:hidden fixed inset-0 bg-black/30 z-30"></div>}
        </>
    );
};

export default SidebarMenu;