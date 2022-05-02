import React, { Component } from 'react'
import { GetEmail, GetFirstName, GetLastName, GetPassword, GetRefreshToken, GetToken, GetUsername, SetEmail, SetFirstName, SetLastName, SetPassword, SetRefreshToken, SetToken, SetUsername } from '../../lib/CookieLib';
import { MutationP } from '../../lib/serverConfig';
import styles from './SideBar.module.css';

export default class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: 59,
            OtpSent: false,

            email: "admin@admin.com",
            firstname: "",
            lastname: "",
            password: "admin",
            username: "",

            OTPone: "",
            OTPtwo: "",
            OTPthree: "",
            OTPfour: "",

            EmailVerifiedForSignUp: false,
            Signup: true,

            isLoggedIn: true,
        }
    }

    CountdownInt = undefined

    componentDidMount() {
        if (GetToken() !== "") {
            this.setState({email:GetEmail()})
            this.SignInUser(GetPassword())
        }
    }

    SendOtp = () => {
        this.setState({ OTPNotVisible: false })
        this.setState({ timer: 59 })
        this.StartCountDown();
    }

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
        alert(this.state.OTPone + " " + this.state.OTPtwo + " " + this.state.OTPthree + " " + this.state.OTPfour + " ")
    }

    SetUserCookie = (
        token,
        refreshToken,
        username,
        firstName,
        lastName,
        email,
        password
    ) => {
        SetToken(token)
        SetRefreshToken(refreshToken)
        SetUsername(username)
        SetFirstName(firstName)
        SetLastName(lastName)
        SetEmail(email)
        SetPassword(password)
    }

    GetUserCookie = () => {
        return {
            token: GetToken(),
            refreshToken: GetRefreshToken(),
            username: GetUsername(),
            firstName: GetFirstName(),
            lastName: GetLastName(),
            email: GetEmail(),
            password: GetPassword(),
        }
    }

    SignInUser = (password) => {
        console.log(this.state.email);
        console.log(password);
        MutationP(`mutation{
      tokenAuth(email:"${this.state.email}",password:"${password}"){
        success
        errors
        token
        refreshToken
        user{
          username
          firstName
          lastName
          email
        }
      }
    }`)
            .then(res => {
                if (res.data.data.tokenAuth.success === true) {
                    this.SetUserCookie(
                        res.data.data.tokenAuth.token,
                        res.data.data.tokenAuth.refreshToken,

                        res.data.data.tokenAuth.user.username,
                        res.data.data.tokenAuth.user.firstName,
                        res.data.data.tokenAuth.user.lastName,
                        res.data.data.tokenAuth.user.email,
                        password
                    )
                    console.log(this.GetUserCookie());
                    this.setState({ isLoggedIn: true });
                } else {
                    alert("Invalid Credentials")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    closeSideBar = () => {
        document.getElementById('SideBar').style.transform = "translateX(100%)"
    }

    // STILL TO BE IMPLEMENTED
    GetOtp = () => {
        MutationP(`mutation {
      CreateUser(email:"${this.state.email}",firstName:"${this.state.firstname}",lastName:"${this.state.lastname}",password:"${this.state.password}",username:"${this.state.username}"){
              success
              token
              refreshToken
              message
              user {
                id
                email
                username
                firstName
                lastName
              }
            }
          }`)
            .then(res => {
                if (res.data.data.CreateUser === null) {
                    console.log(res.data.errors[0].message);
                    alert(res.data.errors[0].message)
                } else {
                    console.log(res.data.data.CreateUser.refreshToken);
                    console.log(res.data.data.CreateUser.token);
                    this.setState({ EmailVerifiedForSignUp: true })
                    SetToken(res.data.data.CreateUser.token)
                    SetRefreshToken(res.data.data.CreateUser.refreshToken)
                    console.log(GetToken());
                    console.log(GetRefreshToken());
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout = () => {
        this.SetUserCookie("", "", "", "", "", "");
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div className={styles.Sidebar} id="SideBar" style={{ transform: 'translateX(100%)' }}>
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
                            this.state.isLoggedIn === true &&
                            <div>
                                <div style={{ letterSpacing: '1.5pt', marginTop: '2vh' }}>
                                    Signed In as {this.GetUserCookie().firstName + " " + this.GetUserCookie().lastName}
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => this.logout()}
                                        className={styles.GetStartedButton}>Log Out</button>
                                </div>
                            </div>
                        }
                        {
                            this.state.isLoggedIn === false &&
                            <div>
                                {
                                    this.state.Signup === true &&
                                    <>
                                        <div style={{ letterSpacing: '1.5pt', marginTop: '2vh' }}>
                                            SIGN UP
                                        </div>
                                        {this.state.EmailVerifiedForSignUp === true &&
                                            <>
                                                {

                                                    this.state.OtpSent === true &&
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
                                                    this.state.OtpSent === false &&
                                                    <>
                                                        <div style={{ marginTop: '2vh', color: 'gray', fontSize: 'small' }}>
                                                            Please enter the 4 digit code we sent to {this.state.email}
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '15pt' }}>
                                                            <input
                                                                value={this.state.OTPone}
                                                                onChange={(value) => {
                                                                    this.setState({ OTPone: value.target.value })
                                                                }}
                                                                maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                                                            <input
                                                                value={this.state.OTPtwo}
                                                                onChange={(value) => {
                                                                    this.setState({ OTPtwo: value.target.value })
                                                                }}
                                                                maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                                                            <input
                                                                value={this.state.OTPthree}
                                                                onChange={(value) => {
                                                                    this.setState({ OTPthree: value.target.value })
                                                                }}
                                                                maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
                                                            <input
                                                                value={this.state.OTPfour}
                                                                onChange={(value) => {
                                                                    this.setState({ OTPfour: value.target.value })
                                                                }}
                                                                maxLength={1} style={{ width: '20%', margin: '2%' }} className={styles.OTPInput} />
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
                                                        onClick={() => this.SignUpUser()}
                                                        className={styles.GetStartedButton}>Get Started</button>
                                                </div>
                                            </>
                                        }
                                        {
                                            this.state.EmailVerifiedForSignUp === false &&
                                            <>
                                                <input value={this.state.email}
                                                    onChange={(email) => this.setState({ email: email.target.value })}
                                                    className={styles.EmailField} placeholder="Email" />

                                                <input value={this.state.firstname}
                                                    onChange={(firstname) => this.setState({ firstname: firstname.target.value })}
                                                    className={styles.EmailField} placeholder="First Name" />

                                                <input value={this.state.lastname}
                                                    onChange={(lastname) => this.setState({ lastname: lastname.target.value })}
                                                    className={styles.EmailField} placeholder="Last Name" />

                                                <input value={this.state.username}
                                                    onChange={(username) => this.setState({ username: username.target.value })}
                                                    className={styles.EmailField} placeholder="username" />

                                                <input value={this.state.password}
                                                    onChange={(password) => this.setState({ password: password.target.value })}
                                                    className={styles.EmailField} placeholder="Password" />

                                                <div style={{ fontSize: 'small', marginTop: '10pt', textAlign: 'center' }}>
                                                    By continuing you agree to Clossum's Terms of use and privacy policy
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => {
                                                            this.GetOtp();
                                                        }}
                                                        className={styles.GetStartedButton}>Get Started</button>
                                                </div>
                                            </>
                                        }
                                    </>
                                }
                                {
                                    this.state.Signup === false &&
                                    <>
                                        <div style={{ letterSpacing: '1.5pt', marginTop: '2vh' }}>
                                            SIGN IN
                                        </div>
                                        <input value={this.state.email}
                                            onChange={(email) => this.setState({ email: email.target.value })}
                                            className={styles.EmailField} placeholder="Email/Phone Number" />
                                        <input value={this.state.password}
                                            onChange={(password) => this.setState({ password: password.target.value })}
                                            className={styles.EmailField} placeholder="Password" />
                                        <div style={{ textAlign: 'center' }}>
                                            <button
                                                onClick={() => this.SignInUser(this.state.password)}
                                                className={styles.GetStartedButton}>Sign In</button>
                                        </div>
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
                        }
                    </div>

                </div>
            </div>
        )
    }
}
