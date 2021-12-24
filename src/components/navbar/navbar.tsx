import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../../assets/icons';
import './navbar.css';

/**
 * Navigation bar
 * @returns 
 */
function Navbar() {
    const [display, setDisplay] = useState('block');
    const [isOpen, setIsOpen] = useState(false);
    const deviceWidth = window.innerWidth;

    useEffect(() => {
        if (deviceWidth <= 480) {
            setDisplay('none');
        } else setDisplay('block');
    }, [deviceWidth])

    const toggleMenu = () => {
        if (isOpen) {
            setDisplay('none');
        } else setDisplay('block');
        setIsOpen(!isOpen);
    }

    return (
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
    )
}

export default Navbar;