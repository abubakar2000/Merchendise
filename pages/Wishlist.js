import React, { Component } from 'react'
import { QueryG } from './serverConfig';
import style from './Wishlist.module.css';

export default class Wishlist extends Component {
    constructor() {
        super()
        this.state = {
            productItems: [1, 2, 3, 4, 5,],
        }
    }

    componentDidMount(){
    }
    render() {
        return (
            <div>
                <div style={{ paddingLeft: '30pt', paddingTop: '30pt', paddingRight: '30pt' }}>
                    <div style={{ fontSize: '2.4vh', letterSpacing: '2pt' }}>Wish List</div>
                </div>
                <div>
                    <div style={{ padding: "20pt", display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
                        {
                            this.state.productItems.map((item, index) => (
                                <div key={index} className={style.itemCard}>
                                    <div className={style.itemContentBox}>
                                        <div style={{ height: "220pt", backgroundColor: 'pink', width: '100%', }}>

                                        </div>
                                        <div style={{ padding: '10pt', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80pt', }}>
                                            <div style={{ fontSize: '2.2vh' }}>Half sleeve T-Shirt</div>
                                            <div><div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹400</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div></div>
                                            <div style={{ color: 'green' }}>30% OFF</div>
                                        </div>
                                    </div>
                                    <div style={{paddingLeft:'15pt',paddingRight:'15pt'}}>
                                        <button className='btn btn-outline-dark col-12'>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
