import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Statistics from '@/components/Statistics';

const Home = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <Features />
      <Statistics />
      <Pricing />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
