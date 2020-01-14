import React from "react"
import Navbar from 'react-bootstrap/Navbar'

const Footer = (props) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand>
      &copy; {new Date().getFullYear()}, Built with
        {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Navbar.Brand>
  </Navbar>
)

export default Footer
