
import { expect, test } from "vitest";
import App from "../src/App";
import { render, screen } from "@testing-library/react";
import Login from "../src/pages/Login";
import userEvent from "@testing-library/user-event";
import SignUp from "../src/pages/SignUp";

test("Render the App component", () => {
    render(<App/>);

    const pageTitle = screen.getByText("UMH")
    expect(pageTitle).toBeInTheDocument()
})

// Login tests
test("Render Login", () => {
    render(<Login/>);
    const login = screen.getAllByText('Login')
    expect(login.length).toBeGreaterThan(1)
})

test("Render Spinner visible on login", async () => {
    render(<Login/>);
    const loginButton = document.getElementsByClassName('FormInput')
    const spinner = document.getElementsByClassName('spinner')[0]

    const user = userEvent.setup();

    await user.click(loginButton[2])

    expect(spinner).toBeVisible()
})

test("Render error display on invalid login", async () => {
    render(<Login/>);
    const ErrorDisplay = document.getElementById('ErrorDisplay')

    const url = "https://part-b-server.onrender.com/api/auth/login"

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email: 'a', password: 'a'}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let realResponse = await response.json()
    ErrorDisplay.textContent = await realResponse.message
    console.log(ErrorDisplay.textContent)


    expect(ErrorDisplay.textContent.length).toBeGreaterThan(0)
    
})



// Sign up tests
test("Render signup", () => {
    render(<SignUp/>);
    const signup = screen.getAllByText('Sign Up')
    expect(signup.length).toBeGreaterThan(1)
})

test("Render Spinner visible on sign up", async () => {
    render(<SignUp/>);
    const SignUpButton = document.getElementsByClassName('FormInput')
    const spinner = document.getElementsByClassName('spinner')[0]

    const user = userEvent.setup();

    await user.click(SignUpButton[3])

    expect(spinner).toBeVisible()
})

test("Render error display on invalid sign up", async () => {
    render(<SignUp/>);
    const ErrorDisplay = document.getElementById('ErrorDisplay')

    const url = "https://part-b-server.onrender.com/api/auth/register"

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({username: 'a', email: 'a', password: 'a'}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let realResponse = await response.json()
    ErrorDisplay.textContent = await realResponse.message
    console.log(ErrorDisplay.textContent)


    expect(ErrorDisplay.textContent.length).toBeGreaterThan(0)
    
})