import { useEffect, useState } from 'react'
import './App.css'
import EditableListing from './components/EditableListing'
import SideBySideCode from './components/SideBySideCode'
import StackedOrSingleCode from './components/StackedOrSingleCode'

function App() {
    // canSBS determines if two listings can be posted side by side (SBS)
    // only used for when there are only two listings
    const [canSBS, setCanSBS] = useState(false)

    const [listings, setListings] = useState([])
    const [username, setUsername] = useState("")

    // this parses the textarea
    // the textarea is broken up into elements in an array for each line break
    const handleOnChangeListingInput = e => {
        const listingInput = e.target.value

        let parsableArray = []
        let lineStart = 0;
        let lineEnd = 0;
        for (let i = 0; i < listingInput.length; i++) {
            if (listingInput[i] == "\n") {
                lineEnd = i
                const lineInput = listingInput.substring(lineStart, lineEnd)
                lineStart = i + 1
                parsableArray.push(lineInput)
            }
            if (listingInput[i] == "@") {
                lineStart = i + 1
                lineEnd = listingInput.length
                const lineInput = listingInput.substring(lineStart, lineEnd)
                parsableArray.push(lineInput)
                break
            }
        }

        parseListingInput(parsableArray)
    }

    // this cleans up an array of text area lines - removes blank elements
    // also does minor validation for input
    const parseListingInput = (lines) => {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].replace(/\s/g, '').length < 1) {
                lines.splice(i, 1)
                i--
            }
        }

        if (lines[0].toLowerCase() == "listing:" || lines[0].toLowerCase() == "l:") {
            lines.splice(0, 1)
            setUsername(lines[lines.length - 1].replace(/\s/g, ''))
            lines.splice(lines.length - 1, 1)

            console.log(lines)
            setMyListings(lines)
        } else {
            console.log("need top bun") // failure message when "listing:" isn't the first line
            setMyListings([])
        }
    }

    // creates default values for a listings array
    const setMyListings = petsArray => {
        let myListings = []
        for (let i = 0; i < petsArray.length; i++) {
            const petInfo = getPetInfo(petsArray[i])
            const onePet = {
                petName: petInfo.name,
                petDetail: petInfo.detail,
                isCustom: false,
                hasAgeTrophy: false,
                canInit: true
            }
            myListings.push(onePet)
        }

        setCanSBS(myListings.length == 2 ? true : false)
        setListings(myListings)
    }

    // gets general pet information
    // receives a string to be parsed into a dictionary
    // outputs a dictionary of name and detail
    // detail will be omitted if there is no hyphen
    const getPetInfo = (line) => {
        let nameStart = 0
        let nameEnd = 0
        let petName = ""
        let petDetail = ""
        let hasName = false

        for (let i = 0; i < line.length; i++) {
            if (line[i] == "-") {
                hasName = true
                nameEnd = i
                petName = line.substring(nameStart, nameEnd).replace(/\s$/g, '');
                petDetail = line.substring(nameEnd + 1, line.length).replace(/^\s/g, '');
            }
        }

        if (hasName == false) {
            petName = line.substring(0, line.length).replace(/\s$/g, '');
            petDetail = "";
        }

        return { name: petName, detail: petDetail }
    }

    // liftable callback for when a component needs change settings
    const editListingAtIdx = (_newSettings, idx) => {
        const updatedListingSettings = { ...listings[idx], ..._newSettings }
        let updatedListing = [...listings]

        updatedListing[idx] = updatedListingSettings
        setListings(updatedListing)
    }

    useEffect(() => {
    }, [listings])

    return (
        <>
            <h1>PAH GENERATOR +R</h1>
            {/* TODO: add a how-to */}
            {/* <div>
                <h3>how it works</h3>
                <p>paste one listing into the first box</p>
                <p>check any of the boxes if there's a custom (FFQ/PP/NP)</p>
                <p>hit generate</p>
                <p>paste into pot page</p>
                <p>repeat if necessary</p>
            </div> */}
            <div className="listing-input">
                <h2>enter listing here</h2>
                <textarea
                    placeholder={`Listing: \n\nPetname - Color species \nPetname - Color species \n\n@username`}
                    onChange={e => handleOnChangeListingInput(e)}></textarea>
            </div>
            <h2>@{username}'s listings</h2>
            {listings.length > 0 &&
                <div className="listing-settings-wrapper">
                    <div style={{ display: "flex", justifyContent: "space-around", gap: "40px" }}>
                        {listings.map((listing, index) => {
                            return <EditableListing listing={listing} index={index} editListingAtIdx={editListingAtIdx}></EditableListing>
                        })}
                    </div>
                </div>}
            {canSBS ?
                <SideBySideCode listings={listings} username={username}></SideBySideCode> :
                <StackedOrSingleCode listings={listings} username={username}></StackedOrSingleCode>}
            {/* TODO: add credits */}
            {/* TODO: add readme */}
            {/* TODO: convert from dark mode to light mode and something neopets friendly */}
            {/* TODO: move all style attributes to css classes */}
        </>
    )
}

export default App
