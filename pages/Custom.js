import { Dropdown } from 'react-bootstrap';
import React, { Component, useEffect, useState } from 'react'
import styles from './Custom.module.css';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { fabric } from 'fabric';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className={styles.dropdownToggle}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        <div>{children}</div>
        <div>
            &#x25bc;
        </div>
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
        <div style={{ height: '15pt', width: '15pt', backgroundColor: children, borderRadius: '8pt' }}></div>
        <div>&#x25bc;</div>
    </div>
));
const ItemVariation = ({ path, add_image }) => {
    const [Hovered, setHovered] = useState(false)
    return (
        <div className={styles.CustomItems}
            onClick={() => add_image(path)}
            onMouseEnter={() => {
                setHovered(true)
            }}
            onMouseLeave={() => {
                setHovered(false)
            }}>
            <>
                <div style={{ transition: '0.5s', height: Hovered !== false ? '0pt' : '70%', width: '100%', background: `url(${path})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                </div>
                <div style={{
                    height: Hovered !== false ? '0pt' : '30%', width: "100%", display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
                }}>
                    <div style={{ fontSize: 'small' }}>Regular Quality</div>
                    <div style={{ fontSize: 'medium' }}>₹400 - ₹599</div>
                </div>
            </>
            <div style={{ transition: '0.5s', height: Hovered !== true ? '0pt' : '100%', overflow: 'hidden' }}>
                <div style={{
                    height: '100%', width: '100%', backgroundColor: 'white',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>M,L,XL,2XL</div>
                    <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>Made with 100% cotton</div>
                    <div style={{ marginBottom: '5pt', fontSize: 'medium' }}>400-599 INR</div>
                </div>
            </div>
        </div>
    )
}
const Custom = () => {
    const [Front, setFront] = useState(true)
    const { editor, onReady } = useFabricJSEditor()


    const [shirtText, setShirtText] = useState("")

    const [OutlineWidth, setOutlineStyle] = useState(1)
    const [OutlineColor, setOutlineColor] = useState("")
    const [TextColor, setTextColor] = useState("black")
    const [TextFont, setTextFont] = useState("Ariel")
    const add_image = (imagePath) => {
        fabric.Image.fromURL(imagePath, (oImg) => {
            oImg.scaleToHeight(240)
            oImg.scaleToWidth(240)
            if (Front === true) {
                editor.canvas.add(oImg)
                editor.canvas.centerObject(oImg)
            }
        })
    }


    const add_text = (text, {
        fontFamily,
        stroke,
        strokeWidth,
        fill
    }) => {

        var text = new fabric.Text(text, {
            fontFamily: fontFamily,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
        if (Front === true) {
            editor.canvas.add(text)
        }
    }

    const saveCanvas = () => {
        var dataUrl = editor.canvas.toDataURL({
            format: 'png',
            quality: 0.6,
        });
        var address = dataUrl
        var img = document.getElementById('ExportedImage')
        // img.src = address
    }



    return (
        <div>
            <img id='ExportedImage' src='' />
            <div className='container-fluid' style={{ paddingLeft: '2%', paddingRight: '2%' }}>
                <div className='row'>
                    <div style={{ paddingTop: '10pt', paddingBottom: '10pt' }} className='col-md-4'>
                        {/* fabric js */}
                        {/* <div className='btn-group col-12'>
                            <button
                                onClick={() => setFront(true)}
                                className={`btn ${Front === true ? styles.frontBackBtnActive : styles.frontBackBtn}`}>
                                FRONT
                            </button>
                            <button
                                onClick={() => setFront(false)}
                                className={`btn ${Front === false ? styles.frontBackBtnActive : styles.frontBackBtn}`}>
                                BACK
                            </button>
                        </div> */}
                        <div>
                            {
                                Front === true &&
                                <FabricJSCanvas id="canvas_id" className={styles.canvas} onReady={onReady} />
                            }
                            {/* {
                                Front === false &&
                                <FabricJSCanvas id="canvas_id_back" className={styles.canvas} onReady={onReady} />
                            } */}
                            {/* <button className='btn btn-outline-dark'
                                onClick={() => saveCanvas()}>Save</button> */}
                            <button
                                className={`btn ${styles.frontBackBtn}`}
                                style={{ marginTop: '20pt' }}
                                onClick={() => {
                                    editor.canvas.remove(editor.canvas.getActiveObject())
                                }}>Remove Selected</button>
                        </div>
                    </div>
                    <div style={{ paddingTop: '10pt', paddingBottom: '10pt', }} className='col-md-5'>
                        {/* slider */}
                        {/* <h4 style={{ fontWeight: '400' }}>ART & TEXT</h4>
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
                        </div> */}
                        <div style={{ padding: '15pt', display: 'flex', }}>
                            <ItemVariation path={'assets/custom/shirt_green.png'} add_image={add_image} />
                        </div>
                    </div>
                    <div style={{ paddingTop: '10pt', paddingBottom: '10pt' }} className='col-md-3'>
                        {/* Form */}
                        <h4 style={{ marginBottom: '20pt', fontWeight: '400' }}>UPLOAD ART</h4>
                        <label for="uploadItem" className={styles.uploadButton}>UPLOAD</label>
                        <input id='uploadItem' accept='image/*' onChange={(event) => {
                            var image = document.getElementById('uploadedArt');
                            image.src = URL.createObjectURL(event.target.files[0]);
                            add_image(image.src)

                        }} type={'file'} hidden />
                        <image id='uploadedArt' style={{ height: '300pt', width: '300pt' }} />
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
                                                {TextFont}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setTextFont("cursive")}>
                                                    <div style={{ fontFamily: "cursive" }}>{shirtText===""?"cursive":shirtText}</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextFont("fantasy")}>
                                                    <div style={{ fontFamily: "fantasy" }}>{shirtText===""?"fantasy":shirtText}</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextFont("monospace")}>
                                                    <div style={{ fontFamily: "monospace" }}>{shirtText===""?"monospace":shirtText}</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextFont("sans-serif")}>
                                                    <div style={{ fontFamily: "sans-serif" }}>{shirtText===""?"sans-serif":shirtText}</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextFont("serif")}>
                                                    <div style={{ fontFamily: "serif" }}>{shirtText===""?"serif":shirtText}</div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='col-md-4'>
                                        <Dropdown>
                                            <Dropdown.Toggle as={CustomToggleColored} id="dropdown-basic">
                                                {TextColor}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setTextColor("red")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Red</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextColor("blue")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'blue', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Blue</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextColor("green")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'green', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Green</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setTextColor("orange")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'orange', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Orange</div>
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
                                                Stroke {OutlineWidth}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setOutlineStyle(1)}>
                                                    1
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOutlineStyle(2)}>
                                                    2
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOutlineStyle(3)}>
                                                    3
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='col-md-4'>
                                        <Dropdown>
                                            <Dropdown.Toggle as={CustomToggleColored} id="dropdown-basic">
                                                {OutlineColor}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setOutlineColor("red")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'red', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Red</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOutlineColor("blue")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'blue', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Blue</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOutlineColor("green")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'green', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Green</div>
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOutlineColor("orange")}>
                                                    <div style={{ display: 'flex', }}>
                                                        <div style={{ height: '15pt', width: '15pt', backgroundColor: 'orange', borderRadius: '8pt' }}></div>
                                                        <div style={{ marginLeft: '10pt' }}>Orange</div>
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 'small', marginTop: '20pt', }}>Add Text</div>
                                <input
                                    value={shirtText}
                                    onInput={(event) => setShirtText(event.target.value)}
                                    style={{
                                        paddingLeft: '10pt', paddingLeft: '15pt', paddingRight: '15pt', paddingTop: '3pt',
                                        paddingBottom: '3pt', borderRadius: '20pt', border: '1px solid rgb(200,200,200)',
                                    }} className="form-control" />
                            </div>
                            <div style={{ paddingTop: '15pt', paddingBottom: '15pt', display: 'flex', justifyContent: 'center' }}>
                                <button className={`${styles.tryBtn} btn text-light`}
                                    onClick={() => {
                                        add_text(shirtText, {
                                            fill: TextColor,
                                            fontFamily: TextFont,
                                            stroke: OutlineColor,
                                            strokeWidth: OutlineWidth
                                        })
                                        // setShirtText("")
                                    }}
                                >TRY</button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15pt', paddingBottom: '15pt' }}>
                            <button className={`${styles.proceedBtn} btn text-light`}
                                onClick={() => {
                                    saveCanvas()
                                }}
                            >PROCEED</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Custom
