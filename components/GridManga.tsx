import React, {useContext, useEffect, useState, useRef} from "react"
import {useHistory} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {EnableDragContext} from "../Context"
import functions from "../structures/Functions"
import read from "../assets/icons/read.png"
import bookmark from "../assets/icons/bookmark.png"
import "./styles/gridmanga.less"

interface Props {
    img: string 
    title: string
    id: string
}

const GridManga: React.FunctionComponent<Props> = (props) => {
    const {enableDrag, setEnableDrag} = useContext(EnableDragContext)
    const [drag, setDrag] = useState(false)
    const [hover, setHover] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)
    const history = useHistory()

    const imageAnimation = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect()
        const width = rect?.width
        const height = rect?.height
        const x = event.clientX - rect.x
        const y = event.clientY - rect.y
        const translateX = ((x / width) - 0.5) * 3
        const translateY = ((y / height) - 0.5) * 3
        imageRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1.02)`
    }

    const cancelImageAnimation = () => {
        if (!imageRef.current) return
        imageRef.current.style.transform = "scale(1)"
    }

    const getFontSize = () => {
        let size = 10
        if (props.title.length <= 5) {
            size = 45
        } else if (props.title.length <= 10) {
            size = 35
        } else if (props.title.length <= 15) {
            size = 30
        } else if (props.title.length <= 25) {
            size = 25
        } else if (props.title.length <= 30) {
            size = 20
        } else {
            size = 10
        }
        return `${size}px`
    }

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.metaKey || event.ctrlKey || event.button === 1) {
            event.preventDefault()
            const newWindow = window.open(`/manga/${props.id}`, "_blank")
            newWindow?.blur()
            window.focus()
        }
    }

    const mouseDown = (event: React.MouseEvent<HTMLElement>) => {
        setDrag(false)
    }

    const mouseMove = (event: React.MouseEvent<HTMLElement>) => {
        setDrag(true)
    }

    const mouseUp = async (event: React.MouseEvent<HTMLElement>) => {
        if (!drag) {
            if (event.metaKey || event.ctrlKey || event.button == 1) {
                return
            } else {
                history.push(`/manga/${props.id}`)
            }
        }
    }

    return (
        <div className="grid-manga">
            <div className="grid-manga-container">
                <div className="grid-manga-img-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} onAuxClick={onClick} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                    <img className="grid-manga-img" src={props.img} ref={imageRef} onMouseMove={(event) => imageAnimation(event)} onMouseLeave={() => cancelImageAnimation()}/>
                    <div className={`grid-manga-text-container ${!hover ? "hide-grid-manga-text" : ""}`}>
                        <span className="grid-manga-text" style={{fontSize: getFontSize()}}>{props.title}</span>
                    </div>
                </div>
                {/* <div className="grid-manga-button-container">
                    <button className="grid-manga-button" onClick={() => history.push(`/manga/${props.id}`)} onAuxClick={onClick}>
                        <span className="grid-manga-button-hover">
                            <img className="grid-manga-button-img" src={read}/>
                            <span className="grid-manga-button-text">Read</span>
                        </span>
                    </button>
                    <button className="grid-manga-button">
                        <span className="grid-manga-button-hover">
                            <img className="grid-manga-button-img" src={bookmark}/>
                            <span className="grid-manga-button-text">Save</span>
                        </span>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default GridManga