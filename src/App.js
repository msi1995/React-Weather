/** @jsxImportSource @emotion/react */


import React from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { css } from '@emotion/react'
import Search from './pages/Search';
import TopNavbar from './components/TopNavbar';

function App() {
  const [ searchParams ] = useSearchParams()
  return (
    <div>
    <TopNavbar/>
    <Routes>
      <Route path='/' element={<Navigate to="/5day" />} />
      <Route path='/5day' element={<Search query={searchParams.get("q")} />} />
      <Route path='*' element={<h1 className='uh-oh'>This is under construction. How'd you get here, anyway...?</h1>}/>
    </Routes>
    </div>
  );
}

export default App;
