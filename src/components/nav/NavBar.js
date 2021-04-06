import React from "react"
import { Link } from "react-router-dom"
import { Nav, Button, FormControl, Form} from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import "./NavBar.css"

let logo = require( "../images/tenten-logo.png")
const handleLogout = () => {
    sessionStorage.removeItem("app_user_id")
}
export const NavBar = (props) => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand to="/">{<Link className="navbar__link" to="/">
                <img alt="tenten-logo" src={logo.default} /></Link>
                }
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/profile">My List</Nav.Link>
            </Nav>
            <Button size="sm" className="logout" variant="outline-info" onClick={handleLogout}>
                <Link to="/login">{sessionStorage.getItem("app_user_id")? "Logout" : "Login"}</Link>
            </Button>
        </Navbar>
    </>
    )
}
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/">Home</Link>
//             </li>
//             <li className="navbar__item">
//                 <Link className="navbar__link" to="/friends">Users</Link>
//             </li>
//             <li className="navbar__item">
//                 <Link className="navbar__link" to="/profile">My List</Link>
//             </li>
//         </ul>

// <Navbar bg="dark" variant="dark">
//     <Navbar.Brand to="/">Navbar</Navbar.Brand>
//     <Nav className="mr-auto">
//       <Nav.Link to="/">Home</Nav.Link>
//       <Nav.Link to="/friends">Features</Nav.Link>
//       <Nav.Link to="/profile">Pricing</Nav.Link>
//     </Nav>
//     <Form inline>
//       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//       <Button variant="outline-info">Search</Button>
//     </Form>
//   </Navbar>