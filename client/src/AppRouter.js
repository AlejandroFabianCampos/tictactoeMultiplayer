import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';

import io from 'socket.io-client';

const Landing = React.lazy(() => import('./pages/landing'));


export default class AppRouter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           
        }

    }

    componentWillMount () {
        this.initializeSocket()
    }

    initializeSocket = () => {
        console.log('Socket url ->', process.env.REACT_APP_SOCKET_URL)
        this.socket = io(process.env.REACT_APP_SOCKET_URL)
        console.log('Created socket ->', this.socket)
    }
    
    render() {
        return (
            <Router>
            <Suspense fallback={ <CircularProgress /> }>
                <Switch>
                    <Route path="/" >
                        <Landing />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
        )
    }
}
