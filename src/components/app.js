//require('normalize.css/normalize.css');
//require('./../styles/app.less');
//import $ from 'jquery';
//import 'jplayer';
import React from 'react';
import PubSub from 'pubsub-js';

import Logo from './logo';
import {randomRange} from './util';

let musicListData = require('./../jsonData/config.json');
class App extends React.Component {

    playMusic(item){
        $('#player').jPlayer('setMedia', {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    }
    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let listLen = this.state.musicList.length;
            let randomIndex = 0;
            if(listLen === 1){
                randomIndex = 0;
            }
            else
            {
                randomIndex = randomRange(0, listLen - 1);
                while(randomIndex === index) {
                    randomIndex = randomRange(0, listLen - 1);
                }
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        } else {
            this.playNext();
        }
    }
    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        } else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        //this.setState({
        //    currentMusicItem: musicItem
        //});
        this.playMusic(musicItem);
    }
    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    }

    constructor(props) {
        super(props);
        this.state = {
            musicList: musicListData,
            currentMusicItem: {},
            repeatType: 'cycle'
        };
    }
    componentDidMount() {
        $('#player').jPlayer({
            supplide: 'mp3',
            wmode: 'window',
            useStateClassSkin: true
        });
        this.playMusic(this.state.musicList[0]);
        $('#player').bind($.jPlayer.event.ended, (e) => {
            //e.stopPropagation();
            //e.preventDefault();
            this.playWhenEnd();
        });

        PubSub.subscribe('PLAY_MUSIC',(msg,item) =>{
            this.playMusic(item);
        });
        PubSub.subscribe('DEL_MUSIC',(msg,item)=>{
            this.setState({
               musicList:this.state.musicList.filter((music)=>{
                   return music !== item;
               })
            });
        });
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];
        PubSub.subscribe('CHANAGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('CHANAGE_REPEAT');
    }

    render() {
        return (
            <div className="container">
                <Logo></Logo>
                {React.cloneElement(this.props.children,this.state)}
            </div>
        );
    }
}
export default App;
