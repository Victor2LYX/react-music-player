/**
 * Created by lyx on 2017/12/3.
 */
require('./../styles/logo.less');
import React from 'react';


class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="row components-logo">
                <img src="./../images/logo.png" width="40" alt="" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
            </div>
        );
    }
}

Logo.defaultProps = {};
Logo.propTypes = {};
export default Logo;
