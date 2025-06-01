import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LayoutUtama from '../komponen/tataLetak/LayoutUtama.jsx';
import HalamanDasbor from '../halaman/HalamanDasbor.jsx';
import HalamanScanDokumen from '../halaman/HalamanScanDokumen.jsx';
import HalamanGeneratorPPT from '../halaman/HalamanGeneratorPPT.jsx';
import HalamanGeneratorTodoList from '../halaman/HalamanGeneratorTodolist.jsx';
import HalamanGeneratorEmail from '../halaman/HalamanGeneratorEmail.jsx';
import HalamanAsistenExcelAI from '../halaman/HalamanAsistenExcelAI.jsx';
import HalamanPenjadwalMingguan from '../halaman/HalamanPenjadwalMingguan.jsx';
import HalamanEkstraktorPDFkeExcel from '../halaman/HalamanEkstraktorPDFkeExcel.jsx';
import HalamanGeneratorCatatanRapat from '../halaman/HalamanGeneratorCatatanRapat.jsx';
import HalamanDelegatorTugas from '../halaman/HalamanDelegatorTugas.jsx';
import Halaman404 from '../halaman/Halaman404.jsx';



const SemuaRute = () => {
  const lokasiSaatIni = useLocation();
    return (
      <AnimatePresence mode="wait">
        <Routes location={lokasiSaatIni} key={lokasiSaatIni.pathname}> 
          <Route path="/" element={<LayoutUtama />}> 
            <Route index element={<HalamanDasbor />} />
            <Route path="scan-document" element={<HalamanScanDokumen />} />
            <Route path="powerpoint-generator" element={<HalamanGeneratorPPT />} />
            <Route path="ai-todo-list" element={<HalamanGeneratorTodoList />} />
            <Route path="email-generator" element={<HalamanGeneratorEmail />} />
            <Route path="ai-excel-assistant" element={<HalamanAsistenExcelAI />} />
            <Route path="scheduler" element={<HalamanPenjadwalMingguan />} />
            <Route path="pdf-to-excel" element={<HalamanEkstraktorPDFkeExcel />} />
            <Route path="meeting-notes" element={<HalamanGeneratorCatatanRapat />} />
            <Route path="task-delegator" element={<HalamanDelegatorTugas />} />
            <Route path="*" element={<Halaman404 />} />
          </Route>
        </Routes>
    </AnimatePresence>
  );
};

export default SemuaRute;