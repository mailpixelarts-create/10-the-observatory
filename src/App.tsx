import { useEffect, useRef, useState } from 'react';
import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Story from './components/Story/Story';
import CoffeeCollection from './components/CoffeeCollection/CoffeeCollection';
import ObservatoryDome from './components/ObservatoryDome/ObservatoryDome';
import CoffeeOrigins from './components/CoffeeOrigins/CoffeeOrigins';
import Laboratory from './components/Laboratory/Laboratory';
import Gallery from './components/Gallery/Gallery';
import Reservation from './components/Reservation/Reservation';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import { useLenis } from './hooks/useLenis';
import { useScrollTrigger } from './hooks/useScrollTrigger';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useLenis();
  useScrollTrigger();

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  const handleLoaderComplete = () => {
    setLoaded(true);
    setTimeout(() => setLoaderHidden(true), 800);
  };

  return (
    <>
      <Cursor />
      {!loaderHidden && <Loader onComplete={handleLoaderComplete} fading={loaded} />}
      <Navigation />
      <main ref={mainRef}>
        <Hero />
        <Story />
        <CoffeeCollection />
        <ObservatoryDome />
        <CoffeeOrigins />
        <Laboratory />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}

export default App;
