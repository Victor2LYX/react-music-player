/**
 * Created by lyx on 2017/12/3.
 */
import React from 'react';
import { Router, IndexRoute, Route, hashHistory} from 'react-router';
import App  from './app';
import Player from './player';
import List from './list';

class RootRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={List}></Route>
                </Route>
            </Router>
        );
    }
}
RootRouter.defaultProps = {};
RootRouter.propTypes = {};

export default RootRouter;
