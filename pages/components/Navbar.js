import Image from 'next/image'
import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{
        paddingLeft: '30pt', paddingRight: '30pt', marginBottom: '8vh',
        boxShadow: '0px 5px 10px rgb(220,220,220)', backgroundColor: 'white',
        display: 'flex',justifyContent:'space-between',alignItems:'center'
      }}>
        <div style={{ paddingBottom: '1vh', paddingTop: '1vh' }}>
          <div style={{ color: 'goldenrod', fontSize: '4vh' }}>Clossum</div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{marginLeft:'15pt',marginRight:'15pt'}}>
            <Image  src={'/assets/search.png'} height={'25pt'} width={'25pt'} />
          </div>
          <div style={{marginLeft:'15pt',marginRight:'15pt'}}>
            <Image  src={'/assets/account.png'} height={'25pt'} width={'25pt'} />
          </div>
          <div style={{marginLeft:'15pt',marginRight:'15pt'}}>
            <Image  src={'/assets/bag.png'} height={'25pt'} width={'25pt'} />
          </div>
        </div>
      </div>
    )
  }
}
