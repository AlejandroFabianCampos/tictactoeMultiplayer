const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const Table = require('../classes/Table');

let appSecret = process.env.APP_SECRET

let tables = [];


let controller = (ioInstance) => {
    let loginNamespace = ioInstance.of('/logIn')
    let authNamespace = ioInstance.of('/auth')

    loginNamespace.on('connection', function(socket){
        console.log('a user connected');
        // console.log(socket)
        socket.emit('autoRes', { message:'Connected successfully' });

        socket.on('logUser', function(data){
            let payload = { username: data.username, id: uuidv4() };
            // console.log(appSecret)
            let token = jwt.encode(payload, appSecret);
            socket.emit('logUserRes', token);
        })
    })
    

    authNamespace.on('connection', function(socket){
        console.log('a user connected');
        socket.emit('autoRes', { message:'Connected successfully' });

        socket.on('getTables', function(){
            let token = socket.handshake.headers["x-auth-token"];
            // console.log(socket)
            // console.log(token, typeof token)
            if (!token || token == 'null') {
                return console.log('No token supplied')
            }
            // console.log(token)
            let decoded = jwt.decode(socket.handshake.headers["x-auth-token"], appSecret);
            console.log(decoded)

            socket.emit('getTablesRes', tables);
        })

        socket.on('joinTable', function(data){
            // Run join Table verification(data) and if correct Update and send res
            // let msg = '';
            // if (joinStatus === 'successful') {
            //     msg = 'successful';
            // } else {
            //     msg = 'error';
            // }
            socket.emit('joinTableRes', 'Joined table')
        })

        socket.on('createTable', function(data){
            // Run create Table verification(data) and if correct Update and send res
            // let msg = '';
            // if (joinStatus === 'successful') {
            //     msg = 'successful';
            // } else {
            //     msg = 'error';
            // }
            console.log('Creating table');
            let table = new Table(data.tableName, data.playerName)
            tables.push(table)
            
            socket.emit('createTableRes', table)
        })

        socket.on('startGame', function(data){
            // Start the game
            // socket.emit('startGameRes', response)
        })

        socket.on('restartGame', function(data){
            // restartGame
            // socket.emit('restartGameRes', response)
        })
        
        socket.on('makeMove', function(data){
            // Make the move and respond with new table data
            // socket.emit('makeMoveRes', responseData)
        })

        socket.on('abandonTable', function(data){
            // Run abandon Table verification(data) and if correct Update and send res
            // let msg = '';
            // if (joinStatus === 'successful') {
            //     msg = 'successful';
            // } else {
            //     msg = 'error';
            // }
            // socket.emit('abandonTableRes', msg)
        })

    });

    
}

module.exports = controller;