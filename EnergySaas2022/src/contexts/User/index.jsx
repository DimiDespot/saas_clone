import {createContext, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useLocalStorage} from '@hooks/useLocaleStorage';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

    // const [user, setUser] = useState(null);

    const [user, setUser] = useLocalStorage('user', null);

    return (
        <UserContext.Provider value={{user, updateUser: setUser}}>
            {children}
        </UserContext.Provider>);
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};
