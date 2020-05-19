import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import PlaceList from '../../components/PlaceList';
import NavigationUtils from '../../utils/navigation.utils';
import { getPlaces } from '../../core/actions'

class FindPlace extends Component {

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  }

  componentDidMount() {
    this.props.onLoadplaces();
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    // this.setState({placesLoaded: true});
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({placesLoaded: true});
    });
    this.placesLoadedHandler();
  };

  itemSelectecdHandler = id => {
    const selPlace = this.props.places.find(place => {
      return place.id === id;
    })

    NavigationUtils.navigate('Detail', {
      selPlace
    })
  };

  render () {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.placesLoaded){
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim
          }}
        >
          <PlaceList 
            places={this.props.places}
            onItemSelected={this.itemSelectecdHandler}
          />
        </Animated.View>
      );
    }

    return (
      <>
        <Header 
          title='Find Place'
          openDrawer={true}
        />
        <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
          {content}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: '#1A9FE0',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: '#1A9FE0',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return{
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onLoadplaces: () => dispatch(getPlaces())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);