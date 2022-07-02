import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, MainPage} from '@pages';
import {Container} from '@layout';
import PrivateRoute from '@router/PrivateRoute';


const RouteIndex = () => (
    <BrowserRouter>
        <Container>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/main" element={<MainPage/>}/>
                </Route>
            </Routes>

        </Container>
    </BrowserRouter>
);

export default RouteIndex;
