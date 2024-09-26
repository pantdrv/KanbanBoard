import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  createContext,
  useMemo,
  useReducer,
} from "react";

import Board from './components/Board';
export function App() {


  useEffect(() => {

  }, []);
  return (
    <div>
        <Board></Board>
    </div>
  );
}

export default App;
