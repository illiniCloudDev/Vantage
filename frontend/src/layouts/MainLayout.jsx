import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default MainLayout;