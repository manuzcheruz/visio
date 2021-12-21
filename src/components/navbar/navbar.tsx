import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    return (
        <div className="section">
            <div className="container">
                <div className="navbar-wrapper">
                    <div className="name">
                        <h2>
                            Visio
                        </h2>
                    </div>
                    <div className="links-wrapper">
                        <Link to='/'>
                            <button className="">
                                Home
                            </button>
                        </Link>
                        <Link to='/favourites'>
                            <button className="">
                                Favourites
                            </button>
                        </Link>
                        <Link to='/search'>
                            <button className="">
                                search
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;