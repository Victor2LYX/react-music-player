/**
 * Created by lyx on 2017/12/3.
 */
require('./../styles/listItem.less');
import React from 'react';
import PubSub from 'pubsub-js';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    deleteHandler(item, event) {
        event.stopPropagation();
        event.preventDefault();
        PubSub.publish('DEL_MUSIC', item);
    }

    playMusic(item, event) {
        event.stopPropagation();
        event.preventDefault();
        PubSub.publish('PLAY_MUSIC', item);
    }

    render() {
        let item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}
                onClick={this.playMusic.bind(this, item)}>
                <p><span className="bold">{item.title}</span> - {item.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, item)}></p>
            </li>
        );
    }
}

ListItem.defaultProps = {};
ListItem.propTypes = {};
export default ListItem;
