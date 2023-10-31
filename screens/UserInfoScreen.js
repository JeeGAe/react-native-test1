import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function UserInfoScreen({ navigation, userInfo }){
  const navigateToHome = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.block}>
      <TouchableOpacity style={styles.backBtnLocation} onPress={navigateToHome}>
        <View style={styles.backBtnContainer}>
          <Text style={styles.backBtn}>{'<'}</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Image source={require('../assets/imgs/nothing.jpg')} style={styles.img}/>
      </View>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoText}>{`이름        ${userInfo.name}`}</Text>
        <Text style={styles.userInfoText}>{`이메일     ${userInfo.email}`}</Text>
        <Text style={styles.userInfoText}>{`주소지     ${userInfo.address}`}</Text>
        <Text style={styles.userInfoText}>{`관심사     ${userInfo.interest}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  block : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    gap : 30,
  },
  backBtnLocation : {
    position : 'absolute',
    top : 10,
    left : 15,
    width : 50,
    height : 50,
  },
  backBtn : {
    fontSize : 25,
    fontWeight : 'bold',
  },
  img : {
    width : 200,
    height : 200,
    borderRadius : 200,
  },
  userInfoTextContainer : {
    gap : 10,
  },
  userInfoText : {
    color : '#000',
    fontWeight : 'bold'
  }
})

export default UserInfoScreen;