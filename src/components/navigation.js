import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Drawer from "react-motion-drawer";
import { checkLogin } from '../api/auth'

const navlinks = checkLogin ? [

    {
        title: 'Home',
        path: '/home'
    }, {
        title: 'About',
        path: '/landing'
    },
    {
        title: 'Log Out',
        path: '/login'
    }
] : [
    {
        title: 'About',
        path: '/landing'
    },
    {
        title: 'Log In',
        path: '/login'
    },
    {
        title: 'Sign Up',
        path: '/signup'
    }
]

export default function Navigation(props) {
    const [menuActive, setMenuActive] = useState(false);
    const [width, setWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <nav className="site-navigation">
            <span className="menu-title">API Development Learning Platform</span>
            {width > 900 && <div className={`menu-content-container ${menuActive && 'active'}`}
                onMouseLeave={() => setMenuActive(false)}
                onMouseEnter={() => setMenuActive(true)}>
                <ul>
                    {navlinks.map((link, index) => {

                        if (link.title == "Log Out") {
                            return (
                                <li key={index}>
                                    <Link to={link.path} onClick={() => {
                                        localStorage.clear();
                                        setMenuActive(!menuActive)
                                    }}>{link.title}</Link>
                                </li>
                            )
                        }
                        return (
                            <li key={index}>
                                <Link to={link.path} onClick={() => setMenuActive(!menuActive)}>{link.title}</Link>
                            </li>
                        )
                    })}
                </ul>
                {/* <span className="menu-avatar-container">
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={38}/>
                <span className="menu-avatar-name">{props.user.firstName} {props.user.lastName}</span>
            </span> */}
            </div>}
            {
                width <= 900 &&
                <Drawer open={menuActive}
                    className={`menu-content-container ${menuActive && 'active'}`}
                    noTouchOpen={false}
                    noTouchClose={false}
                    onChange={() => {
                        setMenuActive(!menuActive)
                        console.log(menuActive)
                    }}>
                    <ul>
                        <li>
                            {/* <span className="menu-avatar-container">
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={38}/>
                                <span className="menu-avatar-name">{props.user.firstName} {props.user.lastName}</span>
                        </span> */}
                        </li>
                        {navlinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} onClick={() => setMenuActive(!menuActive)}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                </Drawer>
            }
            <ion-icon name="menu" onClick={() => setMenuActive(!menuActive)}></ion-icon>
        </nav>
    );
}