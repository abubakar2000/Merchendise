import React, { Component } from 'react'
import Stepper from './components/Stepper'

class OrderItem extends Component {
  render() {
    return (
      <div style={{ marginLeft: '20pt', marginRight: '20pt', color: 'rgb(100,100,100)', borderBottom: '1px solid rgb(220,220,220)', }}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-5' style={{ minHeight: '20vh', paddingTop: '10pt', paddingBottom: '10pt' }}>
              <div className='row'>
                <div className='col-md-5' style={{ minHeight: '35vh', backgroundColor: 'pink' }}>
                </div>
                <div className='col-md-7' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '20pt' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                    <div style={{ marginTop: '1vh' }}>
                      <div>JET BLACK HALF SLEEVE T-SHIRT</div>
                      <div><div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹400</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div> <div style={{ marginLeft: '10pt', color: 'red' }}>30% OFF</div></div>
                    </div>
                  </div>
                  <div style={{ paddinTop: '2vh', paddingBottom: '1vh' }}>
                    <div>Size: (M)</div>
                    <div>Colour: Yellow</div>
                    
                    <div>Qty: 4</div>
                  </div>
                  <div>
                    Delivery by saturdat 20
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
              <Stepper />
              <div>
                <div style={{ fontSize: '2vh' }}>Shipping Address</div>
                <div style={{ fontSize: '1.5vh' }}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div>
              </div>
              <div>
                <div style={{ fontSize: '2vh' }}>Billing Address</div>
                <div style={{ fontSize: '1.5vh' }}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum </div>
              </div>
            </div>
            <div className='col-lg-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2vh', paddingBottom: '2vh' }}>
              <div>
                <div style={{ fontSize: '2vh' }}>Tracking ID: 156acvwk56k</div>
                <div style={{ fontSize: '1.5vh' }}>Courier: Fedex</div>
              </div>
              <div >
                <button
                  style={{ paddingLeft: '20pt', paddingRight: '20pt', }}
                  className='btn btn-sm btn-outline-dark col-12'>Cancel Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default class Orders extends Component {
  render() {
    return (
      <div>
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
    )
  }
}
