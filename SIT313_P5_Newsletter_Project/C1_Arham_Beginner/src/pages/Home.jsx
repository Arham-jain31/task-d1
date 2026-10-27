import Hero from "../components/Hero";
import About from "../components/About";
import Project from "../components/Project";
import Gallery from "../components/Gallery";
import Articles from "../components/Articles";
import Tutorials from "../components/Tutorials";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Gallery />
      <Articles />
      <Tutorials />
    </>
  );
}

export default Home;
