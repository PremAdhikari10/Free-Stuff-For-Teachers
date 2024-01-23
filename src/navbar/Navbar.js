import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Dropdwon from './Dropdown'

function Navbar() {

    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };
    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    Teachers Aid
                </Link>

                {/* Hamburger Menu */}
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {/* Home tab */}
                    <li className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    {/* Services tab */}
                    <li className='nav-item'>
                        <Link to='/viewitems' className='nav-links' onClick={closeMobileMenu}>
                            View Items
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/add_items' className='nav-links' onClick={closeMobileMenu}>
                            Add Items
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/maps' className='nav-links' onClick={closeMobileMenu}>
                            📍 Items Near Me
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sign-in' className='nav-links' onClick={closeMobileMenu}>
                            Sign In
                        </Link>
                    </li>
                </ul>

            </nav>
        </>
    )
}
export default Navbar;