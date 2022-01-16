import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { BarCodeSanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'


export default class TransactionScreen extends Component {

  constructor() {
    super()
    this.state = {
      domState: 'normal',
      hasCameraPermissions: null,
      scanned: false,
      scannedData : ''   
    }
  }

  getCameraPermissions = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    
    this.setState({
      hasCameraPermissions: status === 'granted',
      domState: domState,
      scanned : false
    })

  }
  handleBarCodeScanner = async ({type,data}) => {
    this.setState({
      scannedData : data,
      domState : "normal",
      scanned : true
    })
  }


  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state
    
    if (domState === 'scanner') {
      return (
        <BarCodeSanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style= {StyleSheet.absoluteFillObject}
        />
      )
    }

    else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>

            {hasCameraPermissions ? scannedData : "Request For Camera Permissions"}        

          </Text>
          <TouchableOpacity style = {styles.button} onPress = {()=>this.getCameraPermissions('scanner')}>
            <Text >Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 40,
    fontWeight : 'bold'
  },
  button: {
    backgroundColor: 'gray',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
   
  
});
