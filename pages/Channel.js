import Link from 'next/link';
import React, { Component } from 'react'
import styles from './Channel.module.css';

export default class Channel extends Component {

    constructor() {
        super()
        this.state = {
            productItems: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
    }

    render() {
        return (
            <div style={{}}>
                <div className={styles.bannerContainer}>
                    <div className={styles.Banner}>
                        <h2 style={{ margin: '30pt' }}>YouTube channel here</h2>
                    </div>
                </div>
                <div>
                    <div style={{
                        paddingLeft: '50pt', paddingRight: '50pt', marginTop: "30pt",
                        fontSize: '3vh', display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>ALL PRODUCTS</div>
                        <div>FILTER</div>
                    </div>
                </div>
                <div>
                    <div style={{ padding: "20pt", display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
                        {
                            this.state.productItems.map((item, index) => (
                                <Link key={index} href={'/ItemDetails'}>
                                    <div  className={styles.itemCard}>
                                        <div className={styles.itemContentBox}>
                                            <div style={{ height: "220pt", backgroundColor: 'pink', width: '100%', }}>

                                            </div>
                                            <div style={{ padding: '10pt', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80pt', }}>
                                                <div style={{ fontSize: '2.2vh' }}>Half sleeve T-Shirt</div>
                                                <div><div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹400</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div></div>
                                                <div style={{ color: 'green' }}>30% OFF</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
