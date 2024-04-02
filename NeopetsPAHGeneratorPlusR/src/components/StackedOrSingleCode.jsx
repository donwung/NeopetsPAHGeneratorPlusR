import { useEffect, useState } from "react"
import { generateCopyPastableHTML_stacked } from "./PrintScripts"

const StackedOrSingleCode = (props) => {
    const { listings, username } = props
    const [copyPastableHTML, setCopyPastableHTML] = useState("")

    useEffect(() => {
        const pastableString = generateCopyPastableHTML_stacked(listings, username)
        setCopyPastableHTML(pastableString)
        console.log(pastableString)
    }, [listings])

    return <>
        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px", width: "60vw", margin: "auto" }}>
            <div style={{ width: "40%" }}>
                <h2>
                    side-by-side listings
                </h2>
                <textarea
                    style={{ width: "100%", height: "300px" }}
                    placeholder='disabled by having more or less than two listings'
                    disabled="true"></textarea>
            </div>
            <div style={{ width: "50%", border: "2px solid white" }}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h2>
                        Listings in a column
                    </h2>
                    <button>Copy to Clipboard</button>
                </div>
                <textarea
                    style={{ width: "100%", height: "300px", resize: "none" }}
                    placeholder='stacked code here'
                    value={copyPastableHTML}
                    onChange={e => setCopyPastableHTML(e.target.value)}></textarea>
            </div>
        </div>
    </>
}
export default StackedOrSingleCode