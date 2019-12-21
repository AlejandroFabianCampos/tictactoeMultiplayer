import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

import io from 'socket.io-client';

const Landing = React.lazy(() => import('./pages/landing'));


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
        this.authSocket = io.connect(process.env.REACT_APP_SOCKET_URL+'/auth', { transportOptions: { polling: { extraHeaders: { 'x-auth-token': this.state.token } } } })
        this.authSocket.emit('getTables')
        this.authSocket.on('getTablesRes', (tables) => {
            this.setState({ tables })
            console.log(this.state)
        })
    }

    connectNewPlayer = (username) => {
        // Here we send the user's desired name and after doing some manipulations on the backend we receive a jwt 
        console.log(username)
        this.logSocket.emit('logUser', { username })

    }
    
    render() {
        return (
            <Router>
            <Suspense fallback={ <CircularProgress /> }>
                <Switch>
                    <Route path="/" >
                        <Landing connectNewPlayer={this.connectNewPlayer}/>
                    </Route>
                </Switch>
            </Suspense>
        </Router>
        )
    }
}
