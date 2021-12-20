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
                        <button className="">
                            Home
                        </button>
                        <button className="">
                            Favourites
                        </button>
                        <button className="">
                            search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;