import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import CowBasic from './pages/CowBasic';
import PieceItTogether from './pages/PieceItTogether';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
    return (
            <div className="relative h-full w-full">
                <div/>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pieceItTogether" element={<PieceItTogether />} />
                    <Route path="/cowBasic" element={<CowBasic />} />
                </Routes>

            </div>
    );
};

export default App
