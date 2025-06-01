import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutUtama from "../komponen/tataLetak/LayoutUtama";
import HalamanDasbor from "../halaman/HalamanDasbor";
import HalamanScanDokumen from "../halaman/HalamanScanDokumen";
import HalamanGeneratorPPT from "../halaman/HalamanGeneratorPPT";
import HalamanGeneratorEmail from '../halaman/HalamanGeneratorEmail';
import HalamanAsistenExcelAI from '../halaman/HalamanAsistenExcelAI';
import HalamanPenjadwalanMingguan from '../halaman/HalamanPenjadwalanMingguan';
import HalamanEkstraktorPDFkeExcel from '../halaman/HalamanEkstraktorPDFkeExcel';
import HalamanGeneratorCatatanRapat from '../halaman/HalamanGeneratorCatatanRapat';
import HalamanDelegatorTugas from '../halaman/HalamanDelegatorTugas';
import Halaman404 from "../halaman/Halaman404";


const SemuaRute = () => {
    return (
    <Routes> {/* Routes ini yang ngatur mau nampilin halaman apa berdasarkan URL */}
      <Route path="/" element={<LayoutUtama />}> {/* Semua halaman di bawah ini pake LayoutUtama */}
        <Route index element={<HalamanDasbor />} /> {/* index itu buat halaman utama ("/") */}
        <Route path="scan-document" element={<HalamanScanDokumen />} />
        <Route path="powerpoint-generator" element={<HalamanGeneratorPPT />} />
        <Route path="ai-todo-list" element={<HalamanGeneratorTodoList />} />
        <Route path="email-generator" element={<HalamanGeneratorEmail />} />
        <Route path="ai-excel-assistant" element={<HalamanAsistenExcelAI />} />
        <Route path="scheduler" element={<HalamanPenjadwalMingguan />} />
        <Route path="pdf-to-excel" element={<HalamanEkstraktorPDFkeExcel />} />
        <Route path="meeting-notes" element={<HalamanGeneratorCatatanRapat />} />
        <Route path="task-delegator" element={<HalamanDelegatorTugas />} />
        <Route path="*" element={<Halaman404 />} /> {/* Kalo URL-nya gak ada, tampilkan halaman 404 */}
      </Route>
    </Routes>
  );
};

export default SemuaRute;