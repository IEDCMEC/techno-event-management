import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react'
import Scanner from '@/components/Scanner/Scanner';
import { useState } from 'react';
const index = () => {

     const [setResult, result] = useState('No result');

  const handleScanResult = (scannedResult) => {
    setResult(scannedResult);
  };
  return (
    
    <div>
        <DashboardLayout>
            <Scanner setResult={setResult} result={setResult}/>
        <p>Scanned Result: {result}</p>
        </DashboardLayout>
    </div>
  )
}

export default index