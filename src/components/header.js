import React from "react"
import PropTypes from "prop-types"

import Navbar from 'react-bootstrap/Navbar'

import Icon from '../assets/lofiskeptic.svg'

const Header = ({ siteTitle }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">
      <Icon width={30} height={30} />{' '}
      {siteTitle}
    </Navbar.Brand>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
