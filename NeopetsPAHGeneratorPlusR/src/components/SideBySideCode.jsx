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

    const copyToClipboard = (_copyable) => {
        console.log(_copyable)
        navigator.clipboard.writeText(_copyable)
    }

    return <>
        <div className="output-wrapper">
            <div className="output-container">
                <div className="output-container-header">
                    <h2>
                        Side-by-side Listings
                    </h2>
                    <button onClick={()=>copyToClipboard(copyPastableHTML_SBS)}>Copy to Clipboard</button>
                </div>
                <textarea
                    className="output-textarea"
                    placeholder='side-by-side code here'
                    value={copyPastableHTML_SBS}
                    onChange={e => setCopyPastableHTML_SBS(e.target.value)}></textarea>
            </div>
            <div className="output-container">
                <div className="output-container-header">
                    <h2>
                        Listings in a column
                    </h2>
                    <button onClick={() => copyToClipboard(copyPastableHTML_stacked)}>Copy to Clipboard</button>
                </div>
                <textarea
                    className="output-textarea"
                    placeholder='stacked code here'
                    value={copyPastableHTML_stacked}
                    onChange={e => setCopyPastableHTML_stacked(e.target.value)}></textarea>
            </div>
        </div>
    </>
}
export default SideBySideCode

