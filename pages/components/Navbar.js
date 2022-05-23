import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'next/image'
import React, { Component } from 'react'
import style from './Navbar.module.css'
import Link from 'next/link'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  openSideBar = () => {
    document.getElementById('SideBar').style.transform = "translateX(0%)"
  }
  render() {
    return (
      <NavBar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm">
        <div className="container-fluid">
          <Link href={'/'}>
            <NavBar.Brand style={{ color: 'goldenrod', cursor: 'pointer', fontSize: '20pt' }}>{this.props.channel === undefined ? "Clossum" : this.props.channel}</NavBar.Brand>
          </Link>
          <NavBar.Toggle aria-controls="responsive-navbar-nav" />
          <NavBar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav style={{ textAlign: 'center' }}>
              <Nav.Link style={{ marginRight: '10pt' }}>
                <Image src={'/assets/search.png'} height={'25pt'} width={'25pt'} />
              </Nav.Link>
              <Nav.Link href={'/Custom'} style={{ marginRight: '10pt' }}>
                <Image src={'/assets/custom.png'} height={'25pt'} width={'25pt'} />
              </Nav.Link>
              <Nav.Link style={{ marginRight: '10pt' }}>
                <Dropdown drop={'start'}>
                  <Dropdown.Toggle as={'div'}>
                    <Image src={'/assets/account.png'} height={'25pt'} width={'25pt'} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: '180pt', }}>
                    <div style={{ padding: '10pt' }}>
                      <div
                        onClick={this.openSideBar}
                        style={{
                          backgroundColor: '#53bab9', borderRadius: '5pt',
                          textAlign: 'center', color: 'white', padding: '5pt'
                        }}>Sign up / Sign in</div>
                      <div style={{ textAlign: 'center', fontSize: 'small', marginTop: '5pt' }}>Need help?</div>
                    </div>
                    <Dropdown.Item href='/Orders' className={style.dropDownItem}>Order</Dropdown.Item>
                    <Dropdown.Item href='/Wishlist' className={style.dropDownItem}>Wishlist</Dropdown.Item>
                    <Dropdown.Item className={style.dropDownItem}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
              <Nav.Link href={'/Cart'} style={{ marginRight: '10pt' }}>
                <Image src={'/assets/bag.png'} height={'25pt'} width={'25pt'} />
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </div>
      </NavBar>
    )
  }
}
