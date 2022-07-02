import RouterIndex from '@router';
import {UserProvider} from '@contexts/User';

function App() {
    return (
        <UserProvider>
            <div className="min-h-screen flex flex-col flex-auto bg-slate-300">
                <RouterIndex/>
            </div>
        </UserProvider>);
}

export default App;
