import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { 
    Event, 
    Track,
    useTrackPlayerEvents
} from 'react-native-track-player'
import { playlistData } from '../constants'
import ControlCenter from '../components/ControlCenter'
import SongInfo from '../components/SongInfo'
import SongSlider from '../components/SongSlider'

const {width} = Dimensions.get('window')

const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        switch (event.type) {
            case Event.PlaybackActiveTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.index??0)
                // if (typeof event.index === 'number') {
                //     const playingTrack = await TrackPlayer.getTrack(event.index);
                // }
                
                setTrack(playingTrack)
                break;
        }
    })

    const renderArtWork = () => {
        return (
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {track?.artwork && (
                        <Image 
                            style={styles.albumArtImg}
                            source={{uri: track?.artwork.toString()}}
                        />
                    )}
                </View>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <FlatList 
        horizontal
        data={playlistData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />

      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
      },
      listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      albumContainer: {
        width: 300,
        height: 300,
      },
      albumArtImg: {
        height: '100%',
        borderRadius: 4,
      },
});