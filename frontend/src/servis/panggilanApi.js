const URL_MODEL_KECIL_DARI_ENV = import.meta.env.VITE_API_URL_MODEL_KECIL;
const URL_REDIRECTOR_MODEL_GEDE_DARI_ENV = import.meta.env.VITE_API_URL_MODEL_GEDE_REDIRECTOR; // Ini akan menjadi URL ke HF Space redirector
const URL_STATUS_MODEL_GEDE_DARI_GITHUB_ENV = import.meta.env.VITE_GITHUB_URL_STATUS_BACKEND;

/**
 * Fungsi untuk mengecek status model besar dari file backend.txt di GitHub.
 * File backend.txt berisi URL ngrok dari Colab jika aktif, atau kosong jika tidak.
 * @returns {Promise<string>} URL backend aktif dari Colab, atau string kosong jika tidak aktif/error.
 */
export const cekStatusModelGedeDariGithub = async () => {
  if (!URL_STATUS_MODEL_GEDE_DARI_GITHUB_ENV) {
    console.warn("URL_STATUS_MODEL_GEDE_DARI_GITHUB_ENV tidak di-set di .env. Tidak bisa cek status model besar.");
    const statusDemo = localStorage.getItem('demoModelGedeAktif');
    return statusDemo === 'true' ? "https://url-colab-dummy-env-kosong.ngrok.io" : "";
  }

  try {
    const urlNgecek = `${URL_STATUS_MODEL_GEDE_DARI_GITHUB_ENV}?timestamp=${new Date().getTime()}`;
    const respons = await fetch(urlNgecek, { cache: 'no-store' }); // 'no-store' untuk memaksa fetch baru

    if (!respons.ok) {
      console.error(`Gagal mengambil status model besar dari GitHub: ${respons.status} ${respons.statusText}`);
      return ''; 
    }

    const urlBackendAktif = await respons.text();
    console.log("URL backend aktif dari GitHub:", urlBackendAktif.trim());
    return urlBackendAktif.trim(); // .trim() penting untuk menghilangkan spasi atau newline
  } catch (error) {
    console.error("Error saat fetching status model besar dari GitHub:", error);
    return ''; // Jika ada error network, anggap tidak aktif
  }
};


/**
 * Fungsi dummy untuk API Scan Document.
 * @param {File} fileDokumen - File yang diupload pengguna.
 * @param {string} modelYangDipake - 'kecil' atau 'besar'.
 * @returns {Promise<object>} Objek hasil dengan { sukses, dataHasil/pesanError, sumberModel }.
 */
export const apiScanDokumen = async (fileDokumen, modelYangDipake) => {
  console.log(`Memanggil API: apiScanDokumen, File: ${fileDokumen.name}, Model: ${modelYangDipake}`);
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000)); // Simulasi delay jaringan

  if (modelYangDipake === 'kecil') {
    return {
      sukses: true,
      dataHasil: `Hasil scan DUMMY dari model KECIL untuk file "${fileDokumen.name}". Isinya: ID KTP 12345, Nama: Budi Dummy.`,
      sumberModel: "Model Kecil (HF Dummy)"
    };
  } else {
    const urlColabAktif = await cekStatusModelGedeDariGithub();
    if (!urlColabAktif && !URL_REDIRECTOR_MODEL_GEDE_DARI_ENV) { // Jika keduanya tidak ada
        return { sukses: false, pesanError: "Model besar tidak aktif atau URL redirector tidak dikonfigurasi." };
    }
    const targetUrl = URL_REDIRECTOR_MODEL_GEDE_DARI_ENV || urlColabAktif;
    console.log(`Akan memanggil model besar di: ${targetUrl}/scan-document (simulasi)`);

    return {
      sukses: true,
      dataHasil: `Hasil scan DUMMY SUPER DETAIL dari model BESAR (Colab via ${targetUrl ? 'Redirector/Direct' : 'Status GitHub'}) untuk file "${fileDokumen.name}". Isinya: No. Invoice INV/2024/001, Total: Rp 5.000.000, Item: Laptop AI.`,
      sumberModel: `Model Besar (Colab Dummy via ${URL_REDIRECTOR_MODEL_GEDE_DARI_ENV ? 'Redirector' : 'GitHub Status'})`
    };
  }
};

