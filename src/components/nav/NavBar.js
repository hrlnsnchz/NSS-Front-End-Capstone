import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/friends">{sessionStorage.getItem("app_user_id")? "Friends" : "Users"}</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li>
        </ul>
    )
}