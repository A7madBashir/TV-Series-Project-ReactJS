import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Searchpage from './pages/Searchpage';
import Showpage from './pages/Showpage';
import Header from './component/layout/header';

import { ShowState } from './context/Showcontext';
import { useState } from 'react';
import { AlertState } from './context/Alertcontext'
function App() {
  return (
    <ShowState>
      <AlertState>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/search' element={<Searchpage />} />
            <Route path='/shows/:id' element={<Showpage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>

        </BrowserRouter>
      </AlertState>
    </ShowState>
  );
}

export default App;
