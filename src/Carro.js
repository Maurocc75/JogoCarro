import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image,
  ImageBackground,
  Dimensions,
  Animated } 
  from 'react-native';

export default class Carro extends React.Component {
  
  render() {
    return (
        <Animated.Image source={this.props.carroImg} 
        style={{
          height: 190,
          width: 100,
          position: 'absolute',
          resizeMode: 'stretch',
          left: this.props.carroStartposX,
          transform: [
            { translateY: this.props.moveCarroComponent}
          ]
        }}></Animated.Image>

    );
  }
}
