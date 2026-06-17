import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import Skills   from './components/Skills';
import Projects from './components/Projects';
import Contact  from './components/Contact';
import Footer   from './components/Footer';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/blog"      element={<BlogList />} />
          <Route path="/blog/:id"  element={<BlogPost />} />
          <Route path="*"          element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
