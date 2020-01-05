import React, { Suspense, Component } from 'react'
import { BrowserRouter, Router, Route, Switch, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import { CircularProgress } from '@material-ui/core';

import PrivateRoute from './components/PrivateRoute';

import io from 'socket.io-client';

const history = createBrowserHistory()

const Landing = React.lazy(() => import('./pages/landing'));
const Lobby = React.lazy(() => import('./pages/lobby'));


class AppRouter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            token: '',
            tables: [],
            username: '',
            isAuthenticated: false,
           
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
        console.log('Created socket ->', this.logSocket)

        this.logSocket.on('logUserRes', (token) => {
            this.setState({ token, isAuthenticated: true })
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
        // console.log(username)
        this.setState({ username })
        this.logSocket.emit('logUser', { username })
    }

    createTable = (tableName) => {
        console.log(`Creating table with tableName = ${tableName} and username = ${this.state.username}`)
        this.authSocket.emit('createTable', { tableName, playerName: this.state.username})
        this.authSocket.emit('getTables')
    }
    
    render() {
        return (
        <Router history={history}>
            <Suspense fallback={ <CircularProgress /> }>
                <Switch>
                    <Route exact path="/" >
                        <Landing connectNewPlayer={this.connectNewPlayer}/>
                    </Route>
                    <PrivateRoute exact path="/lobby" isAuthenticated={this.state.isAuthenticated}>
                        <Lobby tables={this.state.tables} createTable={this.createTable} history={history}/>
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
        )
    }
}

export default AppRouter