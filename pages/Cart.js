import React, { Component, useEffect } from 'react'
import style from './Cart.module.css';
import Stepper from './components/Stepper';
import { apiip, gqlip, RefreshToken_Lib, token } from '../lib/serverConfig'
import axios from 'axios';
import { GetEmail, GetPassword, GetRefreshToken, GetToken, } from '../lib/CookieLib';
const CartItem = ({
    title, price, image, pid
}) => {
    const RemoveProduct = (id) => {
        RefreshToken_Lib(GetEmail(), GetPassword()).then(_ => {
            console.log("Token Updated");
            var config = {
                url: gqlip,
                headers: {
                    'Content-Type': '*/*',
                    'Authorization': token,
                },
            };

            fetch(gqlip, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':token
                },
                body: JSON.stringify({
                    query: `mutation{deleteCartItem(cartItemId:"${id}"){totalBill itemBill discountPrice deliveryCharges success error } }`,
                }),
            })
                .then((res) => res.json())
                .then((result) => console.log(result));


            // Previous code
            // axios.post(config.url, {
            //     query: `mutation{deleteCartItem(cartItemId:${id}){totalBill itemBill discountPrice deliveryCharges success error } }`
            // }, { headers: config.headers })
            //     .then(function (response) {
            //         console.log("Success");
            //         console.log(response.data);
            //     })
            //     .catch(function (error) {
            //         console.log("Error");
            //         console.log(error);
            //     });
        });
    }

    return (
        <div className='col-12' style={{ minHeight: '20vh', borderBottom: '1px solid rgb(220,220,220)', paddingTop: '10pt', paddingBottom: '10pt' }}>
            <div className='row'>
                {/* {`${apiip}${image}`} */}
                <div className='col-md-3' style={{ minHeight: '35vh', background: `url(${apiip}${image})` }}>
                </div>
                <div className='col-md-9' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '20pt' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                        <div style={{ marginTop: '1vh' }}>
                            <div>{title}</div>
                            <div><div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹{price}</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹400</div> <div style={{ marginLeft: '10pt', color: 'red' }}>30% OFF</div></div>
                        </div>
                        <div>
                            <img src='assets/close.png'
                                onClick={() => {
                                    RemoveProduct(pid)
                                }}
                                style={{ height: '20pt', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div style={{ paddinTop: '2vh', paddingBottom: '1vh' }}>
                        <div>Size: (M)</div>
                        <div>Colour: Yellow</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{
                                display: 'flex', border: '1pt solid rgb(220,220,220)',
                                borderRadius: '5pt', cursor: 'default', width: 'fit-content',
                                marginTop: '1vh'
                            }}>
                                <div className={style.qtyBtns}
                                    onClick={() => { }}>-</div>
                                <input className={style.qtyInput} value={2} />
                                <div className={style.qtyBtns}
                                    onClick={() => { }}>+</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div>100% ORIGINAL</div>
                            <div>RETURN WITHIN 15 DAYS</div>
                        </div>
                        {/* <img src='assets/heart.png' style={{ height: '20pt' }} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cartItems: [],
            itemBill: 0,
            totalBill: 0,
            discountPrice: 0,
            deliveryCharges: 0,
            discountCoupendiscount: 0,
            cartItemId: 0
        }
    }
    componentDidMount() {
        this.getCartItem()

    }
    getCartItem() {
        RefreshToken_Lib(GetEmail(), GetPassword())
            .then(() => {
                console.log("Token Updated");
            })
        var data = JSON.stringify({
            query: `query{
            cart{
              id
                  items{
                product{
                  id
                  title
                  price
                  image{
                    image
                }
                }
                quantity
              }
              itemBill
              totalBill
              discountPrice
              discountCoupen{
                discount
                description
              }
              deliveryCharges
            }
          }`,
            variables: {}
        });

        var config = {
            method: 'post',
            url: gqlip,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.data.cart !== null) {
                    console.log(response.data.data.cart);
                    this.setState({
                        cartItems: response.data.data.cart[0].items,
                        itemBill: response.data.data.cart[0].itemBill,
                        totalBill: response.data.data.cart[0].totalBill,
                        discountPrice: response.data.data.cart[0].discountPrice,
                        deliveryCharges: response.data.data.cart[0].deliveryCharges,
                        discountCoupendiscount: response.data.data.cart[0].discountCoupen === null ? 0 : response.data.data.cart[0].discountCoupen.discount,
                    })
                } else {
                    console.log(response.data.errors);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className='container-fluid' style={{ paddingBottom: '5vh' }}>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='container'>
                                <div style={{ fontSize: '3vh', letterSpacing: '2pt', marginBottom: '1vh' }}>MY BAG</div>
                                <div style={{ height: '70vh', overflowY: 'scroll', overflowX: 'hidden', padding: '15pt', }}>
                                    {
                                        this.state.cartItems.map(item => (
                                            <div key={item.product.title}>
                                                <CartItem
                                                    title={item.product.title}
                                                    price={item.product.price}
                                                    image={item.product.image[0].image}
                                                    pid={item.product.id}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <Stepper width={'33%'} />
                            <div className='border' style={{ borderRadius: '10pt' }}>
                                <table style={{ width: '100%' }}>
                                    <tbody style={{ textAlign: 'start', border: '1px solid transparent' }}>
                                        <tr className={style.tableRow}>
                                            <td colspan='2'><div style={{ margin: '10pt', fontSize: '2vh', textAlign: 'center' }}>Total Price</div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>Items ({this.state.cartItems.length})</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.totalBill} INR</div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>Discount</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.discountPrice} INR</div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>Delivery Charges</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.deliveryCharges === 0 ? "None" : this.state.itemBill}</div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ marginLeft: '10pt', marginBottom: '20pt', fontSize: '1.8vh' }}>Apply Coupons</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>
                                                <input style={{ border: '1px solid #53bab9', borderRadius: '5pt', width: '100%' }} />
                                                <div style={{ fontSize: '1.5vh', cursor: 'pointer', textAlign: 'end', marginTop: '5pt', marginRight: '10pt' }}>Browse Coupons</div>
                                            </div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>Coupon Discount</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.discountCoupendiscount} INR</div></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{ textAlign: 'center' }}>
                                                <button style={{ margin: '10pt', backgroundColor: '#53bab9', color: 'white' }} className="btn">Proceed to Checkout</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
