import { useState } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import WhyWebflow from "./components/WhyWebflow";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(true);

  return (
    <>

      {loading && (
        <Loader
          finishLoading={() => setLoading(false)}
        />
      )}

      {!loading && (

        <div className="bg-color">
          <Hero />
          <About />
          <Services />
          <Projects />
          <WhyWebflow />
          <Clients />
          <Testimonials />
          <CTA />
          <FAQ />
          <Footer />
        </div>

      )}

    </>
  );
}

export default App;