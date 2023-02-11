import * as React from 'react';
import Dashboard from "../features/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/composit_type' element={<Dashboard/>}/>
          </Routes>
      </BrowserRouter>
  );
}
