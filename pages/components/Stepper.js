import React, { Component } from 'react'

export default class Stepper extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='container' style={{ marginBottom: '2vh', marginTop: '2vh', }}>
                <div style={{
                    width: this.props.width, border: '1px solid #53bab9', transform: 'translateY(5.5pt)',
                }}></div>

                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{
                        height: '10pt', width: '10pt', border: "1px solid #53bab9", borderRadius: '5pt',
                        backgroundColor: '#53bab9'
                    }}></div>
                    <div style={{
                        height: '10pt', width: '10pt', border: "1px solid #53bab9", borderRadius: '5pt',
                        backgroundColor: '#53bab9'
                    }}></div>
                    <div style={{
                        height: '10pt', width: '10pt', border: "1px solid rgb(200,200,200)", borderRadius: '5pt',
                        backgroundColor: 'rgb(200,200,200)'
                    }}></div>
                    <div style={{
                        height: '10pt', width: '10pt', border: "1px solid rgb(200,200,200)", borderRadius: '5pt',
                        backgroundColor: 'rgb(200,200,200)'
                    }}></div>
                </div>
            </div>
        )
    }
}
