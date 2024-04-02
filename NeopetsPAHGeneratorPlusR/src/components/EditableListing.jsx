import { useEffect, useState } from "react"

const EditableListing = (props) => {
    const { listing, index, editListingAtIdx } = props

    const petName = listing.petName
    const petDetail = listing.petDetail
    const [isCustom, setIsCustom] = useState(listing.isCustom)
    const [hasAgeTrophy, setHasAgeTrophy] = useState(listing.hasAgeTrophy)
    const [canInit, setCanInit] = useState(listing.canInit)

    useEffect(() => {
        // console.log("changed")
        editListingAtIdx({isCustom: isCustom, hasAgeTrophy: hasAgeTrophy, canInit: canInit}, index)
    }, [isCustom, hasAgeTrophy, canInit]);

    return <>
        <div key={index}>
            <h3>petname: {petName}</h3>
            <div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        Is Custom
                        <input
                            type='checkbox'
                            checked={isCustom}
                            onChange={() => setIsCustom(!isCustom)}></input>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        Has Age Trophy
                        <input
                            type='checkbox'
                            checked={hasAgeTrophy}
                            onChange={() => setHasAgeTrophy(!hasAgeTrophy)}></input>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        Cannot Initiate
                        <input
                            type='checkbox'
                            checked={!canInit}
                            onChange={() => setCanInit(!canInit)}></input>
                    </div>
                </div>
                <p>
                    detail: {petDetail}
                </p>
            </div>
        </div>
    </>
}

export default EditableListing