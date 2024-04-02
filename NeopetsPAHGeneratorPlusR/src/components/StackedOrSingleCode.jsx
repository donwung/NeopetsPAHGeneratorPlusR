import { useEffect, useState } from "react"

const StackedOrSingleCode = (props) => {
    const { listings, username } = props
    const [copyPastableHTML, setCopyPastableHTML] = useState("")

    useEffect(() => {
        let pastableString = ""

        if (listings.length > 0) {
            for (let i = 0; i < listings.length; i++) {
                const petName = listings[i].petName
                const petDetail = listings[i].petDetail
                pastableString += `<a href="/petlookup.phtml?pet=${petName}">\n<img src="//pets.neopets.com/cpn/${petName}/1/4.png">\n</a>\n<br>\n${petName} - ${petDetail}\n`
                if (i != listings.length - 1) {
                    pastableString += `<br>\n\n`
                }
            }
            pastableString += `\n<h2 style="border-bottom: 1px solid #818589; margin-bottom: 25px; padding-bottom:5px;">\n<a href="https://www.neopets.com/neomessages.phtml?type=send&recipient=${username}">\n${username}\n</a>\n</h2>`
        }

        setCopyPastableHTML(pastableString)

        console.log(pastableString)
    }, [listings])


    return <>
        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px", width: "60vw", margin: "auto" }}>
            <div style={{ width: "40%" }}>
                <h2>
                    side-by-side listings
                </h2>
                <textarea style={{ width: "100%", height: "300px" }} placeholder='disabled by having more or less than two listings' disabled="true"></textarea>
            </div>
            <div style={{ width: "50%" }}>
                <h2>
                    stacked listings
                </h2>
                <textarea style={{ width: "100%", height: "300px" }} placeholder='stacked code here' value={copyPastableHTML}></textarea>
            </div>
        </div>
    </>
}
export default StackedOrSingleCode