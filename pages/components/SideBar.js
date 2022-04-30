import React, { Component } from 'react'
import styles from './SideBar.module.css';

export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 59,
      OtpSent: false,
      email: "",
      EmailVerifiedForSignUp: false,
      Signup: true
    }

  }

  SendOtp = () => {
    this.setState({ OtpSent: true })
    this.setState({ timer: 59 })
    this.StartCountDown();
  }
  CountdownInt = undefined
  StartCountDown = () => {
    this.CountdownInt = setInterval(() => {
      if (this.state.timer === 1) {
        this.StopCountDown()
      }
      this.setState({ timer: this.state.timer - 1 })
    }, 1000);
  }
  StopCountDown = () => {
    clearInterval(this.CountdownInt)
  }
  SignUpUser = () => {
  }

  closeSideBar = () => {
    document.getElementById('SideBar').style.transform = "translateX(100%)"
  }

  render() {
    return (
      <div className={styles.Sidebar} id="SideBar" style={{transform:'translateX(100%)'}}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '40pt', height: '100vh', background: 'linear-gradient(#ffffff,#b4b99c)' }}>
          </div>
          <div style={{ width: '230pt', height: '100vh', padding: '15pt' }}>
            <div style={{ textAlign: 'end', cursor: 'pointer' }}>
              <img 
              onClick={this.closeSideBar}
              src='assets/close.png' style={{ height: '15pt' }} />
            </div>
            <div style={{ color: 'goldenrod', fontSize: '4vh' }}>
              Clossum
            </div>
            {
              this.state.Signup === true &&
              <>
                <div style={{ letterSpacing: '1.5pt', marginTop: '2vh' }}>
                  SIGN UP
                </div>
                {this.state.EmailVerifiedForSignUp === false &&
                  <>
                    {
                      this.state.OtpSent === false &&
                      <>
                        <input value={this.state.email}
                          onChange={(email) => this.setState({ email: email.target.value })}
                          className={styles.EmailField} placeholder="Email" />
                        <div style={{ textAlign: 'end' }}>
                          <button
                            onClick={this.SendOtp}
                            className={styles.GetOTPBtn}>Get OTP</button>
                        </div>
                      </>
                    }
                    {
                      this.state.OtpSent === true &&
                      <>
                        <div style={{ marginTop: '2vh', color: 'gray', fontSize: 'small' }}>
                          Please enter the 6 digit code we sent to {this.state.email}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '15pt' }}>
                          <input maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                          <input maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                          <input maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                          <input maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                          <input maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                        </div>
                        <div style={{ fontSize: 'small', marginTop: '10pt' }}>
                          Resend code {this.state.timer}
                        </div>
                      </>
                    }
                    <div style={{ fontSize: 'small', marginTop: '10pt', textAlign: 'center' }}>
                      By continuing you agree to Clossum's Terms of use and privacy policy
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => this.setState({ EmailVerifiedForSignUp: true })}
                        className={styles.GetStartedButton}>Get Started</button>
                    </div>
                  </>
                }
                {
                  this.state.EmailVerifiedForSignUp === true &&
                  <>
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="Email" />
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="First Name" />
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="Last Name" />
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="Phone" />
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="Password" />
                    <input value={this.state.email}
                      onChange={(email) => this.setState({ email: email.target.value })}
                      className={styles.EmailField} placeholder="Confirm password" />

                    <div style={{ fontSize: 'small', marginTop: '10pt', textAlign: 'center' }}>
                      By continuing you agree to Clossum's Terms of use and privacy policy
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => this.SignUpUser()}
                        className={styles.GetStartedButton}>Get Started</button>
                    </div>
                  </>
                }
              </>
            }
            {
              this.state.Signup === false &&
              <>
                <input value={this.state.email}
                  onChange={(email) => this.setState({ email: email.target.value })}
                  className={styles.EmailField} placeholder="Email/Phone Number" />
                <input value={this.state.email}
                  onChange={(email) => this.setState({ email: email.target.value })}
                  className={styles.EmailField} placeholder="Password" />
              </>
            }


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15pt' }}>
              <img src='assets/google.png' style={{ height: '20pt', margin: '10pt' }} />
              <img src='assets/facebook.png' style={{ height: '20pt', margin: '10pt' }} />
            </div>
            {
              this.state.Signup === true &&
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15pt' }}>
                <div style={{ height: '10pt', marginRight: '10pt' }}>Existing user? </div>
                <button
                  onClick={() => this.setState({ Signup: false })}
                  className={styles.GetOTPBtn}>Sign In</button>
              </div>
            }
            {
              this.state.Signup === false &&
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15pt' }}>
                <div style={{ height: '10pt', marginRight: '10pt' }}>New user? </div>
                <button
                  onClick={() => this.setState({ Signup: true })}
                  className={styles.GetOTPBtn}>Sign Up</button>
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}
