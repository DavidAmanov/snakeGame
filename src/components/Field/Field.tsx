import React, { useCallback, useEffect, useState } from "react";
import './Field.css' 
import Snake from "../Snake/Snake";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { move, incrementSnakeSize} from "../../store/snakeSlice";
import Apple from "../Apple/Apple";
import { randomApplePosition } from "../../store/appleSlice";

const Field = () => {
    const [status, setStatus] = useState('Start')
    const [direction, setDirection] = useState('d')

    const handleStatus = (value: string)=> {
        if(value === 'Start')
            setStatus('Pause')
        else if (value === 'Pause')
            setStatus('Resume')
        else if (value === 'Resume')
            setStatus('Pause')
    }

    const fieldId = [];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            fieldId.push({ x, y, index: '' + x + y});
        }
      }
 
    const position = useSelector((state: RootState)=>state.snakeMove.body[0]);
    const applePosition = useSelector((state: RootState)=>state.apple.positionApple);
    const gameStatus = useSelector((state: RootState)=>state.snakeMove.gameStatus)
    
    const dispatch = useDispatch();
    
    const handleKeyPress = useCallback((event: KeyboardEvent)=>{
        const keys = ['w', 'a', 's', 'd']
        if(keys.includes(event.key)){
            dispatch(move(event.key))
            setDirection(event.key)
        }

    }, [dispatch])

    useEffect(() => {
        if (status === 'Pause') {
          const intervalId = setInterval(() => {
            dispatch(move(direction));
          }, 300);
          
          return () => clearInterval(intervalId);
        }
      }, [status, direction, dispatch]);



    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, [handleKeyPress]);
    
    useEffect(() => {
        if (position.x === applePosition.x && position.y === applePosition.y) {
            dispatch(incrementSnakeSize());
            dispatch(randomApplePosition('eaten'))
        }
    }, [position.x, applePosition.x, position.y, applePosition.y, dispatch]);

    // useEffect(()=>{
    //     dispatch(gameOver(position))
    //     // console.log("snake" , position, "apple", applePosition)
    //     if(gameStatus==='lose'){
    //         setStatus('Pause')
    //     }
    // }, [position, applePosition, dispatch, gameStatus])

    return (
        <div className="fieldContainer">
        <div className="field">
            {fieldId.map((square => {
        return (
          <span key={square.index}></span>)}))}
        <Snake/>
        <Apple />
        </div>
        <div className="btnContainer">
            <button onClick={()=>handleStatus(status)}>{status}</button>
        </div>
        {gameStatus==='lose' 
        && <div>
            You lose!
            <button >Restart</button>
            </div>}
        </div>
    );
}

export default Field;
