import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

function UserList({ name, email, address, interest, setUserInfo, navigation }){
  const clickUserInfo = () => {
    const user = {
      name : name,
      email : email,
      address : address,
      interest : interest,
    }

    setUserInfo(user);
    navigation.navigate('UserInfo')
  }

  return (
    <View style={styles.block}>
      <View style={styles.userListContainer}>
        <View>
          <Image source={require('../assets/imgs/nothing.jpg')} style={styles.userImg}/>
        </View>
        <View>
          <Text style={{ fontSize : 17, fontWeight : 'bold'}}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={clickUserInfo} style={styles.userInfoBtnContainer}>
        <View>
          <Text style={styles.userInfoBtn}>{'〉'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  block : {
    flexDirection : 'row',
    width : '80%',
    minWidth : 350,
    justifyContent : 'space-between',
    marginTop : 20,
  },
  userListContainer : {
    flexDirection : 'row',
    gap : 10,
  },
  userImg : {
    width : 50,
    height : 50,
    borderRadius : 40,
  },
  userInfoBtnContainer : {
    width : 50,
    height : 50,
  },
  userInfoBtn : {
    fontSize : 25,
    fontWeight : 'bold',
  }
})

export default UserList;