
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/skills";
import Work from "./components/work";
import Stats from "./components/stats";
import Contact from "./components/contact";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Work />
        <Stats />
        <Contact />
      </main>

      <footer className="site-footer">
        <p>
          Designed and built by <span>THUO</span> ©{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}

export default App;
