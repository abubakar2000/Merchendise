import React, { Component } from 'react'
// import styles from './Footer.module.css'

export default class Footer extends Component {
    render() {
        return (
            <div style={{ minHeight: '60vh', backgroundColor: '#1e2733', }}>
                <div className='container'>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', minHeight: '15vh', borderBottom: '1px solid rgb(70,70,70)',
                        marginBottom: '2vh'
                    }}>
                        <img src='/assets/logo.png' style={{ height: '30pt' }} />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ color: 'white', fontSize: '2vh', marginRight: '20pt' }}>Ready to get Started?</div>
                            <button style={{
                                paddingLeft: '20pt', paddingRight: '20pt', paddingTop: '5pt', paddingBottom: '5pt',
                                marginLeft: '10pt', borderRadius: '5pt', border: "1px solid transparent", color: 'purple',
                                backgroundColor: '#ffd2dd',
                            }}>Get Started</button>
                        </div>
                    </div>
                    <div style={{ color: 'white', marginTop: '5vh' }} className="row">
                        <div className='col-lg-3'>
                            <div style={{ fontSize: '2.5vh', marginBottom: '20pt' }}>Subscribe to our newletter</div>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                <style jsx>
                                    {
                                        `
                                            .inputField {
                                                background-color:transparent;
                                                border:1px solid transparent;
                                                border-bottom:1px solid rgb(70,70,70);
                                                color:white;
                                                padding-left:10pt
                                            }
                                            .inputField:focus {
                                                outline:none
                                            }
                                        `
                                    }
                                </style>
                                <input placeholder='Enter email' style={{ height: '30pt', }} className='inputField' />
                                <button className='btn' style={{
                                    borderBottomRightRadius: '0pt',
                                    borderBottomLeftRadius: '0pt',
                                    display: 'flex',
                                    background: '#ffd2dd',
                                    height: '30pt',
                                    color: 'black',
                                    alignItems: 'center',
                                }}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-3' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <div>
                                <div style={{ marginBottom: '15pt' }}>Services</div>
                                <div style={{ marginBottom: '15pt' }}>Email Marketing</div>
                                <div style={{ marginBottom: '15pt' }}>Campaigns</div>
                                <div style={{ marginBottom: '15pt' }}>Branding</div>
                                <div style={{ marginBottom: '15pt' }}>Offline</div>
                            </div>
                        </div>
                        <div className='col-lg-3' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <div>
                                <div style={{ marginBottom: '15pt' }}>About</div>
                                <div style={{ marginBottom: '15pt' }}>Our Story</div>
                                <div style={{ marginBottom: '15pt' }}>Benefits</div>
                                <div style={{ marginBottom: '15pt' }}>Team</div>
                                <div style={{ marginBottom: '15pt' }}>Careers</div>
                            </div>
                        </div>
                        <div className='col-lg-3' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', }}>
                            <div>
                                <div style={{ marginBottom: '15pt' }}>Help</div>
                                <div style={{ marginBottom: '15pt' }}>FAQs</div>
                                <div style={{ marginBottom: '15pt' }}>Contact us</div>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{color:'white',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <div style={{margin:'10pt'}}>
                                Terms and Conditions
                            </div>
                            <div style={{margin:'10pt'}}>
                                Privacy Policy
                            </div>
                        </div>
                        <div>
                            <img src='assets/fb.png'      style={{margin:'5pt' ,height: '30pt', }} />
                            <img src='assets/twitter.png' style={{margin:'5pt' ,height: '30pt', }} />
                            <img src='assets/insta.png'   style={{margin:'5pt' ,height: '30pt', }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
