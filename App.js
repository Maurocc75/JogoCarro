/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';

import Carro from './src/Carro';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,

      moveCarroComponent: new Animated.Value(0),
      carroStartposX: 30,
      carroSide: 'left',
      carroSpeed: 4200,

      gameOver: false,
    };
  }
  render() {
    return (
      <ImageBackground
        source={require('./src/imgs/bg.png')}
        style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.points}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 40,
              }}>
              {this.state.points}
            </Text>
          </View>
        </View>
        <Animated.Image
          source={require('./src/imgs/carPlayer.png')}
          style={{
            height: 190,
            width: 100,
            position: 'absolute',
            zIndex: 1,
            bottom: 60,
            resizeMode: 'stretch',
            transform: [{ translateX: this.state.movePlayerVal }],
          }}
        />

        <Carro
          carroImg={require('./src/imgs/carColision.png')}
          carroStartposX={this.state.carroStartposX}
          moveCarroComponent={this.state.moveCarroComponent}
        />

        <View style={styles.controls}>
          <Text style={styles.left} onPress={() => this.movePlayer('left')}>
            {'<'}
          </Text>
          <Text style={styles.right} onPress={() => this.movePlayer('right')}>
            {'>'}
          </Text>
        </View>
      </ImageBackground>
    );
  }

  movePlayer(direction) {
    if (direction == 'right') {
      this.setState({ playerSide: 'right' });
      Animated.spring(this.state.movePlayerVal, {
        toValue: Dimensions.get('window').width - 140,
        tension: 100, 
      }).start();
    } else if (direction == 'left') {
      this.setState({ playerSide: 'left' });
      Animated.spring(this.state.movePlayerVal, {
        toValue: 40,
        tension: 100,
      }).start();
    }
  }

  componentDidMount() {
    this.animateCarro();
  }

  animateCarro() {
    this.state.moveCarroComponent.setValue(-100);
    var windowH = Dimensions.get('window').height;
    var r = Math.floor(Math.random() * 2) + 1;
    if (r == 2) {
      r = 40;
      this.setState({ carroSide: 'left' });
    } else {
      r = Dimensions.get('window').width - 140;
      this.setState({ carroSide: 'right' });
    }
    this.setState({ carroStartposX: r });

    var refreshIntervalId; 

    refreshIntervalId = setInterval(() => {
      if (
        this.state.moveCarroComponent._value > windowH - 430 &&
        this.state.moveCarroComponent._value < windowH - 100 &&
        this.state.playerSide == this.state.carroSide
      ) {
        clearInterval(refreshIntervalId);
        this.setState({ gameOver: true });
        this.gameOver();
      }
    }, 50);

    setInterval( () => {
        this.setState({ carroSpeed: this.state.carroSpeed-50 })
      }, 10000);

     Animated.timing(
       this.state.moveCarroComponent,
       {
         toValue: Dimensions.get('window').height,
         duration: this.state.carroSpeed,
       }
     ).start(event => {
       if(event.finished && this.state.gameOver == false){
          clearInterval(refreshIntervalId);
          this.setState({points: ++this.state.points});
          this.animateCarro();
       }
       
     }); 
  }

  gameOver(){
    alert("Game Over!");
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    width: 362,
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  right: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  points: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
