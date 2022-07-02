import {Link} from 'react-router-dom';

const Footer = () => (
    <footer className="px-12 w-full ">
        <nav className="border-t-2 border-t-black w-full">
            <ul className="nav nav-tabs flex flex-row items-center justify-around mt-6 mb-4">

                <li className="nav-item">
                    <Link className="nav-link" to='/about'>About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/plans'>Plans</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/legal'>Legal</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    </footer>
);

export default Footer;
