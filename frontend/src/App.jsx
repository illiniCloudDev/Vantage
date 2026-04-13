import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Route>
    )
)

const App =  () => {
    return (
        <RouterProvider router={Router} />
    )
}

export default App
