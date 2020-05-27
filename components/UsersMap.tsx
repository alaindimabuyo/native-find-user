import React, {useState} from 'react'
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


interface Props {
  userLocation : Location | null
}

interface Location {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const UsersMap: React.FC<Props> = ({userLocation}) => {
  return (
    <View style={styles.container}>
      {userLocation !== null ? <MapView style={styles.mapStyle} 
        initialRegion={{
          latitude:  37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        }}
        region={userLocation}
        
        ><Marker coordinate={userLocation}></Marker></MapView> : []}
      
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200
  },
  mapStyle: {
    width: '100%',
    height: '100%'
  },
});
export default UsersMap


