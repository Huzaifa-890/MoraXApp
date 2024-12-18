import { View, Text,TouchableOpacity  } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';  

const Welcome = () => {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity >
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Welcome;