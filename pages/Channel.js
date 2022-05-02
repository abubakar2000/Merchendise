import axios from 'axios';
import Link from 'next/link';
import React, { Component } from 'react'
import styles from './Channel.module.css';
import { apiip, gqlip, QueryG } from './serverConfig';

export default class Channel extends Component {

    constructor() {
        super()
        this.state = {
            productItems: []
        }
    }

    componentDidMount() {
        QueryG(`{
            products{
            edges{
              node{
                title
                price
                image{
                    image
                }
              }
            }
          }
        }`)
            .then(res => {
                this.setState({ productItems: res.data.data.products.edges })
                console.log(res.data.data.products.edges);
            })
            .catch(err => {
                console.log(err);
            })
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
                                    <div className={styles.itemCard}>
                                        <div className={styles.itemContentBox}>
                                            <div style={{
                                                height: "220pt", backgroundColor: 'pink', width: '100%',
                                                backgroundImage: `url(${apiip}/${item.node.image[0].image})`,
                                                backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                            }}>
                                            </div>
                                            <div style={{ padding: '10pt', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80pt', }}>
                                                <div style={{ fontSize: 'x-largevh' }}>{item.node.title}</div>
                                                <div><div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹{item.node.price}</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div></div>
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
