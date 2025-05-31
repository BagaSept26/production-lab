import React from 'react'
import SemuaRute from './rute/SemuaRute'
import { PenyediaTema } from './konteks/KonteksTemaGelap'
import {PenyediaModelAi} from './konteks/KonteksModelAi'

function App() {

  return (
    <PenyediaTema>
      <PenyediaModelAi>
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
          <SemuaRute/>
        </div>
      </PenyediaModelAi>
    </PenyediaTema>
  )
}

export default App
