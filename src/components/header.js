/**
 * Created by lyx on 2017/12/3.
 */
require('./../styles/header.less');

import React from 'react';

class Header extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
          <div className="component-header row">
              <img src="../images/logo.png" width="40px" alt="logo" className="-col-auto"/>
              <h2 className="caption">React Music Player</h2>
          </div>
        );
    }

}

Header.defaultProps = {};
Header.propTypes ={};
export default Header;
