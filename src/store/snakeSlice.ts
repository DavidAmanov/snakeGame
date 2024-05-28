import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  export interface Position {
    x: number;
    y: number;
  }

  interface SnakeState {
    body: Position[];
    direction: string;
    gameStatus: string
  }

  const initialState: SnakeState = {
    body: [{ x: 1, y: 1 }],
    direction: 'd',
    gameStatus: "play"
  };

  const snakeSlice = createSlice({
    name: 'snake',
    initialState,
    reducers: {
      move(state, action: PayloadAction<string>) {
        const newHead = { ...state.body[0] };
        switch (action.payload) {
          case "d":
            newHead.x = newHead.x < 8 ? newHead.x + 1 : 1;
            break;
          case "s":
            newHead.y = newHead.y < 8 ? newHead.y + 1 : 1;
            break;
          case "a":
            newHead.x = newHead.x > 1 ? newHead.x - 1 : 8;
            break;
          case "w":
            newHead.y = newHead.y > 1 ? newHead.y - 1 : 8;
            break;
          default:
            break;
        }
        const hasCollision = state.body.some(segment => segment.x === newHead.x && segment.y === newHead.y);
        if (hasCollision) {
          state.gameStatus = 'lose';
          return;
        }
        state.body.unshift(newHead);
        state.body.pop(); 
      },
      incrementSnakeSize(state) {
        const newSegment = { ...state.body[state.body.length - 1] };
        state.body.push(newSegment); 
      }, 
      gameRestart(state){
        state.gameStatus = 'restart';
        if(state.gameStatus === 'restart'){
          state.body = [{ x: 1, y: 1 }];
          state.direction = 'd';
          state.gameStatus = "play";
        }
      }
    }
  });
  
  export const { move, incrementSnakeSize, gameRestart} = snakeSlice.actions;
  export default snakeSlice.reducer;


