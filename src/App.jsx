import useFxClass from './hooks/useFxClass';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useFxClass();
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Testimonials />
      <Services />
      <Process />
      <Work />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
