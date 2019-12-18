import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Landing = React.lazy(() => import('./pages/landing'));

export default function AppRouter() {
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
