import React, { useState, useCallback } from "react";
import { useDropzone, } from 'react-dropzone';
import { FileUploadCloud, FiFileText, FiLoader, FiCheckCircle, FiAlertCircle, FiDownload } from '../../../konteks/KonteksModelAi';
import { useModelKu } from '../../../servis/panggilanApi';
import { apiScanDokumen } from '../../../servis/panggilanApi';

const FormScanDokumen = () => {
    const [fileDipilih, setFileDipilih] = useState(null);
    const [pratinjauFile, setPratinjauFile] = useState(null);
    const [hasilEkstraksi, setHasilEkstraksi] = useState(null);
    const [lagiMemproses, setLagiMemproses] = useState(null);
    const [pesanError, setPesanError] = useState('');
    const [pesanSukses, setPesanSukses] = useState('');
    //model aktif
    const { modelYangDipake } = useModelKu();
    //file di drop/dipilih
    const onDrop = useCallback(acceptedFiles =>{
        setPesanError('');
        setPesanSukses('');
        setHasilEkstraksi(null);
        const file = acceptedFiles[0];
        //cekfile
        if (file){
            if (file.type.startsWith('image/') || file.type === 'application/pdf'){
                setFileDipilih(file);
                if(file.type.startsWith('image/')){
                    const reader = new FileReader();
                    reader.onloaded = () => {
                        setPratinjauFile(reader.result);
                    };
                    reader.readAsDataURL(file);
                } else{
                    setPratinjauFile(null);
                }
            } else {
                setPesanError('Oops! Please upload an image (JPG, PNG) or PDF file.');
                setFileDipilih(null);
                setPratinjauFile(null);
            }
        }
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, accept: {
        'image/jpeg': [],
        'image/png': [],
        'application/pdf': []
    },
    multiple: false
});
const handleProsesScan = async ()=>{
    if(!fileDipilih){
        setPesanError('Please select a file first.');
        return;
    }
    setLagiMemproses(true);
    setPesanError('');
    setPesanSukses('');
    setHasilEkstraksi(null);
    //api
    try{
        const respons = await apiScanDokumen(fileDipilih, modelYangDipake);
        await new Promise(resolve=> setTimeout(resolve,1500));
        if(respons.sukses){
            //dummy
            const dataDummyExcel = [
                { 'Header 1': `Data A1 from ${fileDipilih.name}`, 'Header 2': 'Data B1', 'Sumber': respons.sumberModel},
                { 'Header 1': 'Data A1', 'Header 2': 'Data B2', 'Sumber': respons.sumberModel},
                { 'Header 1': respons.dataHasil, 'Header 2': 'More data...', 'Sumber': respons.sumberModel},
            ];
            setHasilEkstraksi(dataDummyExcel);
            setPesanSukses(`Successfully extracted data using ${modelYangDipake} model! (Simulated)`);
        } else {
            setPesanError(respons.pesanError || 'Failed to process the document.');
        }
    } catch(error) {
        console.error("Error Scanning document:", error);
        setPesanError('An unexpected error occurred. Please try again.');
    } finally{
        setLagiMemproses(false);
    }
};
//dummy download excel
const handleDownloadExcel = () =>{
    if(!hasilEkstraksi) return;
    setPesanSukses('Download started (simulated)! In a real app, this would generate and download an Excel file.');
    console.log("Simulating Excel download with data:". hasilEkstraksi);
};
  return (
    <div className="space-y-6">
      {/* Area Upload */}
      <div 
        {...getRootProps()} 
        className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
                    ${isDragActive ? 'border-brand-utama bg-indigo-50 dark:bg-slate-700' : 'border-slate-300 dark:border-slate-600 hover:border-brand-utama/70'}`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-4xl text-brand-utama mb-3" />
        {isDragActive ? (
          <p className="text-slate-700 dark:text-slate-200">Drop the file here ...</p>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">Drag 'n' drop a document (image/PDF) here, or click to select file</p>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Max file size: 5MB. Supported: JPG, PNG, PDF.</p>
      </div>

      {/* Info File & Pratinjau */}
      {fileDipilih && (
        <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center space-x-4">
          {pratinjauFile ? (
            <img src={pratinjauFile} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
          ) : (
            <FiFileText className="text-4xl text-slate-500" />
          )}
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{fileDipilih.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {(fileDipilih.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button 
            onClick={() => { setFileDipilih(null); setPratinjauFile(null); setHasilEkstraksi(null); setPesanError(''); setPesanSukses(''); }}
            className="ml-auto text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="text-center">
        <button
          onClick={handleProsesScan}
          disabled={!fileDipilih || lagiMemproses}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {lagiMemproses ? (
            <>
              <FiLoader className="animate-spin mr-2" /> Processing...
            </>
          ) : (
            'Scan Document'
          )}
        </button>
      </div>

      {/* Pesan Status */}
      {pesanError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && !hasilEkstraksi && ( // Hanya tampilkan pesan sukses umum jika belum ada hasil tabel
         <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}


      {/* Area Hasil Ekstraksi */}
      {hasilEkstraksi && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Extracted Data (Simulated Excel Output)</h3>
          {pesanSukses && ( // Tampilkan pesan sukses di atas tabel hasil
            <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-md flex items-center space-x-2">
              <FiCheckCircle /> <span>{pesanSukses}</span>
            </div>
          )}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  {Object.keys(hasilEkstraksi[0]).map((header) => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {hasilEkstraksi.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleDownloadExcel}
            className="px-6 py-2 bg-brand-kedua text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <FiDownload />
            <span>Download Excel (Simulated)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FormScanDokumen;