import React from "react";
import './Apple.css'
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Apple = () => {
    const applePosition = useSelector((state: RootState) => state.apple.positionApple);
    const style = {
        gridRowStart: applePosition.y,
        gridColumnStart: applePosition.x,
    }

    return(
        <span className="apple" style={style}></span>
    )
}
export default Apple;