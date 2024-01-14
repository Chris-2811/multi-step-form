import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Step1, Step2, Step3, Step4, Step5 } from './pages/index';
import Navbar from './components/Navbar';
import { CompletionContextProvider } from './pages/context/CompletionContext';

function App() {
  return (
    <CompletionContextProvider>
      <Router>
        <header className="pt-8 pb-[2.125rem] md:hidden">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/step4" element={<Step4 />} />
            <Route path="/step5" element={<Step5 />} />
          </Routes>
        </main>
      </Router>
    </CompletionContextProvider>
  );
}

export default App;
