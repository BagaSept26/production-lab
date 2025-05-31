import React, { createContext, useState, useContext, useEffect } from 'react';

const KonteksModel = createContext();
export const PenyediaModelAi = ({ children}) =>{
    const [modelYangDipake, setModelYangDipake] = useState('kecil');
    const [modelGedeAktif, setModelGedeAktif] = useState(false);
    const [lagiLoadingStatus, setLagiLoadigStatus] = useState(true);

    const cekStatusModelGede = async () => {
        setLagiLoadigStatus(true);
        console.log("Ngecek status model gede nih...");
        const statusDemoDariStorage = localStorage.getItem('demoModelGedeAktif');
        if(statusDemoDariStorage){
            setModelGedeAktif(statusDemoDariStorage === 'true');
        } else {
            setModelGedeAktif(false);
        }
        setLagiLoadigStatus(false);
    };
    useEffect(()=>{
        cekStatusModelGede();
    },[]);
        const pilihModelKecil = () =>{
            setModelYangDipake('kecil');
            console.log("Model Kecil(dari hugging face) kepilih.");
        };
        const pilihModelGede = () => {
            if(modelGedeAktif){
                setModelYangDipake('besar');
                console.log("Model Gede lagi gak aktif, gak bisa dipilih.");
                alert("Large Model is currently offline. Please try the Small model or check back later.");
            }
        };
        const gantiStatusModelGedeBuatDemo = ()=>{
            const statusBaru = !modelGedeAktif;
            setModelGedeAktif(statusBaru);
            localStorage.setItem('demoModelGedeAktif', statusBaru.toString());
            alert(`Status Model Gede (demo) diubah jadi: ${statusBaru ? 'AKTIF': 'NONAKTIF'}. Mungkin perlu Refresh.`);
        }
        return (
            <KonteksModel.Provider value={{
                modelYangDipake,
                modelGedeAktif,
                lagiLoadingStatus,
                pilihModelKecil,
                pilihModelGede,
                cekStatusModelGede,
                gantiStatusModelGedeBuatDemo  
            }}>
                {children}
            </KonteksModel.Provider>
        );
};

    
export const useModelKu = () => useContext(KonteksModel);