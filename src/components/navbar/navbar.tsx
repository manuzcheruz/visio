import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../../assets/icons';
import './navbar.css';

/**
 * Navigation bar
 * @returns 
 */
function Navbar() {
    const [display, setDisplay] = useState('block');
    const deviceWidth = window.innerHeight;
    if (deviceWidth <= 480) {
        setDisplay('none');
    }
    const toggleMenu = () => {
        setDisplay('block');
    }
    return (
        <div className="section">
            <div className="container">
                <div className="navbar-wrapper">
                    <div className="name">
                        <h2>
                            Visio
                        </h2>
                    </div>
                    <nav style={{display: `${display}`}} className="links-wrapper">
                        <ul>
                            <li>
                                <Link to='/'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/favourites'>
                                        Favourites
                                </Link>
                            </li>
                            <li>
                                <Link to='/search'>
                                        search
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <span className="menu-toggler" onClick={toggleMenu}><Menu height='20' /></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;