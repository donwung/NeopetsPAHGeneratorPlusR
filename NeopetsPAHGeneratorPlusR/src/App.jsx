import { useEffect, useState } from 'react'
import './App.css'
import EditableListing from './components/EditableListing'
import SideBySideCode from './components/SideBySideCode'
import StackedOrSingleCode from './components/StackedOrSingleCode'

function App() {
    const [canSBS, setCanSBS] = useState(false)

    const [listings, setListings] = useState([])
    const [username, setUsername] = useState("")

    const listingPlaceHolderText = `Listing: \n\nPetname - Color species \nPetname - Color species \n\n@username`

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
                lineStart = i
                lineEnd = listingInput.length
                const lineInput = listingInput.substring(lineStart, lineEnd)
                parsableArray.push(lineInput)
                break
            }
        }

        parseListingInput(parsableArray)
    }

    const getPetInfo = (line) => {
        let nameStart = 0
        let nameEnd = 0
        let petName = ""
        let petDetail = ""

        for (let i = 0; i < line.length; i++) {
            if (line[i] == "-") {
                nameEnd = i
                petName = line.substring(nameStart, nameEnd).replace(/\s$/g, '');
                petDetail = line.substring(nameEnd + 1, line.length).replace(/^\s/g, '');
            }
        }

        return { name: petName, detail: petDetail }
    }

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
            console.log("need top bun")
            setMyListings([])
        }
    }

    const setMyListings = petsArray => {
        let myListings = []
        for (let i = 0; i < petsArray.length; i++) {
            const onePet = {
                petName: getPetInfo(petsArray[i]).name,
                petDetail: getPetInfo(petsArray[i]).detail,
                isCustom: false,
                hasAgeTrophy: false,
                canInit: true
            }
            myListings.push(onePet)
        }
        if (myListings.length == 2) {
            setCanSBS(true)
        } else {
            setCanSBS(false)
        }
        setListings(myListings)
    }

    const editListingAtIdx = (_newSettings, idx) => {
        const updatedListingSettings = { ...listings[idx], ..._newSettings }
        let updatedListing = [...listings]

        updatedListing[idx] = updatedListingSettings
        setListings(updatedListing)
    }

    useEffect(()=>{
        console.log("listings updated")
    },[listings])

    return (
        <>
            <h1>PAH GENERATOR PLUS R(eact)</h1>
            {/* <div>
                <h3>how it works</h3>
                <p>paste one listing into the first box</p>
                <p>check any of the boxes if there's a custom (FFQ/PP/NP)</p>
                <p>hit generate</p>
                <p>paste into pot page</p>
                <p>repeat if necessary</p>
            </div> */}
            <div>
                <h2>enter listing here</h2>
                <textarea
                    style={{ width: "30vw", height: "150px" }}
                    placeholder={listingPlaceHolderText}
                    onChange={e => handleOnChangeListingInput(e)}></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {listings.length > 0 && <div>
                    <h2>{username}'s listings</h2>
                    <p>can I do SBS: {canSBS ? "yeah - 2 listings" : "no - not 2 listings"}</p>
                    <div style={{ display: "flex", justifyContent: "space-around", gap: "40px" }}>
                        {listings.map((listing, index) => {
                            return <EditableListing listing={listing} index={index} editListingAtIdx={editListingAtIdx}></EditableListing>
                        })}
                    </div>
                    <button onClick={() => console.log(listings)}>debug showall</button>
                </div>}
            </div>
            {canSBS ?
                <SideBySideCode listings={listings} username={username}></SideBySideCode> :
                <StackedOrSingleCode listings={listings} username={username}></StackedOrSingleCode>}

            {/* this is for custom listings */}
            {/* <div style={{ width: "48%", float: "right" }}>
                <div style={{ paddingRight: "15%" }}>
                    <img src="https://images.neopets.com/caption/caption_1180.gif" style={{ width: "300px", height: "300px" }}></img>
                    <br></br>
                    custom placeholder
                </div>
                <img src="https://images.neopets.com/games/trophies/trophy_oldpet_1.gif" style={{ width: "25px", height: "25px" }}></img>
                <img src="https://images.neopets.com/halloween/spooky_suprise/dd_close_box.png" style={{ width: "25px", height: "25px" }}></img>
            </div> */}
        </>
    )
}

export default App
