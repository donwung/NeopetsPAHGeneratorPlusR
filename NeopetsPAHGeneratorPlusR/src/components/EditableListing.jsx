import { useEffect, useState } from "react"

const EditableListing = (props) => {
    const { listing, index, editListingAtIdx } = props

    const petName = listing.petName
    const petDetail = listing.petDetail
    const [isCustom, setIsCustom] = useState(listing.isCustom)
    const [hasAgeTrophy, setHasAgeTrophy] = useState(listing.hasAgeTrophy)
    const [canInit, setCanInit] = useState(listing.canInit)
    const [imageSource, setImageSource] = useState(`http://pets.neopets.com/cpn/${petName}/1/4.png`)

    useEffect(() => {
        editListingAtIdx({
            isCustom: isCustom,
            hasAgeTrophy: hasAgeTrophy,
            canInit: canInit
        }, index)
    }, [isCustom, hasAgeTrophy, canInit]);

    useEffect(()=> {
        console.log("rerender")
        setImageSource(`http://pets.neopets.com/cpn/${petName}/1/4.png`)
    }, [petName])

    const renderFallbackImg = () => {
        setImageSource(`https://images.neopets.com/caption/caption_1180.gif`)
    }


    return <>
        <div className="listing-setting-container" key={index}>
            <div className="d-flex justify-between">
                Is Custom
                <input
                    type='checkbox'
                    checked={isCustom}
                    onChange={() => setIsCustom(!isCustom)}></input>
            </div>
            <div className="d-flex justify-between">
                Has Age Trophy
                <input
                    type='checkbox'
                    checked={hasAgeTrophy}
                    onChange={() => setHasAgeTrophy(!hasAgeTrophy)}></input>
            </div>
            <div className="d-flex justify-between">
                Cannot Initiate
                <input
                    type='checkbox'
                    checked={!canInit}
                    onChange={() => setCanInit(!canInit)}></input>
            </div>
            <h3>{petName} {petDetail && `- ${petDetail}`}</h3>
            <img onError={()=>renderFallbackImg()} src={imageSource}></img>
        </div>
    </>
}

export default EditableListing