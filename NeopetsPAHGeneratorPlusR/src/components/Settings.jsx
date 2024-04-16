import { useState, useEffect } from "react"

const Settings = (props) => {
    const { settings, handleSetSettings } = props

    const [cannotInitMedalImgURL, setCannotInitMedalImgURL] = useState(settings.cannotInitMedalImgURL)
    const [isCustomImgURL, setIsCustomImgURL] = useState(settings.isCustomImgURL)

    const [displaySettings, setDisplaySettings] = useState(false)

    const handleChangeIsCustomImgURL = (url) => {

        if(/^(ftp|http|https):\/\/[^ "]+$/.test(url)){ // test if is a url
            setIsCustomImgURL(url)
        } else {
            setIsCustomImgURL("https://images.neopets.com/caption/caption_1180.gif")
        }
    }

    useEffect(() => {
        handleSetSettings({
            isCustomImgURL: isCustomImgURL,
            cannotInitMedalImgURL: cannotInitMedalImgURL
        })
    }, [cannotInitMedalImgURL, isCustomImgURL])

    return <>
        <div className="global-settings flex-1">
            <h3 onClick={() => setDisplaySettings(!displaySettings)}>
                <img className="global-settings-cog" src="https://upload.wikimedia.org/wikipedia/commons/4/42/Cogwheel.png"></img>
            </h3>
            {displaySettings &&
                <div>
                    <h3>
                        custom image settings
                    </h3>
                    <div className='d-flex justify-center'>
                        <label>isCustom img URL</label>
                        <input
                            className="flex-1"
                            placeholder='https://images.neopets.com/caption/caption_1180.gif'
                            onChange={(e) => handleChangeIsCustomImgURL(e.target.value)}
                        ></input>
                    </div>
                    <i>note: I recommend a minimum 300 x 300px image"</i>
                    <div className='d-flex justify-center'>
                        <label>cannotInit Medal img URL</label>
                        <select
                            className="flex-1"
                            onChange={(e) => setCannotInitMedalImgURL(e.target.value)}>
                            <option value="https://images.neopets.com/halloween/spooky_suprise/dd_close_box.png">
                                style 1
                            </option>
                            <option value="https://images.neopets.com/neggfest/2010/pushdown/drop_down_close.png">
                                style 2
                            </option>
                            <option value="https://images.neopets.com/games/lyrasescape/media/graphics/overlays/close-button2.png">
                                style 3
                            </option>
                            <option value="https://images.neopets.com/wheels/h5/excitement/images/wheelexit.png">
                                style 4
                            </option>
                        </select>
                        <img src={cannotInitMedalImgURL}></img>
                    </div>
                </div>
            }
        </div>
    </>
}

export default Settings