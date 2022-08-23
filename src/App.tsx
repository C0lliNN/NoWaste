import React from 'react';
import { Routes } from 'react-router'
import { Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute authenticated={false}><p>Home Page</p></ProtectedRoute>} />
      <Route path='/login' element={<p>Login Page</p>} />
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}
