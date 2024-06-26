import React, { useCallback, useEffect, useState } from "react";
import './Field.css' 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { move, incrementSnakeSize, gameRestart} from "../../store/snakeSlice";
import { randomApplePosition } from "../../store/appleSlice";
import Square from "../Square/Square";

const Field = () => {
    const [status, setStatus] = useState('Start')
    const [direction, setDirection] = useState('d')
    const [visibleSquares, setVisibleSquares] = useState<number>(0);
    const [animationCompleted, setAnimationCompleted] = useState(false);

    const handleStatus = (value: string)=> {
        if(value === 'Start')
            setStatus('Pause')
        else if (value === 'Pause')
            setStatus('Resume')
        else if (value === 'Resume')
            setStatus('Pause')
    }

    
    interface item {
        x: number;
        y: number;
        index: string;
    }
    
    const fieldId: item[] = [];
    for (let y = 1; y < 9; y++) {
        for (let x = 1; x < 9; x++) {
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

    const handleGameStatus = useCallback(()=>{
        dispatch(gameRestart())
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVisibleSquares((prev) => prev + 1);
        }, 100); 

        if (visibleSquares >= fieldId.length) {
            clearInterval(intervalId);
            setTimeout(() => setAnimationCompleted(true), 500); 
        }

        return () => clearInterval(intervalId);
    }, [visibleSquares, fieldId.length]);


    return (
        <>
        <div className="fieldContainer">
            <div className="field">
                {fieldId.map((item, index) => {
            return (
                <Square item={item} key={item.index} className={visibleSquares > index ? 'cellOfField' : '' } animationCompleted={animationCompleted}/>)})}

            </div>
            <div className="btnContainer">
                <button onClick={()=>handleStatus(status)}>{status}</button>
            </div>
        </div>
        {gameStatus==='lose' 
        && <div className="restartContainer">
                <div className="youLose">
                    <span>Y</span>
                    <span>o</span>
                    <span>u</span>
                    <span>l</span>
                    <span>o</span>
                    <span>s</span>
                    <span>e</span>
                    <span>!</span>
                </div>
                <button style={{fontSize: '42px', width: '40vh', height: '10vh', margin: '1vh'}} onClick={handleGameStatus}>Restart</button>
            </div>}
        </>
    );
}

export default Field;
