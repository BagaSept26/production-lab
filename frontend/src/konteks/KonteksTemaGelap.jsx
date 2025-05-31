import React, { createContext, useState, useEffect, useContext, Children } from 'react';
 
const KonteksTema = createContext();

export const PenyediaTema = ({ children }) => {
    const [tema,setTema] = useState(()=>{
        const temaDariStorage = localStorage.getItem('temaAppKu');
        return temaDariStorage ? temaDariStorage: 'light';
    });
    useEffect(()=>{
        if(tema==='dark'){
            document.documentElement.classList.add('dark');
        } else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('temaAppKu', tema);
    }), [tema]

    const gantiTema = () =>{
        setTema(temaSebelumnya => (temaSebelumnya === 'light'?'dark':'light'));
    };
    return (
        <KonteksTema.Provider value = {{tema, gantiTema}}>
            {children}
        </KonteksTema.Provider>
    );
};
export const useTemaKu = () => useContext(KonteksTema);