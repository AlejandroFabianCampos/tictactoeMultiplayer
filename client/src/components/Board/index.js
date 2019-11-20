import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

import Cell from '../Cell'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cellValues: [[0,0,0],[0,0,0],[0,0,0]],
             playerPlayingNow: "",
             moveCount: 0,
             gameEnded: false,
             winner: ''
        }
    }

    componentWillMount () {
        this.restartGame();

    }

    addMove = (row, column) => {
        console.log('Added move');
        const { cellValues, playerPlayingNow, gameEnded } = this.state;
        let newCellValues = cellValues, playerPlayingNext;


        if (gameEnded === false && cellValues[row][column] === 0) {
            if (playerPlayingNow === "circle") {
                newCellValues[row][column] = 1;
                playerPlayingNext = "cross";
            } else {
                newCellValues[row][column] = 2;
                playerPlayingNext = "circle";
            }

            this.setState({ cellValues: newCellValues, playerPlayingNow: playerPlayingNext});
            this.checkIfGameEnded(row, column, playerPlayingNow);
        }
    }

    restartGame = () => {
        this.setState({ cellValues: [[0,0,0],[0,0,0],[0,0,0]], playerPlayingNow: "circle", moveCount: 0, gameEnded: false, winner: ''});
    }
    
    checkIfGameEnded = (row, column, playerPlayingNow) => {
        let { cellValues, moveCount } = this.state;

        //actual version will only work on a 3x3 grid
        let n = 3;
        let s = playerPlayingNow === 'circle' ? 1 : 2;
        let win = false;
        //check end conditions
        
        //check col
        for(let i = 0; i < n; i++){
            if(cellValues[row][i] != s)
                break;
            if(i == n-1){
                //report win for s
                this.setState({gameEnded: true, winner: playerPlayingNow});
                win = true;
            }
        }

        //check row
        for(let i = 0; i < n; i++){
            if(cellValues[i][column] != s)
                break;
            if(i == n-1){
                //report win for s
                this.setState({gameEnded: true, winner: playerPlayingNow});
                win = true;
            }
        }

        //check diag
        if(row == column){
            //we're on a diagonal
            for(let i = 0; i < n; i++){
                if(cellValues[i][i] != s)
                    break;
                if(i == n-1){
                    //report win for s
                    this.setState({gameEnded: true, winner: playerPlayingNow});
                    win = true;
                }
            }
        }

        //check anti diag
        if(row + column == n - 1){
            for(let i = 0; i < n; i++){
                if(cellValues[i][(n-1)-i] != s)
                    break;
                if(i == n-1){
                    //report win for s
                    this.setState({gameEnded: true, winner: playerPlayingNow});
                    win = true;
                }
            }
        }

        //check draw
        if(moveCount == (Math.pow(n, 2) - 1) && win === false){
            //report draw
            this.setState({gameEnded: true, winner: 'Draw'});
        }

        this.setState({ moveCount: moveCount+1});
    }
    
    render() {
        let { cellValues, gameEnded, winner } = this.state;


        return (
            <div>
                <Table dark>
                    <tbody>
                        <tr className="board-row">                          
                            <td className="board-cell" onClick={() => this.addMove(0,0)}><Cell cellValue={cellValues[0][0]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(0,1)}><Cell cellValue={cellValues[0][1]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(0,2)}><Cell cellValue={cellValues[0][2]}/></td>
                        </tr>
                        <tr className="board-row">
                            <td className="board-cell" onClick={() => this.addMove(1,0)}><Cell cellValue={cellValues[1][0]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(1,1)}><Cell cellValue={cellValues[1][1]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(1,2)}><Cell cellValue={cellValues[1][2]}/></td>
                        </tr>
                        <tr className="board-row">
                            <td className="board-cell" onClick={() => this.addMove(2,0)}><Cell cellValue={cellValues[2][0]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(2,1)}><Cell cellValue={cellValues[2][1]}/></td>
                            <td className="board-cell" onClick={() => this.addMove(2,2)}><Cell cellValue={cellValues[2][2]}/></td>
                        </tr>
                    </tbody>
                </Table>
                
                <Button onClick={this.restartGame}>Restart</Button>
                <div className="board-big-text">
                    {gameEnded === true && `${winner} has won!`}
                </div>
            </div>
        )
    }
}
