import axios from 'axios';
import Link from 'next/link';
import React, { Component } from 'react'
import styles from './Channel.module.css';
import { apiip, gqlip, QueryG } from '../lib/serverConfig';

export default class Channel extends Component {

    constructor() {
        super()
        this.state = {
            productItems: [],
            banners: []
        }
    }

    componentDidMount() {
        QueryG(`{
            products{
            edges{
              node{
                id
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
        QueryG(`{
            banner{
                id
                image
              }
        }`)
            .then(res => {
                // console.log(res.data.data.banner);
                this.setState({banners:res.data.data.banner})
                console.log(this.state.banners);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div style={{ marginTop: '2vh', marginBottom: '5vh' }}>
                <div className="container-fluid">
                    <div 
                    style={{
                        backgroundSize:"cover",
                        backgroundPosition:"center",
                        backgroundRepeat:"no-repeat",backgroundImage:`url(${apiip}${this.state.banners[0] !== undefined?this.state.banners[0].image:""})`}}
                    className={styles.Banner}>
                        {/* <h2 style={{ margin: '30pt' }}>{`url(${apiip}${this.state.banners[0] !== undefined?this.state.banners[0].image:""})`}</h2> */}
                    </div>
                </div>
                <div className='container-fluid'>
                    <div style={{
                        marginTop: "30pt",
                        fontSize: '3vh', display: 'flex',
                        justifyContent: 'space-between', marginBottom: '3vh'
                    }}>
                        <div>ALL PRODUCTS</div>
                        <div>FILTER</div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div
                        className='row'>
                        {
                            this.state.productItems.map((item, index) => (
                                <div key={index} className='col-lg-2 col-md-3 col-sm-6'>
                                    <Link className="col-12" href={`/ItemDetails/${item.node.id}`}>
                                        <div className={styles.itemCard}>
                                            <div className={styles.itemContentBox}>
                                                <div style={{
                                                    height: "220pt", backgroundColor: 'pink', width: '100%',
                                                    backgroundImage: `url(${apiip}${item.node.image[0].image})`,
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
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>
        )
    }
}
