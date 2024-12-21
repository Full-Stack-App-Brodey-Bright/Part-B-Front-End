import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import sp from "../assets/sp.svg";

// send login details to backend
export default function Login() {
    // loading img when waiting
    const [spinnerHidden, setSpinnerHidden] = useState(true);

    async function loginRequest() {
        setSpinnerHidden(false);
        const url = "https://part-b-server.onrender.com/api/auth/login";
        
        const ErrorDisplay = document.getElementById("ErrorDisplay");

        let data = {
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

        const realResponse = await response.json();

        // saves user data for display on other pages
        Cookies.set("token", await realResponse.token);
        Cookies.set("username", await realResponse.username);
        Cookies.set("userId", await realResponse.id);
        setSpinnerHidden(true);
        // displays if user input is invalid
        ErrorDisplay.textContent = realResponse.message;
        if (response.status == 200) {
            location.href = `/connect`;
        }
        console.log(response.status);
    }

    return (
        <>
            <Header />
            <img className="spinner" src={sp} hidden={spinnerHidden}></img>
            <div className="centerer">
                <section className="SignUpBox">
                    <h1>Login</h1>
                    <form className="SignUpForm">
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
                            onClick={loginRequest}
                            type="button"
                        >
                            Login
                        </button>
                        <div className="AlreadyAUser">
                            <p>Don't have an account?</p>
                            <a href="/signup">Sign up</a>
                        </div>
                    </form>
                    <p id="ErrorDisplay"></p>
                </section>
                <div className="coverer"></div>
            </div>
        </>
    );
}
