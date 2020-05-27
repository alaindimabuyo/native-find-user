import React, {useState} from 'react';
import { StyleSheet, View, PermissionsAndroid} from 'react-native';
import FetchLocation from "./components/FetchLocation"
import UserMap from "./components/UsersMap"

interface LocationState {
    latitude: number 
    longitude: number 
    latitudeDelta: number 
    longitudeDelta: number 

}

const App: React.FC = () => {

  const [userLocation , setUserLocation] = useState<LocationState | null>(null)
  const getLocation = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'APP Permission',
          message: 'App needs your permission to access your location',
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
        )
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            navigator.geolocation.getCurrentPosition(position => {
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
              })
              fetch('https://test-react-native-93907.firebaseio.com/places.json', {
                method: 'POST',
                body: JSON.stringify({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                })
              })
              .then(res => console.log(res))
              .catch(err => console.log(err))
            }
            )
            
        }else{
          console.log('Location access denied')
        }
      
    } catch (error) {
      console.log(error)
    }
}
  
  return (
    <View style={styles.container}>
      <FetchLocation getLocation={getLocation} ></FetchLocation>
      <UserMap userLocation={userLocation}></UserMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;