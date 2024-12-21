import Header from "../components/Header";
import React, { useState } from "react";
import sp from "../assets/sp.svg";
import Cookies from "js-cookie";

// send login details to backend
export default function SignUp() {
    const [spinnerHidden, setSpinnerHidden] = useState(true);
    async function signUpRequest() {
        setSpinnerHidden(false);
        const url = "https://part-b-server.onrender.com/api/auth/register";
        const ErrorDisplay = document.getElementById("ErrorDisplay");

        let data = {
            username: document.getElementById("usernameInput").value,
            email: document.getElementById("emailInput").value.toLowerCase(),
            password: document.getElementById("passwordInput").value,
        };

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(setSpinnerHidden(false));

        // saves user data
        const realResponse = await response.json();
        Cookies.set("token", await realResponse.token);
        Cookies.set("username", await realResponse.username);
        Cookies.set("userId", await realResponse.id);

        // displays if users input is invalid/ server error
        ErrorDisplay.textContent = realResponse.message;
        setSpinnerHidden(true);

        if (response.status == 201) {
            location.href = `/connect`;
        }

        console.log(response);
    }
    return (
        <>
            <Header />
            <img className="spinner" src={sp} hidden={spinnerHidden}></img>
            <div className="centerer">
                <section className="SignUpBox">
                    <h1>Sign Up</h1>
                    <form className="SignUpForm">
                        <p>Username</p>
                        <input
                            className="FormInput"
                            type="text"
                            id="usernameInput"
                            name="username"
                            placeholder="Username"
                        ></input>
                        <p>Email</p>
                        <input
                            className="FormInput"
                            type="text"
                            id="emailInput"
                            name="email"
                            placeholder="Email"
                        ></input>
                        <p>Password</p>
                        <input
                            className="FormInput"
                            type="password"
                            id="passwordInput"
                            name="password"
                            placeholder="Password"
                        ></input>

                        <button
                            className="FormInput"
                            onClick={signUpRequest}
                            type="button"
                        >
                            Sign Up
                        </button>
                        <div className="AlreadyAUser">
                            <p>Already a user?</p>
                            <a href="/login">Login</a>
                        </div>
                    </form>
                    <p id="ErrorDisplay"></p>
                </section>
            </div>
            <div className="coverer"></div>
        </>
    );
}
