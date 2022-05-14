import { Dropdown } from 'react-bootstrap';
import React, { Component, useState } from 'react'
import styles from './Custom.module.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className={styles.dropdownToggle}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <div>{children}</div>
        <div>&#x25bc;</div>
    </div>
));
const CustomToggleColored = React.forwardRef(({ children, onClick }, ref) => (
    <div className={styles.dropdownToggle}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
        <div>&#x25bc;</div>
    </div>
));

const ItemVariation = () => {
    const [Hovered, setHovered] = useState(false)
    return (
        <div className={styles.CustomItems}
            onMouseEnter={() => {
                setHovered(true)
            }}
            onMouseLeave={() => {
                setHovered(false)
            }}>
            {Hovered === false &&
                <>
                    <div style={{ height: '70%', width: '100%', backgroundColor: 'red' }}>
                    </div>
                    <div style={{
                        height: '30%', width: "100%", display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <div style={{ fontSize: 'small' }}>Regular Quality</div>
                        <div style={{ fontSize: 'medium' }}>₹400 - ₹599</div>
                    </div>
                </>
            }
            {Hovered === true &&
                <>
                    <div style={{
                        height: '100%', width: '100%', backgroundColor: 'white',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                        flexDirection: 'column', padding: '10pt'
                    }}>
                        <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>M,L,XL,2XL</div>
                        <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>Made with 100% cotton</div>
                        <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>400-599 INR</div>
                    </div>
                </>
            }
        </div>
    )
}

export default class Custom extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div>
                <div className='container-fluid' style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                    <div className='row'>
                        <div style={{ paddingTop: '10pt', paddingBottom: '10pt' }} className='col-md-4'>
                            {/* fabric js */}
                            <div className='btn-group col-12'>
                                <button className={`btn ${styles.frontBackBtn}`}>
                                    FRONT
                                </button>
                                <button className={`btn ${styles.frontBackBtn}`}>
                                    BACK
                                </button>
                            </div>
                        </div>
                        <div style={{ paddingTop: '10pt', paddingBottom: '10pt', }} className='col-md-5'>
                            {/* slider */}
                            <h4 style={{ fontWeight: '400' }}>ART & TEXT</h4>
                            <div className='row col-12'>
                                <div className='col-md-6' style={{ padding: '15pt' }}>
                                    <h6 style={{ fontWeight: '300', }}>CHOOSE PRODUCT</h6>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                            T-Shirt
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">T-Shirt</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className='col-md-6' style={{ padding: '15pt' }}>
                                    <h6 style={{ fontWeight: '300' }}>COLOURS</h6>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggleColored} id="dropdown-basic">
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                <div style={{ display: 'flex', }}>
                                                    <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
                                                    <div style={{ marginLeft: '10pt' }}>Red</div>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div style={{ padding: '15pt', display: 'flex', }}>
                                <ItemVariation />
                            </div>
                        </div>
                        <div style={{ paddingTop: '10pt', paddingBottom: '10pt' }} className='col-md-3'>
                            {/* Form */}
                            <h4 style={{ marginBottom: '20pt', fontWeight: '400' }}>UPLOAD ART</h4>
                            <button className={styles.uploadButton}>UPLOAD</button>
                            <div style={{
                                width: '100%', border: '1px solid rgb(200,200,200)',
                                height: '40vh', marginTop: '30pt', borderRadius: '5pt',
                                padding: '10pt',
                            }}>
                                <div style={{ width: 'fit-content', display: 'flex' }}>
                                    <div style={{ borderBottom: '2pt solid #53bab9', paddingLeft: '5pt', paddingRight: '5pt', marginRight: '5pt', marginLeft: '5pt' }}>
                                        TEXT
                                    </div>
                                    <div style={{ paddingLeft: '5pt', paddingRight: '5pt', marginRight: '5pt', marginLeft: '5pt' }}>
                                        ART
                                    </div>
                                </div>
                                <div>
                                    <div style={{ marginTop: '20pt', fontSize: 'small' }}>Choose Font</div>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                                    Font
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Font a</Dropdown.Item>
                                                    <Dropdown.Item>Font b</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className='col-md-4'>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggleColored} id="dropdown-basic">

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <div style={{ display: 'flex', }}>
                                                            <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
                                                            <div style={{ marginLeft: '10pt' }}>Red</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ marginTop: '20pt', fontSize: 'small' }}>Add Outline</div>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                                    BOLD
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Outline a</Dropdown.Item>
                                                    <Dropdown.Item>Outline b</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className='col-md-4'>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggleColored} id="dropdown-basic">

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <div style={{ display: 'flex', }}>
                                                            <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
                                                            <div style={{ marginLeft: '10pt' }}>Red</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'small', marginTop: '20pt', }}>Add Text</div>
                                    <input style={{
                                        paddingLeft: '10pt', paddingLeft: '15pt', paddingRight: '15pt', paddingTop: '3pt',
                                        paddingBottom: '3pt', borderRadius: '20pt', border: '1px solid rgb(200,200,200)',
                                    }} className="form-control" />
                                </div>
                                <div style={{ paddingTop: '15pt', paddingBottom: '15pt', display: 'flex', justifyContent: 'center' }}>
                                    <button className={`${styles.tryBtn} btn text-light`}>TRY</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center',marginTop:'15pt',paddingBottom:'15pt' }}>
                                <button className={`${styles.proceedBtn} btn text-light`}>PROCEED</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
