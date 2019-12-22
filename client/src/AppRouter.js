import React, { Suspense, Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import { CircularProgress } from '@material-ui/core';

// import Landing from './pages/landing'
// import Lobby from './pages/lobby'

import io from 'socket.io-client';

const history = createBrowserHistory()

const Landing = React.lazy(() => import('./pages/landing'));
const Lobby = React.lazy(() => import('./pages/lobby'));


export default class AppRouter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            token: '',
            tables: []
           
        }

        
    }


    componentDidMount () {
        this.initializeSocket()
    }

    initializeSocket = () => {
        // console.log('Socket url ->', process.env.REACT_APP_SOCKET_URL)
        if (this.logSocket !== undefined) {
            this.logSocket = undefined
        }
        this.logSocket = io.connect(process.env.REACT_APP_SOCKET_URL+'/logIn')
        // , { transportOptions: { polling: { extraHeaders: { 'x-auth-token': this.session.token } } } }
        console.log('Created socket ->', this.logSocket)

        this.logSocket.on('logUserRes', (token) => {
            this.setState({ token })
            this.initiateAuthConnection()
            // console.log(token)
        })
    }

    initiateAuthConnection = () => {
        if (this.authSocket !== undefined) {
            this.authSocket = undefined
        }
        console.log(this.state.token)
        this.authSocket = io.connect(process.env.REACT_APP_SOCKET_URL+'/auth', { 
            forceNew: true,
            transportOptions: { 
                polling: { 
                    extraHeaders: { 'x-auth-token': this.state.token } 
                } 
            } 
        })
        console.log(this.authSocket)
        this.authSocket.emit('getTables')
        this.authSocket.on('getTablesRes', (tables) => {
            this.setState({ tables })
            console.log(tables)
            console.log(this.state)
        })
        history.push('/lobby')
    }

    connectNewPlayer = (username) => {
        // Here we send the user's desired name and after doing some manipulations on the backend we receive a jwt 
        console.log(username)
        this.logSocket.emit('logUser', { username })

    }
    
    render() {
        return (
        <BrowserRouter history={history}>
            <Suspense fallback={ <CircularProgress /> }>
                <Switch>
                    <Route exact path="/">
                        <Landing connectNewPlayer={this.connectNewPlayer}/>
                    </Route>
                    <Route exact path="/lobby">
                        <Lobby tables={this.state.tables}/>
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
        )
    }
}
