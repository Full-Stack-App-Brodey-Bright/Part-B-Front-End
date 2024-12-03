import Background from "../components/Background"

async function signUpRequest() {
    const url = 'https://part-b-server.onrender.com/api/auth/register'
    const ErrorDisplay = document.getElementById('ErrorDisplay')

    let data = {
        username: document.getElementById('usernameInput').value,
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

    ErrorDisplay.textContent = realResponse.message

    if (response.status == 201) {
        location.href = `/connect`
    }
    
    console.log(response)

}

export default function SignUp() {
    return (
        <>
        <Background/>
        <div className="centerer">
            <section className="SignUpBox">
                <h1>Sign Up</h1>
                <form className="SignUpForm">
                    <p>Username</p>
                    <input className='FormInput' type="text" id="usernameInput" name="username" placeholder="Username"></input>
                    <p>Email</p>
                    <input className='FormInput' type="text" id="emailInput" name="email" placeholder="Email"></input>
                    <p>Password</p>
                    <input className='FormInput' type="text" id="passwordInput" name="password" placeholder="Password"></input>

                    <button className='FormInput' onClick={signUpRequest} type="button">Sign Up</button>
                    <div className="AlreadyAUser">
                        <p>Already a user?</p>
                        <a href="/login">Login</a>
                    </div>
                </form>
                <p id="ErrorDisplay"></p>
            </section>
        </div>
        </>
    )
}