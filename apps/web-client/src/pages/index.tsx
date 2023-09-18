import { Scanner } from "@/components/Scanner/Scanner";


import { useState } from 'react';

const Home = () => {
  const [data, setData] = useState('No result');

  return (
    <main>
      <h1>Web Client</h1>

      <Scanner
        qr_pay={false} // Example props, adjust as needed
        setUserId={(userId) => {
          // Implement your setUserId logic here
        }}
        userId=""
        setPaymentId={(paymentId) => {
          // Implement your setPaymentId logic here
        }}
        paymentId=""
      />
    </main>
  );
};

export default Home;
