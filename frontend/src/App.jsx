import { useState } from 'react';
import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';


const App =  () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    )
);

    return (
        <RouterProvider router={Router} />
    )
}

export default App
