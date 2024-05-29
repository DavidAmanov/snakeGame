import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './Square.css'


interface item {
    item: {
    x: number;
    y: number;
    index: string;}
}

const Square = ({ item, className, animationCompleted }: { item: any; className?: string; animationCompleted: boolean }) => {
    const x: number = item.x
    const y: number = item.y
    const snakeBody = useSelector((state: RootState) => state.snakeMove.body);
    const applePosition = useSelector((state: RootState) => state.apple.positionApple);
    
    let style = '';
    if(animationCompleted===true){
        for(let cell of snakeBody){
            if(cell.x === x && cell.y === y){
                style = 'snake'
            }
        }
        if(x===applePosition.x && y===applePosition.y){
            style = 'apple'
        }
    }
    return(
        <>
            <span className={`cellcellOfField ${className}`}>
                <div className={style}></div>
            </span>
        </>
    )
}

export default Square;