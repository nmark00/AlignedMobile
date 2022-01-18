import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';

export default function Stats(props) {

  return (
    <View>

    <Text>Let users query LikesReceived by:
      race, gender, age, region, height
    </Text>
    <Text/>

    <Text>Global Stats</Text>
    <Text>Regional Leaderboard</Text>
    <Text>Avg Likes sent to Likes received ratio</Text>
    <Text>Likes sent to Likes received ratio by gender</Text>
    <Text>Likes sent to Likes received ratio by race</Text>
    <Text>Avg # likes received by gender</Text>
    <Text>Avg # likes received by race</Text>
    <Text>Avg # likes received by height</Text>
    <Text>Avg # likes received by age</Text>
    
    <Text/>
    <Text>Personal Stats</Text>
    <Text>Likes sent to Likes received ratio</Text>
    <Text>Total likes received/sent</Text>
    </View>
  );
}
