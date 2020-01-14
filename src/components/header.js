import React from "react"
import PropTypes from "prop-types"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Twitter } from 'react-feather';

import Icon from '../assets/lofiskeptic.svg'

const Header = ({ siteTitle }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <Icon width={30} height={30} />{' '}
      {siteTitle}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link href="https://twitter.com/lofiskeptic"><Twitter /></Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