/**
 * Fungsi dummy untuk API Auto PowerPoint Generator.
 * @param {string} inputText - Teks input dari pengguna.
 * @param {number} jumlahSlide - Perkiraan jumlah slide.
 * @param {string} modelYangDipake - 'kecil' atau 'besar'.
 * @returns {Promise<object>} Objek hasil.
 */
export const apiBikinPPT = async (inputText, jumlahSlide, modelYangDipake) => {
  console.log(`Memanggil API: apiBikinPPT, Input: "${inputText.substring(0,30)}...", Slides: ${jumlahSlide}, Model: ${modelYangDipake}`);
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));

  const deskripsiModel = modelYangDipake === 'kecil' ? "Model Kecil (HF Dummy)" : `Model Besar (Colab Dummy via ${URL_REDIRECTOR_MODEL_GEDE_DARI_ENV ? 'Redirector' : 'GitHub Status'})`;
  
  if (modelYangDipake === 'besar' && !URL_REDIRECTOR_MODEL_GEDE_DARI_ENV && !(await cekStatusModelGedeDariGithub())) {
    return { sukses: false, pesanError: "Model besar tidak aktif atau URL redirector tidak dikonfigurasi." };
  }
  
  return {
    sukses: true,
    linkPPT: `https://dummy-download.com/ppt-${Date.now()}.pptx`,
    pesan: `PPT DUMMY (${jumlahSlide} slides) dari ${deskripsiModel} untuk topik "${inputText.substring(0,20)}..." berhasil dibuat!`,
    sumberModel: deskripsiModel
  };
};

/**
 * Fungsi dummy untuk API AI Todo List Generator.
 * @param {string} tujuanUtama - Tujuan utama dari pengguna.
 * @param {string} modelYangDipake - 'kecil' atau 'besar'.
 * @returns {Promise<object>} Objek hasil.
 */
export const apiGenerateTodoList = async (tujuanUtama, modelYangDipake) => {
  console.log(`Memanggil API: apiGenerateTodoList, Tujuan: "${tujuanUtama}", Model: ${modelYangDipake}`);
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));
  
  const deskripsiModel = modelYangDipake === 'kecil' ? "Model Kecil (HF Dummy)" : `Model Besar (Colab Dummy via ${URL_REDIRECTOR_MODEL_GEDE_DARI_ENV ? 'Redirector' : 'GitHub Status'})`;

  if (modelYangDipake === 'besar' && !URL_REDIRECTOR_MODEL_GEDE_DARI_ENV && !(await cekStatusModelGedeDariGithub())) {
    return { sukses: false, pesanError: "Model besar tidak aktif atau URL redirector tidak dikonfigurasi." };
  }

  const listDummy = [
    { id: Date.now() + 1, text: `Riset ${tujuanUtama.split(" ")[0]} (dari ${deskripsiModel})`, completed: false },
    { id: Date.now() + 2, text: `Buat outline untuk ${tujuanUtama.split(" ")[0]}`, completed: false },
    { id: Date.now() + 3, text: `Draft awal plan`, completed: Math.random() > 0.5 },
    { id: Date.now() + 4, text: `Review dan finalisasi plan`, completed: false },
  ];
  return {
    sukses: true,
    todoList: listDummy,
    sumberModel: deskripsiModel
  };
};


// --- Tambahkan fungsi API dummy untuk fitur lainnya di sini ---

/**
 * Fungsi dummy untuk API Email Generator.
 * @param {object} dataEmail - { tipeEmail, nadaSuara, penerima, poinUtama, infoTambahan }
 * @param {string} modelYangDipake - 'kecil' atau 'besar'.
 * @returns {Promise<object>} Objek hasil.
 */
