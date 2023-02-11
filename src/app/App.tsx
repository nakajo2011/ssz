import * as React from 'react';
import Dashboard from "../features/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CompositTypeDashboard from "../features/CompositTypeDashboard";

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/composit_type' element={<CompositTypeDashboard/>}/>
          </Routes>
      </BrowserRouter>
  );
}
