import React, { Component, useEffect, useState } from 'react'
import style from './Cart.module.css';
import Stepper from './components/Stepper';
import { apiip, gqlip, RefreshToken_Lib, token } from '../lib/serverConfig'
import axios from 'axios';
import { GetEmail, GetPassword, GetRefreshToken, GetToken, } from '../lib/CookieLib';
// const Paytm = require('paytm-pg-node-sdk');
import Paytm from 'paytm-pg-node-sdk'

const makePayment = ({ total, address, email, fname, lname, telno, pincode }) => {
    // For Staging 
    var environment = Paytm.LibraryConstants.STAGING_ENVIRONMENT;

    // For Production 
    // var environment = Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;

    // Find your mid, key, website in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    var mid = "YOUR_MID_HERE";
    var key = "YOUR_KEY_HERE";
    var website = "YOUR_WEBSITE_NAME";
    var client_id = "YOUR_CLIENT_ID_HERE";

    var callbackUrl = "MERCHANT_CALLBACK_URL";
    Paytm.MerchantProperties.setCallbackUrl(callbackUrl);

    Paytm.MerchantProperties.initialize(environment, mid, key, client_id, website);
    // If you want to add log file to your project, use below code
    Paytm.Config.logName = "[PAYTM]";
    Paytm.Config.logLevel = Paytm.LoggingUtil.LogLevel.INFO;
    Paytm.Config.logfile = "/path/log/file.log";


    // making payment
    var channelId = Paytm.EChannelId.WEB;
    var orderId = "UNIQUE_ORDER_ID";
    var txnAmount = Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, total);
    var userInfo = new Paytm.UserInfo("CUSTOMER_ID");
    userInfo.setAddress(address);
    userInfo.setEmail(email);
    userInfo.setFirstName(fname);
    userInfo.setLastName(lname);
    userInfo.setMobile(telno);
    userInfo.setPincode(pincode);
    var paymentDetailBuilder = new Paytm.PaymentDetailBuilder(channelId, orderId, txnAmount, userInfo);
    var paymentDetail = paymentDetailBuilder.build();
    var response = Paytm.Payment.createTxnToken(paymentDetail);
    response
        .then(_ => {
            console.log(_);
        })
        .catch(_ => {
            console.log(_);
        })
}

const CartItem = ({
    title, price, image, pid, qty
}) => {
    const [Qty, setQty] = useState(qty);

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
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `mutation{deleteCartItem(cartItemId:"${id}"){totalBill itemBill discountPrice deliveryCharges success error } }`,
                }),
            })
                .then((res) => {
                    res.json()
                    window.location.href = "/Cart"
                })
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
                                    onClick={() => {
                                        if (Qty - 1 >= 0) {
                                            RefreshToken_Lib(GetEmail(), GetPassword())
                                            var FormData = require('form-data');
                                            var data = new FormData();
                                            setQty(Qty - 1)

                                            data.append('query', `mutation{\n\tupdateCart(cartItemId:"${pid}",quantity:${Qty}){\n    totalBill\n    itemBill\n    discountPrice\n    deliveryCharges\n    cartItem{\n      id\n      product{\n        id\n        image{\n          image\n        }\n      }\n    }\n  }\n}`);

                                            var config = {
                                                method: 'post',
                                                url: gqlip,
                                                headers: {
                                                    'Content-Type': 'application/graphql',
                                                    'Content-Transfer-Encoding': 'multipart/form-data',
                                                },
                                                data: data
                                            };

                                            axios.post(config.url, config.data, {
                                                headers: config.headers
                                            })
                                                .then((response) => {
                                                    console.log("Updated the cart Item");
                                                    console.log(JSON.stringify(response.data));
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        }
                                    }}>-</div>
                                <input className={style.qtyInput} value={Qty} />
                                <div className={style.qtyBtns}
                                    onClick={() => {
                                        RefreshToken_Lib(GetEmail(), GetPassword())
                                        var FormData = require('form-data');
                                        var data = new FormData();
                                        setQty(Qty + 1)

                                        data.append('query', `mutation{\n\tupdateCart(cartItemId:"${pid}",quantity:${Qty}){\n    totalBill\n    itemBill\n    discountPrice\n    deliveryCharges\n    cartItem{\n      id\n      product{\n        id\n        image{\n          image\n        }\n      }\n    }\n  }\n}`);

                                        var config = {
                                            method: 'post',
                                            url: gqlip,
                                            headers: {
                                                'Content-Type': 'application/graphql',
                                                'Content-Transfer-Encoding': 'multipart/form-data',
                                            },
                                            data: data
                                        };

                                        axios.post(config.url, config.data, {
                                            headers: config.headers
                                        })
                                            .then((response) => {
                                                console.log("Updated the cart Item");
                                                console.log(JSON.stringify(response.data));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }}>+</div>
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
            cartItemId: 0,
            fname: "Abubakar",
            lname: "Mughal",
            email: "abu81234@gmail.com",
            telno: "123-1234-123",
            pincode: "123456",
            discountCoupon: "",

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
                                                    qty={0}
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
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.deliveryCharges === 0 ? "None" : this.state.deliveryCharges}</div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ marginLeft: '10pt', marginBottom: '20pt', fontSize: '1.8vh' }}>Apply Coupons</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>
                                                <input style={{ border: '1px solid #53bab9', borderRadius: '5pt', width: '100%' }}
                                                    value={this.state.discountCoupon} onChange={e => this.setState({ discountCoupon: e.target.value })}
                                                />
                                                <div style={{ fontSize: '1.5vh', cursor: 'pointer', textAlign: 'end', marginTop: '5pt', marginRight: '10pt' }}>Browse Coupons</div>
                                                <div style={{ fontSize: '1.5vh', cursor: 'pointer', textAlign: 'end', marginTop: '5pt', marginRight: '10pt' }}
                                                    onClick={() => {
                                                        RefreshToken_Lib(GetEmail(), GetPassword()).then(() => {
                                                            console.log("Updated Refresh Token");
                                                        });
                                                        var data = JSON.stringify({
                                                            query: `mutation{
                                                          checkDiscountCoupen(coupenId:"${this.state.discountCoupon}"){
                                                            coupen{
                                                              id
                                                              copenCode
                                                                  discount
                                                            }
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
                                                            },
                                                            data: data
                                                        };

                                                        axios.post(config.url, config.data, {
                                                            headers: config.headers,
                                                        })
                                                            .then((response) => {
                                                                console.log(JSON.stringify(response.data));
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                            });

                                                    }}>Apply Coupon</div>
                                            </div></td>
                                        </tr>
                                        <tr className={style.tableRow}>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>Coupon Discount</div></td>
                                            <td><div style={{ margin: '10pt', fontSize: '1.8vh' }}>{this.state.discountCoupendiscount} INR</div></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{ textAlign: 'center' }}>
                                                <button style={{ margin: '10pt', backgroundColor: '#53bab9', color: 'white' }} className="btn" onClick={() => {
                                                    makePayment(this.state.totalBill, this.state.email, this.state.fname, this.state.lname,
                                                        this.state.telno, this.state.pincode)
                                                }}>Proceed to Checkout</button>
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
