import { useState, useEffect, useMemo, Children } from 'react';
import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider,
    Navigate
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import NewsPage from './pages/NewsPage';
import api from './services/api'; 



const ProtectedRoute = ({ isLoggedIn, children}) => {
    if(!isLoggedIn){
        return <Navigate to='/login' replace/>;
    }
    return children
};

const App =  () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    //check authentication 
    useEffect(() =>{
        const checkAuthStatus = async () => {
            try {
                const res = await api.get('/api/auth/me');
                if(res.data.success){
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
                console.log('No active session found.');
            }finally{
                setLoading(false)
            }
        };
        checkAuthStatus();
    }, []);

    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                </ProtectedRoute>} />
                <Route path="/news" element={<NewsPage />} />
            </Route>
        )
    ), [isLoggedIn]); // Only recreate if login status changes

    if(loading){
        return(
            <div className="min-h-screen bg-[#020617] flex items-center justify-center"> 
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#38bdf8]"> </div>
            </div>
        );
    }

    return (
        <RouterProvider router={router} />
    )
}

export default App
