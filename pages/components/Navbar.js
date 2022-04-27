import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'next/image'
import React, { Component } from 'react'
import style from './Navbar.module.css'
import Link from 'next/link'

export default class Navbar extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div style={{
        paddingLeft: '30pt', paddingRight: '30pt', marginBottom: '8vh',
        boxShadow: '0px 5px 10px rgb(220,220,220)', backgroundColor: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ paddingBottom: '1vh', paddingTop: '1vh' }}>
          <div style={{ color: 'goldenrod', fontSize: '4vh' }}>Clossum</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '15pt', marginRight: '15pt' }}>
            <Image src={'/assets/search.png'} height={'25pt'} width={'25pt'} />
          </div>
          <div style={{ marginLeft: '15pt', marginRight: '15pt', cursor: 'pointer' }}>
            <Dropdown>
              <Dropdown.Toggle as={'div'} id="dropdown-basic">
                <Image src={'/assets/account.png'} height={'25pt'} width={'25pt'} />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: '150pt' }}>

                <div style={{ padding: '10pt' }}>
                  <div style={{
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
          </div>
          <div style={{ marginLeft: '15pt', marginRight: '15pt', cursor: 'pointer' }}>
            <Link href={'/Cart'}>
              <Image src={'/assets/bag.png'} height={'25pt'} width={'25pt'} />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
