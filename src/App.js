import React, {  useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Preorder from './pages/Preorder';
import About from './pages/About';
import Library from './pages/Library';
import Shop from "./pages/Shop";
import ShopGifts from './pages/ShopGifts';
import Home from './pages/Home';
import ShopBookPage from './pages/ShopBookPage';
import NotFound from './pages/NotFound';
import LibraryBookPage from './pages/LibraryBookPage';

import './index.css';

function App() {

  const [selectedSection, setSelectedSection] = useState('books');
  return (
  <>
    <div>
      <Header/>
    </div>


    <Router>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/shop' element={<Shop condition="Новая" selectedSection={selectedSection} setSelectedSection={setSelectedSection} />} />
          <Route exact path='/shop/gifts' element={<ShopGifts condition="Подарки" selectedSection={selectedSection} setSelectedSection={setSelectedSection} />} />
          <Route exact path='/shop/:bookId' element={<ShopBookPage />} />

          <Route exact path='/library' element={<Library condition="Б/У"/>} />
          <Route exact path='/library/:bookId' element={<LibraryBookPage />} />

          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/order' element={<Order/>} />
          <Route exact path='/preorder' element={<Preorder/>} />

          <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  </>
  );

  
}

export default App;
