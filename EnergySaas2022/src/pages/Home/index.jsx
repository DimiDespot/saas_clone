import {useNavigate} from 'react-router-dom';
import {Footer, Header} from '@layout';
import {signInWithPopup} from 'firebase/auth';
import {useContext} from 'react';
import {UserContext} from '@contexts/User';
import {auth, provider} from '@utils/auth/firebase';

const Home = () => {


    const {user, updateUser} = useContext(UserContext);
    console.log(user);

    const navigate = useNavigate();

    const navigateToMainApp = ()  => {
        navigate('/main');
    };

    const handleSignIn = () => {
        // TODO: sign in with Firebase

        // navigate('/main', {replace: true});
        signInWithPopup(auth, provider)
            .then(res => {
                console.log(res);
                updateUser(res.user);
                navigateToMainApp();
            })
            .catch(err => {
                console.log(err);
            });

    };

    return (
        <div className="flex min-h-screen bg-white flex-col justify-center items-center pt-8">

            <Header />
            <section className="flex-1 content flex flex-col justify-between items-center py-12">
                <img src="/images/wind-energy.jpg" alt="Wind Energy" className="max-w-xl w-full h-max p-8"/>
                <div className="">
                {user === null ?
                    <button type="button" onClick={handleSignIn}
                            className="bg-blue-400 py-3 px-8 text-xl text-white rounded-lg hover:bg-blue-500 active:bg-blue-600 shadow-md shadow-neutral-600 "
                    >Sign In
                    </button>
                :
                    <button type="button" onClick={navigateToMainApp}
                            className="bg-blue-400 py-3 px-8 text-xl text-white rounded-lg hover:bg-blue-500 active:bg-blue-600 shadow-md shadow-neutral-600 "
                    >Go To App
                    </button>

                }
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Home;
