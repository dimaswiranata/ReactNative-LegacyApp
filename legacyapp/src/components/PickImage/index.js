import  React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImageUtils from '../../utils/images.utils';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {

  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel){
        console.log('User Cancelled!');
      } else if (res.error){
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
      }
      this.props.onImagePicked({ uri: res.uri, base64: res.data });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button 
            title='Pick Image'
            onPress={this.pickImageHandler}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  }
});

export default PickImage;