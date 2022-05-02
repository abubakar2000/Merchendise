import style from './ItemDetails.module.css';
import React, { Component } from 'react'
import Image from 'next/image';
import { withRouter } from 'next/router';
import { QueryG } from '../../lib/serverConfig';

class ItemDetails extends Component {
    constructor(props) {
        super(props)
        const { pid } = this.props.router.query;

        this.state = {
            pid: pid,
            productItems: [1, 2, 3, 4, 5,], //related Items
            selectedProductIndex: 0,
            sizes: ["S", "M", "L", "XL", "2XL"],
            selectedSize: "S",
            quantity: 0,
            infoTab: ["Description", "Return Policy"],
            infoTabIndex: 0,
        }
    }

    componentDidMount() {
        this.setState({ pid: this.props.router.query });
        QueryG(`{
            products(id:"${this.state.pid}"){
            edges{
              node{
                id
                title
              }
            }
          }
        }`)
            .then(res => {
                console.log(res.data.data.products.edges[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    selectSize = (size) => {
        this.setState({ selectedSize: size })
    }
    selectProduct = (prdIndex) => {
        this.setState({ selectedProductIndex: prdIndex })
    }
    increment = () => {
        this.setState({ quantity: this.state.quantity + 1 })
    }
    decrement = () => {
        if (this.state.quantity !== 0) {
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }
    setTab = (index) => {
        this.setState({ infoTabIndex: index })
    }
    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            carousel
                        </div>
                        <div className='col-lg-4'>
                            <div className='container'>
                                <div>
                                    Jet black half sleeve t-shirt
                                </div>
                                <div>
                                    <div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹400</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div>
                                </div>
                                <div>
                                    30% OFF
                                </div>
                                <div>
                                    <div>
                                        Choose Color (Beige)
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        {
                                            this.state.productItems.map((prd, index) => (
                                                <div
                                                    onClick={() => this.selectProduct(index)}
                                                    style={{ transition: '0.3s', border: `${index === this.state.selectedProductIndex ? "2px solid #53bab9" : "1px solid rgb(197, 197, 197)"}` }}
                                                    className={style.optionBubble}>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div>
                                        Choose Size
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        {
                                            this.state.sizes.map(size => (
                                                <div
                                                    onClick={() => this.selectSize(size)}
                                                    style={{
                                                        transition: '0.3s', border: `${size === this.state.selectedSize ? "2px solid #53bab9" : "1px solid rgb(197, 197, 197)"}`,
                                                        color: `${size === this.state.selectedSize ? "#53bab9" : "rgb(197, 197, 197)"}`
                                                    }}
                                                    className={style.optionBubble}>
                                                    {size}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div style={{ marginBottom: '5pt' }}>
                                        Qualtity
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <div style={{ display: 'flex', border: '1pt solid rgb(220,220,220)', borderRadius: '5pt', cursor: 'default' }}>
                                            <div className={style.qtyBtns}
                                                onClick={this.decrement}>-</div>
                                            <input className={style.qtyInput} value={this.state.quantity}
                                                onChange={(e) => this.setState({ quantity: e.target.value })}
                                            />
                                            <div className={style.qtyBtns}
                                                onClick={this.increment}>+</div>
                                        </div>
                                        <div style={{ marginLeft: '30pt', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                            <img src='assets/chart.png' style={{ height: '20pt' }} /> <div style={{ marginLeft: '10pt' }}>SIZE CHART</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20pt', display: 'flex', }}>
                                    <input className={style.FormInputPinCode}
                                        placeholder="Enter Country Code" />
                                    <button className={style.FormInputPinCodeBtn}>Check</button>
                                </div>
                                <div style={{ fontSize: '1.15vh', textAlign: 'center', marginTop: '5pt' }}>ENTER PIN CODE TO CHECK DELVERY TIME & PAY ON DELIVERY AVAILABILITY</div>
                                <div style={{ display: 'flex', marginTop: '2vh' }}>
                                    <div style={{ margin: '5pt', borderRadius: '5pt', height: '30pt', border: '2px solid #53bab9', width: '30pt', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image src={'/assets/heart.png'} height={'20pt'} width={'20pt'} />
                                    </div>
                                    <button className={style.scaleable} style={{
                                        margin: '5pt', borderRadius: '5pt', backgroundColor: '#53bab9', color: 'white',
                                        height: '30pt', border: '2px solid #53bab9', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', paddingLeft: '40pt', paddingRight: '40pt'
                                    }}>ADD TO BAG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12' style={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                this.state.infoTab.map((tab, index) => (
                                    <div
                                        onClick={() => this.setTab(index)}
                                        style={{
                                            paddingBottom: '10pt',
                                            transition: '0.2s',
                                            margin: '15pt', cursor: 'pointer', color: this.state.infoTabIndex === index ? "#53bab9" : "gray",
                                            borderBottom: this.state.infoTabIndex === index ? "2px solid #53bab9" : "2px solid transparent",
                                        }}>{tab}</div>
                                ))
                            }
                        </div>

                        {
                            <div style={{ padding: '40pt' }}>
                                <div style={{ fontSize: '2.5vh' }}>Return Policy</div>
                                <ul>
                                    <li style={{ margin: '5pt', fontSize: '2.2vh', color: 'gray' }}>100% Cottom</li>
                                    <li style={{ margin: '5pt', fontSize: '2.2vh', color: 'gray' }}>Made In India</li>
                                </ul>
                                <div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>Amp your style with this YUMM Men's Round Neck Varsity Half Sleeve T-Shirt. Style this t-shirt with a pair of jeans andsliders for a get-together with friends.</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>Country of Origin : India</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>REGULAR FIT</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>Fitted at Chest and Straight on Waist Down</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>180 GSM SJ COTTON, COTTON LYCRA</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10vh', color: 'rgb(120,120,120)' }}>Classic, lightweight jersey fabric comprising 100% cotton.</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(70,70,70)' }}>15 DAY RETURNS & EXCHANGE</div>
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(70,70,70)' }}>Easy returns upto 15 days of delivery. Exchange available on select pincodes</div>
                                </div>

                            </div>
                        }
                        <div>
                            <div style={{ paddingLeft: '30pt', paddingTop: '30pt', paddingRight: '30pt' }}>
                                <div style={{ fontSize: '2.4vh', letterSpacing: '2pt' }}>FEATURED PRODUCTS</div>
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
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemDetails)