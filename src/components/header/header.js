import React from "react";

let logo = require( "../images/tenten-logo.png")
export const Header = () => (
    <header>
        <img alt="tenten-logo" src={logo.default} />
    </header>
)