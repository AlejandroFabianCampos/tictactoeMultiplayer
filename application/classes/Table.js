
class Table {
    constructor(tableName, creatingUser){
        this.id = 
        this.tableName = tableName
        this.userA = creatingUser
        this.userB = ''
        this.cellValues = [[0,0,0],[0,0,0],[0,0,0]]
        this.playerPlayingNow = ""
        this.moveCount = 0
        this.gameEnded = false
        this.winner = ''
    }  

    addMove (row, column, playerSide) {
        
        // console.log('Added move');
        const { cellValues, playerPlayingNow, gameEnded } = this;
        let newCellValues = cellValues, playerPlayingNext;

        if (playerSide != playerPlayingNow) {
            return `It isn't your turn`
        }

        if (gameEnded === false && cellValues[row][column] === 0) {
            if (playerPlayingNow === "circle") {
                newCellValues[row][column] = 1;
                playerPlayingNext = "cross";
            } else {
                newCellValues[row][column] = 2;
                playerPlayingNext = "circle";
            }

            this.cellValues = newCellValues 
            this.playerPlayingNow = playerPlayingNext;
            let win = this.checkIfGameEnded(row, column, playerPlayingNow);
            return win;
        }
    }

    restartGame () {
        this.cellValues = [[0,0,0],[0,0,0],[0,0,0]]
        this.playerPlayingNow = "circle" 
        this.moveCount = 0  
        this.gameEnded = false
        this.winner = ''
    }
    
    checkIfGameEnded (row, column, playerPlayingNow) {
        let { cellValues, moveCount } = this;

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
                this.gameEnded = true 
                this.winner = playerPlayingNow
                win = true;
            }
        }

        //check row
        for(let i = 0; i < n; i++){
            if(cellValues[i][column] != s)
                break;
            if(i == n-1){
                //report win for s
                this.gameEnded = true 
                this.winner = playerPlayingNow
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
                    this.gameEnded = true 
                    this.winner = playerPlayingNow
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
                    this.gameEnded = true 
                    this.winner = playerPlayingNow
                    win = true;
                }
            }
        }


        if (win === true){
            return `${this.winner} has won`
        }
        //check draw
        if(moveCount == (Math.pow(n, 2) - 1) && win === false){
            //report draw
            this.gameEnded = true 
            this.winner = 'Draw'
            return `It is a Draw`
        } 

        this.moveCount = moveCount+1;
    }

}

module.exports = Table;