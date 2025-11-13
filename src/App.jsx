import Navbar from "./Components/Navbar/Navbar";
import About from "./pages/allPages/About";
import Home from "./pages/allPages/Home";
import Skills from "./pages/allPages/Skills";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Skills />
    </div>
  );
};

export default App;
