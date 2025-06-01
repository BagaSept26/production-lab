import React, {useState, useCallback} from "react";
import { useDropzone } from 'react-dropzone';
import { FiBarChart2, FiUpload, FiType, FiLoader, FiAlertCircle, FiCheckCircle, FiFileText, FiTable } from "react-icons/fi";
import { useModelKu } from "../../../konteks/KonteksModelAi";

const AntarmukaAsistenExcel = () => {
  const [modeInput, setModeInput] = useState('text'); // 'text' atau 'file'
  const [perintahTeks, setPerintahTeks] = useState('');
  const [fileExcelDipilih, setFileExcelDipilih] = useState(null);
  
  const [hasilAnalisis, setHasilAnalisis] = useState(null); // Bisa teks atau struktur tabel
  const [lagiMemproses, setLagiMemproses] = useState(false);
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');
  const { modelYangDipake } = useModelKu();

  const onDrop = useCallback(acceptedFiles => {
    setPesanError('');
    setPesanSukses('');
    setHasilAnalisis(null);
    const file = acceptedFiles[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setFileExcelDipilih(file);
    } else {
      setPesanError('Please upload a valid Excel file (.xlsx, .xls).');
      setFileExcelDipilih(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    disabled: modeInput !== 'file'
  });

  const handleProsesPerintah = async () => {
    if (modeInput === 'text' && !perintahTeks.trim()) {
      setPesanError('Please enter your command or question about data.');
      return;
    }
    if (modeInput === 'file' && !fileExcelDipilih) {
      setPesanError('Please upload an Excel file first.');
      return;
    }

    setLagiMemproses(true);
    setPesanError('');
    setPesanSukses('');
    setHasilAnalisis(null);

    let inputData = modeInput === 'text' ? perintahTeks : `File: ${fileExcelDipilih.name}`;
    console.log(`Processing Excel command: "${inputData}" using ${modelYangDipake} model.`);
    await new Promise(resolve => setTimeout(resolve, 2500)); // Simulasi API

    // Hasil dummy
    let outputDummy;
    if (perintahTeks.toLowerCase().includes("summarize") || perintahTeks.toLowerCase().includes("summary")) {
      outputDummy = {
        type: 'text',
        content: `AI (${modelYangDipake}) Summary for "${inputData}":\n- Key insight 1: Positive trend in Q3 sales.\n- Key insight 2: Region X shows highest growth.\n- Recommendation: Focus marketing efforts on Region X.`
      };
    } else if (perintahTeks.toLowerCase().includes("average") || perintahTeks.toLowerCase().includes("mean")) {
         outputDummy = {
        type: 'text',
        content: `The average value calculated by AI (${modelYangDipake}) for "${inputData.substring(0,30)}..." is 75.3. (Simulated)`
      };
    } else if (fileExcelDipilih || perintahTeks.toLowerCase().includes("table") || perintahTeks.toLowerCase().includes("data")) {
      outputDummy = {
        type: 'table',
        headers: ['Category', 'Value 1', `Value 2 (AI ${modelYangDipake})`],
        rows: [
          ['A', Math.random()*100, Math.random()*200],
          ['B', Math.random()*100, Math.random()*200],
          ['C', Math.random()*100, Math.random()*200],
        ],
        caption: `Simulated data table based on your request: "${inputData.substring(0,50)}..."`
      };
    } else {
       outputDummy = {
        type: 'text',
        content: `AI (${modelYangDipake}) processed your request: "${inputData}".\nThis is a generic simulated response. More specific results would appear with a real backend.`
      };
    }
    
    setHasilAnalisis(outputDummy);
    setPesanSukses(`Request processed successfully using ${modelYangDipake} model!`);
    setLagiMemproses(false);
  };

  return (
    <div className="space-y-6">
      {/* Pilihan Mode Input */}
      <div className="flex space-x-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg max-w-xs mx-auto">
        <button
          onClick={() => { setModeInput('text'); setFileExcelDipilih(null); setHasilAnalisis(null); }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${modeInput === 'text' ? 'bg-white dark:bg-slate-800 shadow text-brand-utama' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
        >
          <FiType className="inline mr-1" /> Text Command
        </button>
        <button
          onClick={() => { setModeInput('file'); setPerintahTeks(''); setHasilAnalisis(null); }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${modeInput === 'file' ? 'bg-white dark:bg-slate-800 shadow text-brand-utama' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
        >
          <FiUpload className="inline mr-1" /> Upload File
        </button>
      </div>

      {/* Area Input */}
      {modeInput === 'text' ? (
        <div>
          <label htmlFor="textCommand" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Enter your data analysis command or question:
          </label>
          <textarea
            id="textCommand"
            rows="4"
            value={perintahTeks}
            onChange={(e) => setPerintahTeks(e.target.value)}
            placeholder="e.g., Summarize sales data by quarter. What is the average profit margin? Create a table of top 5 products by revenue."
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-brand-utama focus:border-brand-utama dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
                      ${isDragActive ? 'border-brand-utama bg-indigo-50 dark:bg-slate-700' : 'border-slate-300 dark:border-slate-600 hover:border-brand-utama/70'}`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="mx-auto text-3xl text-brand-utama mb-2" />
          {isDragActive ? (
            <p className="text-slate-700 dark:text-slate-200">Drop the Excel file here ...</p>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">Drag 'n' drop an Excel file (.xls, .xlsx) here, or click to select</p>
          )}
          {fileExcelDipilih && (
            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
              <FiFileText className="inline mr-1"/> Selected: {fileExcelDipilih.name}
            </p>
          )}
        </div>
      )}
      
      <div className="text-center">
        <button
          onClick={handleProsesPerintah}
          disabled={lagiMemproses || (modeInput === 'text' && !perintahTeks.trim()) || (modeInput === 'file' && !fileExcelDipilih)}
          className="px-8 py-3 bg-brand-utama text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {lagiMemproses ? <FiLoader className="animate-spin mr-2" /> : <FiBarChart2 className="mr-2" />}
          Analyze Data
        </button>
      </div>

      {pesanError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg flex items-center space-x-2">
          <FiAlertCircle /> <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg flex items-center space-x-2">
          <FiCheckCircle /> <span>{pesanSukses}</span>
        </div>
      )}

      {/* Area Hasil Analisis */}
      {hasilAnalisis && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">AI Analysis Result:</h3>
          {hasilAnalisis.type === 'text' && (
            <div className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-700 rounded-md">
              {hasilAnalisis.content}
            </div>
          )}
          {hasilAnalisis.type === 'table' && (
            <div>
              {hasilAnalisis.caption && <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 italic">{hasilAnalisis.caption}</p>}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                      {hasilAnalisis.headers.map(header => (
                        <th key={header} scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                    {hasilAnalisis.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">
                            {typeof cell === 'number' ? cell.toFixed(2) : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
       {!lagiMemproses && !hasilAnalisis && (modeInput === 'text' && perintahTeks || modeInput === 'file' && fileExcelDipilih) && (
          <div className="mt-6 flex flex-col items-center justify-center h-40 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-6">
             <FiBarChart2 size={38} className="text-slate-400 dark:text-slate-500 mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-center">Click "Analyze Data" to see the AI's insights.</p>
          </div>
      )}
    </div>
  );
};

export default AntarmukaAsistenExcel;