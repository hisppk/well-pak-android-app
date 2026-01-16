import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Icon } from 'components'
import { hp, wp } from 'utils/helpers/responsive.helpers';
import { Colors } from 'globals';
import SoundPlayer from 'react-native-sound-player';

type compProps = {
    track: string;
};

export const AudioPlayer = (props: compProps) => {
    const { track } = props

    const [playerStatus, setPlayerStatus] = useState({ duration: 0.0, currentTime: 0.0 })

    const {
        playerMaxView,
        buttonsSection,
        progrsBarSection,
    } = styles;

    const [isPlaying, setPlaying] = useState(true);

    const onLoad = async (track) => {
        try {
            setPlaying(true);
            SoundPlayer.playUrl(track);
        } catch (e) {
            alert('Cannot play the file')
        }
    }

    const getInfo = async () => {
        try {
            const info = await SoundPlayer.getInfo()
            setPlayerStatus(info)
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    useEffect(() => {
        onLoad(track)

        const interval = setInterval(() => {
            getInfo()
        }, 400)

        return () => {
            clearInterval(interval)
        }
    }, [track]);

    const onPlayPausePress = async () => {
        if (isPlaying) {
            SoundPlayer.pause();
            setPlaying(false);
        } else {
            SoundPlayer.play();
            setPlaying(true);
        }
    };

    const secondsToHHMMSS = (seconds: number | string) => {
        // credits - https://stackoverflow.com/a/37096512
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
        const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
        return `${hrs}${mins}${scnds}`;
    };

    const playOrPauseIcon = isPlaying ? 'pause' : 'play';

    return (
        <View style={playerMaxView}>
            <View style={progrsBarSection}>
                <Text>{secondsToHHMMSS(Math.floor(playerStatus?.currentTime || 0))}</Text>
                <Slider
                    style={{ width: '70%', height: 40 }}
                    value={Math.floor(playerStatus?.currentTime || 0)}
                    minimumValue={0}
                    maximumValue={Math.floor(playerStatus?.duration || 0)}
                    minimumTrackTintColor="#52527a"
                    maximumTrackTintColor="#52527a"
                    thumbTintColor="#52527a"
                    onSlidingComplete={SoundPlayer.seek}
                />
                <Text>{secondsToHHMMSS(playerStatus?.duration || 0)}</Text>
            </View>
            <View style={buttonsSection}>
                <TouchableOpacity onPress={onPlayPausePress} style={styles.playPause} >
                    <Icon type={playOrPauseIcon} size={wp(5)} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const flexStyles: any = {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
};

const styles = StyleSheet.create({
    playerMaxView: {
        ...flexStyles,
        paddingHorizontal: hp(1),
    },
    progrsBarSection: {
        ...flexStyles,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonsSection: {
        ...flexStyles,
        flexDirection: 'column',
    },
    playPause: {
        padding: wp(1.4),
        borderRadius: wp(100),
        backgroundColor: Colors.white
    }
});
