import React, {useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone';
import { FiFilePlus, FiUploadCloud, FiLoader, FiCheckCircle, FiAlertCircle, FiDownload, FiTable } from "react-icons/fi";
import { useModelKu } from "../../../konteks/KonteksModelAi";

const FormEkstraktorPDFExcel =()=>{
    const [filePDFDipilih, setFilePDFDipilih] = useState(null);
    const [hasilTabel, setHasilTabel] = useState(null);
    const [lagiMengekstrak, setLagiMengekstrak] = useState(false);
    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');
    const {modelYandDipake} = useModelKu();

    const onDrop = useCallback(acceptedFiles => {
        setPesanError('');
        setPesanSukses('');
        setHasilTabel(null);
        const file = acceptedFiles[0];
        if(file && file.type === 'application/pdf'){
            setFilePDFDipilih(file);
        } else{
            setPesanError('Please upload a valid PDF file.');
            setFilePDFDipilih(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, accept: {'application/pdf': ['.pdf']},multiple: false});
    
    const handleEkstrakData = async()=>{
        if(!filePDFDipilih){
            setPesanError('Please select a PDF file first.');
            return;
        }
        setLagiMengekstrak(true);
        setPesanError('');
        setPesanSukses('');
        setHasilTabel(null);

        console.log(`Extracting data from PDF: ${filePDFDipilih.name} using ${modelYandDipake} model.`);
        await new Promise(resolve => setTimeout(resolve,2200)); //API

        //dummy
        const tableDummy = [
            {'Kolom A': `Nilai 1 dari ${modelYandDipake}`, 'Kolom B': 123.45, 'Kolom C': 'Data X'},
            {'Kolom A': 'Nilai 2', 'Kolom B': 678.90, 'Kolom C': `Data Y (file: ${filePDFDipilih.name.substring(0,10)}..)`},
            {'Kolom A': 'Nilai 3', 'Kolom B': 101.12, 'Kolom C': 'Data Z'},
        ];
        setHasilTabel(tableDummy);
        setPesanSukses(`Data extracted successfully from PDF using ${modelYandDipake} model! (Simulated)`);
        setLagiMengekstrak(false);
    };

    const handleDownloadHasil =()=>{
        if(!hasilTabel) return;
        setPesanSukses('Excel download started (simulated)!');
        console.log("Simulated Excel download for PDF extraction:",hasilTabel);
    };

    return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
                    ${isDragActive ? 'border-brand-utama bg-indigo-50 dark:bg-slate-700' : 'border-slate-300 dark:border-slate-600 hover:border-brand-utama/70'}`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-4xl text-brand-utama mb-3" />
        {isDragActive ? (
          <p className="text-slate-700 dark:text-slate-200">Drop the PDF file here ...</p>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">Drag 'n' drop a PDF file here, or click to select</p>
        )}
      </div>

      {filePDFDipilih && (
        <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center space-x-3">
          <FiFilePlus className="text-3xl text-red-500" />
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{filePDFDipilih.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {(filePDFDipilih.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button 
            onClick={() => { setFilePDFDipilih(null); setHasilTabel(null); setPesanError(''); setPesanSukses(''); }}
            className="ml-auto text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleEkstrakData}
          disabled={!filePDFDipilih || lagiMengekstrak}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {lagiMengekstrak ? <FiLoader className="animate-spin mr-2" /> : <FiTable className="mr-2" />}
          Extract Table Data
        </button>
      </div>

      {pesanError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && !hasilTabel && (
         <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}

      {hasilTabel && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Extracted Table Data:</h3>
           {pesanSukses && (
            <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-md flex items-center space-x-2">
              <FiCheckCircle /> <span>{pesanSukses}</span>
            </div>
          )}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  {Object.keys(hasilTabel[0]).map(header => (
                    <th key={header} scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {hasilTabel.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleDownloadHasil}
            className="px-6 py-2 bg-brand-kedua text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <FiDownload />
            <span>Download as Excel (Simulated)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormEkstraktorPDFExcel;