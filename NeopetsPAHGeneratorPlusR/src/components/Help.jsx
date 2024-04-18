import { useState } from "react"

const Help = () => {
    const [displayHelp, setDisplayHelp] = useState(false)

    return <>
        <div className="flex-1">
            <span className="help-button">
                <i onClick={() => setDisplayHelp(!displayHelp)}>h e l p m e</i>
            </span>
            {displayHelp &&
                <div className="help">
                    {/* TODO: add a how-to */}
                    <div>
                        <h3>uhh... how it works:</h3>
                        <li>Paste one listing into the first box according to the placeholder text</li>
                        <li>Optional: Add listings one after another</li>
                        <br></br>
                        <li>Check relevant boxes</li>
                        <br></br>
                        <li>Is Custom: sets the image link to be your own specified image (in settings)</li>
                        <li>Has Age Trophy: appends a medal to indicate having an age trophy</li>
                        <li>Cannot Initiate: appends an icon to indicate being unable to initiate a trade</li>
                        <li>Preview: toggles a preview of the pet in the listing box</li>
                        <br></br>
                        <li>You can then copy or edit the automatically generated code</li>
                        <i>note that changes in listing settings will overwrite your own changes in your code</i>
                    </div>
                </div>}
        </div>
    </>
}

export default Help