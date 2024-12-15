
import Cookies from 'js-cookie'
import { useEffect } from 'react'


// handles youtube oauth2 and save token to db
export default async function Auth() {
    let hash = window.location.hash
    let accessToken = hash.split('&')[0].split('=')[1]
    Cookies.set('YtToken', accessToken)
    let response = await fetch('https://part-b-server.onrender.com/auth/youtubeauth', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            accessToken: accessToken
        })
    })

    const realResponse = await response.json()

    Cookies.set('YTConnected', null)

    if (response.status == 200) {
        Cookies.set('YTConnected', true)
        location.href = '/connect'
    }

}