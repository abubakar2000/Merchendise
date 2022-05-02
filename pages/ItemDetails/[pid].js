import style from './ItemDetails.module.css';
import React, { Component } from 'react'
import Image from 'next/image';
import { withRouter } from 'next/router';
import { apiip, MutationP, QueryG } from '../../lib/serverConfig';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import { GetRefreshToken } from '../../lib/CookieLib';

class ItemDetails extends Component {
    constructor(props) {
        super(props)
        let { pid } = this.props.router.query;

        this.state = {
            pid: pid,
            productColor: [], //related Items
            selectedColorIndex: 0,
            sizes: ["S", "M", "L", "XL", "2XL"],
            selectedSize: "S",
            quantity: 0,
            images: ['/assets/heart.png'],
            title: "",
            price: "",
            description: "",
            selectedColorId:0,

            productItems: [], //related Items
            infoTab: ["Description", "Return Policy"],
            infoTabIndex: 0,
        }

        this.loadData()
    }

    componentDidMount() {
        console.log(GetRefreshToken());
        this.loadData()
    }

    addToWishList= () => {
        MutationP(`mutation {
            addItemToWhishlist(productId:"${this.state.pid}"){
              whishList{
                id
              }
            }
          }`)
          .then((res) => {
              console.log(res.data);
          })
          .catch((err) => {
              console.log(err);
          })
    }
    addToBag = () => {
        MutationP(`mutation {
            addItemToCart(colorId:${this.state.selectedColorId},productId:"${this.state.pid}",quantity:${this.state.quantity}){
              success
              totalBill
              itemBill
              discountPrice
              deliveryCharges
            }
          }`)
          .then((res) => {
              console.log(res.data);
          })
          .catch((err) => {
              console.log(err);
          })
    }

    loadData = () =>{
        let { pid } = this.props.router.query;
        this.setState({ pid: pid });
        QueryG(`{
            products(id:"${this.state.pid}"){ 
            edges{
              node{
                id
                title
                price
                quantity
                description
                category{
                  categoryName
                }
                image{
                  imageName
                  image
                }
                colors{
                 color
                 id
                }
                reviewsSet{
                  rating
                  review
                  user{
                    firstName
                  }
                }
              }
            }
          }
        }`)
            .then(res => {
                console.log(res.data.data.products.edges[0]);
                this.setState({
                    productColor: res.data.data.products.edges[0].node.colors,
                    images: res.data.data.products.edges[0].node.image,
                    title: res.data.data.products.edges[0].node.title,
                    price: res.data.data.products.edges[0].node.price,
                    description: res.data.data.products.edges[0].node.description,
                    selectedColorId:res.data.data.products.edges[0].node.colors[0].id,
                    selectedColorIndex:0
                })
            })
            .catch(err => {
                console.log(err);
            })

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
    }
    selectSize = (size) => {
        this.setState({ selectedSize: size })
    }
    selectColor = (colIndex,id) => {
        this.setState({ 
            selectedColorIndex: colIndex,
            selectedColorId:id
        })
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
                            <Carousel variant="dark">
                                {
                                    this.state.images.map(images => (
                                        <Carousel.Item key={images.imageName}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img
                                                src={apiip + images.image}
                                                style={{ height: '70vh', }}
                                            />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div className='col-lg-4'>
                            <div className='container'>
                                <div>
                                    {this.state.title}
                                </div>
                                <div>
                                    <div style={{ fontSize: 'x-large', display: 'inline', fontWeight: 'bold' }}>₹{this.state.price}</div> <div style={{ textDecorationLine: 'line-through', fontSize: 'medium', display: 'inline', marginLeft: '10pt', color: 'gray' }}>₹{this.state.price}</div>
                                </div>
                                <div>
                                    30% OFF
                                </div>
                                <div>
                                    <div>
                                        Choose Color
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        {
                                            this.state.productColor.map((prd, index) => (
                                                <div
                                                    onClick={() => this.selectColor(index,prd.id)}
                                                    style={{ transition: '0.3s', fontSize: 'small', color: prd.color, border: `${index === this.state.selectedColorIndex ? `2px solid ${prd.color}` : "1px solid rgb(197, 197, 197)"}` }}
                                                    className={style.optionBubble}>
                                                    {prd.color}
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
                                            <Image src='/assets/chart.png' width={'20pt'} height={'20pt'} alt="" /> <div style={{ marginLeft: '10pt' }}>SIZE CHART</div>
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
                                        <Image 
                                        onClick={this.addToWishList}
                                        src={'/assets/heart.png'} height={'20pt'} width={'20pt'} />
                                    </div>
                                    <button className={style.scaleable} 
                                    onClick={this.addToBag}
                                    style={{
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
                                    <div style={{ fontSize: '1.8vh', marginBottom: '10pt', color: 'rgb(120,120,120)' }}>{this.state.description}</div>
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
                                            <Link key={index} 
                                            href={`/ItemDetails/${item.node.id}`}>
                                                <div 
                                                onClick={()=>this.loadData()}
                                                className={style.itemCard}>
                                                    <div className={style.itemContentBox}>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemDetails)