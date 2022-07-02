import {Footer, Header} from '@layout';
import Sidebar from './Sidebar';

const MainPage = () => (<div className="grid grid-cols-4 grid-rows-6 min-h-screen bg-white  pt-8">
    <div className="col-span-4"><Header /></div>
    <div className="col-span-1 row-span-6"><Sidebar /></div>
    <div className="col-span-3 row-span-6 bg-green-200 h-full">content</div>
    <div className="col-span-4"><Footer /></div>
    </div>);


export default MainPage;
