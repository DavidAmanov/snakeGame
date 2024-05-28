import React from "react";
import './Snake.css'
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Snake = () => {
    const snakeBody = useSelector((state: RootState) => state.snakeMove.body);
    return (
        <>
        {snakeBody.map((segment, index) => {
            const style = {
                gridRowStart: segment.y,
                gridColumnStart: segment.x,
            };
            return <div key={index} className="solidSnake" style={style}></div>;
        })}
    </>
    )
}

export default Snake;
// C:/Users/David/Desktop/dev/react-tutorial/redux-toolkit/snake/public/dafoe.jpg