import React from 'react'
import {Button, View} from 'react-native'

interface Props {
    getLocation(): void,
}


const FetchLocation: React.FC<Props> = ({getLocation}) => {
        return (
            <View>
                <Button title="button" onPress={getLocation}></Button>   
            </View>
        );
}

export default FetchLocation