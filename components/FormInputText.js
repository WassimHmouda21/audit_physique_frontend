import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

export default function FormInputText({placeholder, extraStyle , onChangeText}) {
    return (
                <View
          style={[
            {
                borderBottomColor: '#DSD8DC',
                borderBottomWidth: 1,
            },
            extraStyle,
          ]}>
          <TextInput
           placeholder={placeholder}
           onChangeText={text => onChangeText(text)}
           />
           </View>
        );

    }
