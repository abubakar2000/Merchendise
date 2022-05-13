import React, { Component } from 'react'
import style from './Wishlist.module.css';
import { gqlip, QueryG, token } from '../lib/serverConfig'
import axios from 'axios';

export default class Wishlist extends Component {
    constructor() {
        super()
        this.state = {
            productItems: [],
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData () {
        var data = JSON.stringify({
            query: `query{
            whishList{
              id
              user{
                id
              }
              product{
                edges{
                  node{
                    id
                    image{
                      image
                    }
                  }
                }
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
                'Authorization':token,
            },
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.data.whishList !== null) {
                    console.log(response.data.data.whishList);
                    this.setState({ productItems: response.data.data.whishList })
                } else {
                    console.log(response.data.errors);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

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
                                    <div style={{ paddingLeft: '15pt', paddingRight: '15pt' }}>
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
