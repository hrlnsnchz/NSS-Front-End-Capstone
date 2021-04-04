import React from "react";
import {Link} from "react-router-dom"

let logo = require( "../images/tenten-logo.png")
export const Header = () => (
    <header>
        <Link className="navbar__link" to="/">
        <img alt="tenten-logo" src={logo.default} />
        </Link>
        
    </header>
)