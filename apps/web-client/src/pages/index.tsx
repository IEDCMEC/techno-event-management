import Scanner from "@/components/Scanner/Scanner";

const Home = () => {
  return (
    <main>
      <h1>Web Client</h1>
      <Scanner
  qr_pay={true} // Example props, adjust as needed
  setUserId={(userId) => {
    // Implement your setUserId logic here
  }}
  userId=""
  setPaymentId={(paymentId) => {
    // Implement your setPaymentId logic here
  }}
  paymentId=""
/>;

    </main>
  );
};

export default Home;
