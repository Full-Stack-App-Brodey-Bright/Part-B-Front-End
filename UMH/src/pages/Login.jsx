import { useContext, useState, useEffect } from "react"
import Background from "../components/Background"
import Cookies from 'js-cookie'

async function loginRequest() {
    const url = 'https://part-b-server.onrender.com/api/auth/login'
    const ErrorDisplay = document.getElementById('ErrorDisplay')
  
    let data = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value
    }
  
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),   
        headers: {
            "Content-Type": "application/json",
        }
    })
  
    const realResponse = await response.json()

    Cookies.set('token', realResponse.token)
  
    ErrorDisplay.textContent = realResponse.message
    if (response.status == 200) {
        location.href = `/connect`
    }
    console.log(response.status)
  }

export default function Login() {

    return (
        <>
        <Background/>
        <div className="centerer">
            <section className="SignUpBox">
                <h1>Login</h1>
                <form className="SignUpForm">
                    <p>Email</p>
                    <input className='FormInput' type="text" id="emailInput" name="email" placeholder="Email"></input>
                    <p>Password</p>
                    <input className='FormInput' type="text" id="passwordInput" name="password" placeholder="Password"></input>

                    <button className='FormInput' onClick={loginRequest} type="button">Login</button>
                    <div className="AlreadyAUser">
                        <p>Don't have an account?</p>
                        <a href="/signup">Sign up</a>
                    </div>
                </form>
                <p id="ErrorDisplay"></p>
            </section>
        </div>
        </>
    )
}