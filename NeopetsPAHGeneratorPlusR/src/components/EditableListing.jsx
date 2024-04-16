import { useEffect, useState } from "react"

const EditableListing = (props) => {
    const { listing, index, editListingAtIdx } = props

    const petName = listing.petName
    const petDetail = listing.petDetail
    const [isCustom, setIsCustom] = useState(listing.isCustom)
    const [hasAgeTrophy, setHasAgeTrophy] = useState(listing.hasAgeTrophy)
    const [canInit, setCanInit] = useState(listing.canInit)
    const [enablePreview, setEnablePreview] = useState(false)
    const [imageSource, setImageSource] = useState(`http://pets.neopets.com/cpn/${petName}/1/4.png`)

    useEffect(() => {
        editListingAtIdx({
            isCustom: isCustom,
            hasAgeTrophy: hasAgeTrophy,
            canInit: canInit
        }, index)
    }, [isCustom, hasAgeTrophy, canInit]);

    useEffect(() => {
        setImageSource(`http://pets.neopets.com/cpn/${petName}/1/4.png`)
        setIsCustom(listing.isCustom)
        setHasAgeTrophy(listing.hasAgeTrophy)
        setCanInit(listing.canInit)
    }, [petName])

    const renderFallbackImg = () => {
        setImageSource(`https://i1.sndcdn.com/artworks-000162412458-1q7a2q-t500x500.jpg`)
    }


    return <div className="listing-setting-container" key={index}>
        <div className="listing-setting-field">
            <input
                type='checkbox'
                checked={isCustom}
                onChange={() => setIsCustom(!isCustom)}></input>
            Is Custom
        </div>
        <div className="listing-setting-field">
            <input
                type='checkbox'
                checked={hasAgeTrophy}
                onChange={() => setHasAgeTrophy(!hasAgeTrophy)}></input>
            Has Age Trophy
        </div>
        <div className="listing-setting-field">
            <input
                type='checkbox'
                checked={!canInit}
                onChange={() => setCanInit(!canInit)}></input>
            Cannot Initiate
        </div>
        <div className="listing-setting-field">
            <input
                type='checkbox'
                checked={enablePreview}
                onChange={() => setEnablePreview(!enablePreview)}></input>
            Preview
        </div>
        <h3><i>{petName} {petDetail && `- ${petDetail}`}</i></h3>
        {enablePreview &&
            <img onError={() => renderFallbackImg()} src={imageSource}></img>
        }
    </div>
}

export default EditableListing