import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const isAuth = true;
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
