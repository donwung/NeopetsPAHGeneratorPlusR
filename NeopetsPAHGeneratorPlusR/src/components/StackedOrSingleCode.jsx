import { useEffect, useState } from "react"
import { generateCopyPastableHTML_stacked } from "./PrintScripts"

const StackedOrSingleCode = (props) => {
    const { listings, username } = props
    const [copyPastableHTML, setCopyPastableHTML] = useState("")

    useEffect(() => {
        const pastableString = generateCopyPastableHTML_stacked(listings, username)
        setCopyPastableHTML(pastableString)
        // console.log(pastableString)
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
                    <button>Disabled</button>
                </div>
                <textarea
                    className="output-textarea"
                    placeholder='disabled by having more or less than two listings'
                    disabled="true"></textarea>
            </div>
            <div className="output-container">
                <div className="output-container-header">
                    <h2>
                        Listings in a column
                    </h2>
                    <button onClick={()=>copyToClipboard(copyPastableHTML)}>Copy to Clipboard</button>
                </div>
                <textarea
                    className="output-textarea"
                    placeholder='stacked code here'
                    value={copyPastableHTML}
                    onChange={e => setCopyPastableHTML(e.target.value)}></textarea>
            </div>
        </div>
    </>
}
export default StackedOrSingleCode