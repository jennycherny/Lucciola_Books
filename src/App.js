import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Preorder from './pages/Preorder';
import About from './pages/About';
import Library from './pages/Library';
import Shop from "./pages/Shop";
import Home from './pages/Home';
import ShopBookPage from './pages/ShopBookPage';
import NotFound from './pages/NotFound';
import LibraryBookPage from './pages/LibraryBookPage';

import './index.css';

function App() {
  return (
  <>
    <div>
      <Header/>
    </div>


     <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/about' element={<About/>} />
                <Route exact path='/shop' element={<Shop condition="Новая"/>} />
                <Route exact path='/shop/:bookId' element={<ShopBookPage />} />

                <Route exact path='/library' element={<Library condition="Б/У"/>} />
                <Route exact path='/library/:bookId' element={<LibraryBookPage />} />

                <Route exact path='/preorder' element={<Preorder/>} />

                <Route exact path='*' element={<NotFound/>} />
            </Routes>
        </Router>
  </>
  );

  
}

export default App;
