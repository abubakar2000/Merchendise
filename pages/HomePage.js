import Image from 'next/image'
import React, { Component, useState } from 'react'
import { QueryG } from '../lib/serverConfig'
import Link from 'next/link'
import styles from './Channel.module.css';
import { apiip } from '../lib/serverConfig';

const FeaturedCreator = ({ name, image, payload, id }) => {
  const [Hovered, setHovered] = useState(false)
  return (
    <Link href={`/Channel/${name}`}>
      <div className='col-lg-3 col-md-6' style={{ padding: '20pt' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            height: '40vh', backgroundImage: `url(/assets/${image})`,
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', cursor: 'default'
          }}>
          {
            Hovered &&
            <div style={{
              height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ color: 'white', fontSize: 'x-large' }}>
                {name}
              </div>
            </div>
          }
        </div>
      </div>
    </Link>
  )
}

export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isBeingSearched: false,
      productItems: [],
      featuredCreators: [
        {
          name: "Don't know who?",
          image: "happyman.png",
          payload: {}
        },
        {
          name: "Nina",
          image: "woman.png",
          payload: {}
        },
        {
          name: "Steph",
          image: "woman2.png",
          payload: {}
        },
        {
          name: "Alina",
          image: "woman3.png",
          payload: {}
        },
      ]
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
  }
  render() {
    return (
      <div>
        <div style={{
          height: '60vh', backgroundImage: "url(/assets/bg2.jpg)", backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '10vh'
        }}>

          <div style={{
            height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
          }}>
            {
              !this.state.isBeingSearched &&
              <div>
                <button className='btn' style={{
                  paddingLeft: '25pt', paddingRight: '25pt', paddingTop: '5pt',
                  paddingBottom: '5pt', backgroundColor: '#53bab9', margin: '15pt', fontSize: '20pt', color: 'white', fontWeight: 'bold'
                }} onClick={() => {
                  this.setState({ isBeingSearched: true })
                }}>
                  Search
                </button>
                <button className='btn' style={{
                  paddingLeft: '25pt', paddingRight: '25pt', paddingTop: '5pt',
                  paddingBottom: '5pt', backgroundColor: '#53bab9', margin: '15pt', fontSize: '20pt', color: 'white', fontWeight: 'bold'
                }}>
                  Print
                </button>
              </div>
            }
            {
              this.state.isBeingSearched &&
              <div>
                <style jsx>
                  {
                    `
                    .inputField::placeholder {
                      font-size:14pt;
                      color:rgb(200,200,200);
                    }
                    .inputField:active {
                      outline:none;
                    }
                    .inputField:focus {
                      outline:none;
                    }
                    `
                  }
                </style>
                <div className='input-group' style={{ marginBottom: '35pt' }}>
                  <input
                    className='inputField form-control'
                    style={{
                      paddingLeft: '25pt', paddingRight: '25pt', paddingTop: '7pt', paddingBottom: '7pt',
                      backgroundColor: 'white', fontSize: '14pt', color: 'rgb(100,100,100)'
                    }}
                    placeholder="Search Content Creator" />
                  <button onClick={() => {
                    this.setState({ isBeingSearched: false })
                  }}
                    style={{ paddingLeft: '20pt', paddingRight: '20pt' }}
                    className='btn btn-outline-light'>
                    Search
                  </button>
                </div>
              </div>
            }

            <div className='container text-light text-center' style={{
              fontSize: '15pt', textAlign: 'center', marginTop: '10pt', fontWeight: '200',
              letterSpacing: '1pt', color: 'white'
            }}>
              A simple solution for creating and selling products that engage <br /> you fans and help you monetize your content <br /> no cost, no hassle, no risk
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-7' style={{ padding: '5%' }}>
              <div style={{
                height: '60vh', width: '100%', backgroundImage: 'url(/assets/joinusPage.png)',
                backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '7pt'
              }}>
              </div>
            </div>
            <div className='col-md-5' style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              paddingLeft: '20pt', paddingRight: '20pt', textAlign: 'center'
            }}>
              <h4>
                JOIN US & SELL YOUR OWN MERCHENDISE
              </h4>
              <br />
              <p style={{ fontWeight: '200' }}>
                Now you can join us and sell you merchendise completely free without any hidden charges.
                Create your own Brand and Monetize.
                Join us today and become a part of everything growing.
                Clossum Family
              </p>
              <button className='btn' style={{
                paddingLeft: '25pt', paddingRight: '25pt', paddingTop: '5pt',
                paddingBottom: '5pt', backgroundColor: '#53bab9', margin: '15pt', fontSize: '20pt', color: 'white', fontWeight: 'bold'
              }}>
                JOIN
              </button>
            </div>
          </div>
        </div>
        <div className='container-fluid' style={{ padding: '5%' }}>
          <div
            className='row'>
            {
              this.state.productItems.map((item, index) => (
                <div key={index} className='col-lg-2 col-md-6 col-6'>
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
        <div className='container-fluid' style={{ padding: '5%' }}>
          <div style={{ backgroundColor: '#f2f2f2', borderRadius: '5pt', overflow: 'hidden' }}>
            <div className='row flex-wrap-reverse'>
              <div className='col-md-5' style={{
                minHeight: '70vh', padding: '6%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', textAlign: 'center',
              }}>
                <h4 style={{ letterSpacing: '4pt', marginBottom: '3vh' }}>WANT TO PLACE BULK ORDER?</h4>
                <p>
                  In publishing graphic design, Lorem Ipsum is the placeholder text commonly used to demonstrate
                  the visual form of a document or a typeface without relying on the meaningful content. Lorem Ipsum
                  may be used as place holder on the final copy.
                </p>
                <button className='btn' style={{
                  paddingLeft: '25pt', paddingRight: '25pt', paddingTop: '5pt',
                  paddingBottom: '5pt', backgroundColor: '#53bab9', margin: '15pt', fontSize: '20pt', color: 'white', fontWeight: 'bold'
                }}>
                  PLACE HOLDERS
                </button>
              </div>
              <div className='col-md-7' style={{
                backgroundImage: 'url(/assets/secondaryImage.png)',
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', minHeight: '60vh',
              }}>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid' style={{ padding: '5%' }}>
          <h4 style={{ fontWeight: '300', marginBottom: '5vh', letterSpacing: '2pt' }}>FEATURED CREATORS</h4>

          <div className='row'>
            {
              this.state.featuredCreators.map((creators,index) => (
                <FeaturedCreator id={index} name={creators.name} image={creators.image} payload={creators.payload} />
              ))
            }
          </div>
        </div>
        <div className='container-fluid' style={{ textAlign: 'center', paddingBottom: '5%' }}>
          <h1 style={{ fontFamily: 'serif', letterSpacing: '10pt', color: '#53bab9', fontSize: '5vh' }}>
            CLOSSUM MAKES EVERYDAY <br /> AWESOME
          </h1>
        </div>
      </div >
    )
  }
}