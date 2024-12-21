import { useEffect } from "react"

export default function Header() {
    let back

    // checks if on homepage (header is different on homepage)
    async function headerWait() {
        back = await document.getElementsByClassName('Back')[0]
        if (location.href ==  `${import.meta.env.VITE_URL}/home`) {
            back = document.getElementsByClassName('Back')[0]
            back.style.height = '10vh'
        }
    }

    useEffect(() => {
        headerWait()
    })

    return (
        <nav className="Back"> 
            <h1 className="Title">UMH</h1>
        </nav>
    )
}