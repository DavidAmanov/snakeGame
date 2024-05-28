import { createSlice } from "@reduxjs/toolkit";
import { Position } from "./snakeSlice";


const arrPositions = [1,2,3,4,5,6,7,8]

interface AppleState {
    positionApple: Position
}

const initialState: AppleState = {
    positionApple: {x:1, y:2}
};

const appleSlice = createSlice({
    name: 'apple',
    initialState, 
    reducers: {
        randomApplePosition(state, action){
            if(action.payload === 'eaten'){
                state.positionApple.x =  Math.floor(Math.random() * arrPositions.length)+1; //cant be zero
                state.positionApple.y =  Math.floor(Math.random() * arrPositions.length)+1; //cant be zero
            } 
        }
    }
})

export const {randomApplePosition} = appleSlice.actions;
export default appleSlice.reducer;