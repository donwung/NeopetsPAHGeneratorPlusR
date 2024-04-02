import { useEffect, useState } from "react"
import { generateCopyPastableHTML_stacked, generateCopyPastableHTML_SBS } from "./PrintScripts"

const SideBySideCode = (props) => {
    const { listings, username } = props

    const [copyPastableHTML_stacked, setCopyPastableHTML_stacked] = useState("")
    const [copyPastableHTML_SBS, setCopyPastableHTML_SBS] = useState("")

    useEffect(() => {
        const pastableString_stacked = generateCopyPastableHTML_stacked(listings, username)
        const pastableString_SBS = generateCopyPastableHTML_SBS(listings, username)

        setCopyPastableHTML_stacked(pastableString_stacked)
        setCopyPastableHTML_SBS(pastableString_SBS)
    }, [listings])

    return <>
        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px", width: "60vw", margin: "auto" }}>
            <div style={{ width: "50%" }}>
                <h2>
                    side-by-side listings
                </h2>
                <textarea
                    style={{ width: "100%", height: "300px" }}
                    placeholder='side-by-side code here'
                    value={copyPastableHTML_SBS}
                    onChange={e => setCopyPastableHTML_SBS(e.target.value)}></textarea>
            </div>
            <div style={{ width: "50%" }}>
                <h2>
                    stacked listings
                </h2>
                <textarea
                    style={{ width: "100%", height: "300px" }}
                    placeholder='stacked code here'
                    value={copyPastableHTML_stacked}
                    onChange={e => setCopyPastableHTML_stacked(e.target.value)}></textarea>
            </div>
        </div>
    </>
}
export default SideBySideCode

