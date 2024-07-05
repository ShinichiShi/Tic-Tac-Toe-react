import { useState } from 'react'
import './Game.css'

function Square({value, onBtnPress}) { 
  return (
    <>
      <button className="square" onClick={onBtnPress}>{value}</button>     
    </>
  )
}
function Board({mark , squares, onPlay}){ //setting up skeleton in this
 
  // const [squares , setSquares] = useState(Array(9).fill(null))

  const winner = calc(squares)
  let status;
  if(winner){
    status = "Winner: " + winner;
  }
  else {
    status = "Next Playing: " + (mark?'X':'O');
  }
  
  function handleClick(i){
    if (squares[i] || calc(squares)) {
      return;
    }
     const newSquares = squares.slice();
     if(mark){
     newSquares[i] = 'X'
     }
     else {
     newSquares[i] = 'O'
     }
     onPlay(newSquares)
    //  setMark(!mark)
  }
  return (  
    <>
    <div className='status'>{status}</div>
    <div className="row">
      <Square value={squares[0]} onBtnPress={()=>handleClick(0)}/>
      <Square value={squares[1]} onBtnPress={()=>handleClick(1)}/>
      <Square value={squares[2]} onBtnPress={()=>handleClick(2)}/>
    </div>
    <div className="row">
      <Square value={squares[3]} onBtnPress={()=>handleClick(3)}/>
      <Square value={squares[4]} onBtnPress={()=>handleClick(4)}/>
      <Square value={squares[5]} onBtnPress={()=>handleClick(5)}/>
    </div>
    <div className="row">
      <Square value={squares[6]} onBtnPress={()=>handleClick(6)}/>
      <Square value={squares[7]} onBtnPress={()=>handleClick(7)}/>
      <Square value={squares[8]} onBtnPress={()=>handleClick(8)}/>
    </div>
    </>
  )
}

export default function Game(){
  //const [mark,setMark] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const curr = history[currentMove]
  const mark = currentMove%2==0

  function handlePlay(newSquares){
    const nextHistory=[...history.slice(0,currentMove+1),newSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
  //  setMark(!mark)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
 //   setMark(nextMove%2==0)
  }

  const moves = history.map((squares, move) => {
    let desc;
    if(move>0){
      desc = 'Go to move #' + move;
    }
    else {
      desc='Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => { jumpTo(move) }}>
          {desc}
        </button>
      </li>
    )
  }
  )

  return (
    <>
    <div className="game-board">
      <Board mark={mark} squares={curr} onPlay={handlePlay}/>
    </div>
    <div className="game-info">
     <ol>{moves}</ol>
    </div>
    </>
  )
}


function calc(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ];  
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
