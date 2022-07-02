import {useContext} from 'react';
import {UserContext} from '@contexts/User';
import {Link, useNavigate} from 'react-router-dom';

const Header = () => {


    const {user, updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        updateUser(null);
        navigate('/');
    };

    return (
        <header className='flex w-full justify-around'>
            <Link to="/" className="text-4xl font-medium text-blue-900">EnergySaaS 2022</Link>
            {user !== null && (<div className="user flex ">
                <div
                    className="user-email-container flex flex-col mx-5 text-blue-700  items-end">
                    <div className="user-email border-b-2 border-blue-600">{user.email}</div>
                    <a onClick={handleLogout} className="user-logout cursor-pointer ">Logout</a>
                </div>
                <div className="user-avatar rounded-[100%] w-12 h-12 bg-blue-400 text-white text-bold text-lg flex justify-center items-center">{user.displayName[0]}</div>
            </div>)}
        </header>
    );
};

export default Header;