export const apiGenerateEmail = async (dataEmail, modelYangDipake) => {
  const { tipeEmail, nadaSuara, penerima, poinUtama, infoTambahan } = dataEmail;
  console.log(`Memanggil API: apiGenerateEmail, Tipe: ${tipeEmail}, Model: ${modelYangDipake}`);
  await new Promise(resolve => setTimeout(resolve, 1800 + Math.random() * 1000));

  const deskripsiModel = modelYangDipake === 'kecil' ? "Model Kecil (HF Dummy)" : `Model Besar (Colab Dummy via ${URL_REDIRECTOR_MODEL_GEDE_DARI_ENV ? 'Redirector' : 'GitHub Status'})`;

  if (modelYangDipake === 'besar' && !URL_REDIRECTOR_MODEL_GEDE_DARI_ENV && !(await cekStatusModelGedeDariGithub())) {
    return { sukses: false, pesanError: "Model besar tidak aktif atau URL redirector tidak dikonfigurasi." };
  }

  const subjekDummy = `Subjek DUMMY: ${tipeEmail.replace('_',' ')} - ${poinUtama.substring(0,20) || infoTambahan.substring(0,20)}... (AI ${deskripsiModel})`;
  const isiDummy = `Dear ${penerima || '[Nama Penerima]'},\n\nIni adalah email ${nadaSuara} yang dibuat oleh ${deskripsiModel} mengenai "${poinUtama || infoTambahan}".\n\n[Konten email yang dihasilkan AI akan ada di sini, berdasarkan poin-poin Anda.]\n\nSalam,\n[Nama Anda/Perusahaan Anda]`;
  
  return {
    sukses: true,
    emailContent: { subjek: subjekDummy, isi: isiDummy },
    sumberModel: deskripsiModel
  };
};


// Kamu bisa melanjutkan pola ini untuk:
// - apiProsesExcel
// - apiBuatJadwalMingguan
// - apiEkstrakPDFkeExcel (mirip apiScanDokumen)
// - apiGenerateCatatanRapat
// - apiSaranDelegasiTugas

// Contoh untuk satu lagi: AI Excel Assistant
export const apiProsesExcel = async (inputData, tipeInput, modelYangDipake) => {
  // tipeInput bisa 'text' (perintah teks) atau 'file' (objek File)
  console.log(`Memanggil API: apiProsesExcel, Tipe Input: ${tipeInput}, Model: ${modelYangDipake}`);
  await new Promise(resolve => setTimeout(resolve, 2200 + Math.random() * 1000));

  const deskripsiModel = modelYangDipake === 'kecil' ? "Model Kecil (HF Dummy)" : `Model Besar (Colab Dummy via ${URL_REDIRECTOR_MODEL_GEDE_DARI_ENV ? 'Redirector' : 'GitHub Status'})`;

  if (modelYangDipake === 'besar' && !URL_REDIRECTOR_MODEL_GEDE_DARI_ENV && !(await cekStatusModelGedeDariGithub())) {
    return { sukses: false, pesanError: "Model besar tidak aktif atau URL redirector tidak dikonfigurasi." };
  }

  let outputDummy;
  const perintah = tipeInput === 'text' ? inputData : `analisis file ${inputData.name}`;

  if (perintah.toLowerCase().includes("summary")) {
    outputDummy = { type: 'text', content: `Ringkasan DUMMY dari ${deskripsiModel} untuk "${perintah.substring(0,30)}...":\n- Poin penting 1.\n- Poin penting 2.` };
  } else {
    outputDummy = {
      type: 'table',
      headers: ['Kategori (AI)', 'Nilai (AI)', `Sumber (${deskripsiModel})`],
      rows: [ ['Data X', Math.random()*100, 'Simulasi'], ['Data Y', Math.random()*200, 'Simulasi'] ],
      caption: `Tabel DUMMY berdasarkan perintah: "${perintah.substring(0,40)}..."`
    };
  }
  
  return {
    sukses: true,
    hasilAnalisis: outputDummy,
    sumberModel: deskripsiModel
  };
};