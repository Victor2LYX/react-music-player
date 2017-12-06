/**
 * Created by lyx on 2017/12/3.
 */
import React from 'react';
import ListItem from './listItem';

class List extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    componentWillUnmount() {

    }
    render(){
        let Items = this.props.musicList.map((item)=>{
            return (
                <ListItem key={item.id} data={item} focus={this.props.currentMusicItem === item}></ListItem>
            );
        });
        return(
            <ul>
                {Items}
            </ul>

        );
    }
}

List.defaultProps = {};
List.propTypes ={};
export default List;
