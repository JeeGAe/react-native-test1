import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

function SearchUser({ users, setFilteredUsers }){
  const copyUsers = [...users]

  const handleSearchUser = (text) => {
    let filteredUsers = copyUsers.filter(user => {
      return user.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  }

  return (
    <View style={styles.container}>
      <Icon.Button
        name="search"
        size={30}
        iconStyle={styles.icon}
        onPress={() => Keyboard.dismiss()}
      >
      </Icon.Button>
      <View style={{ flex : 1 }}>
        <TextInput 
          style={styles.input}
          placeholder='찾고 싶은 유저 이름을 적어주세요!'
          onChangeText={handleSearchUser}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    paddingLeft : 10,
    height : 50,
    flexDirection : 'row',
  },
  icon : {
    paddingLeft : 10,
  },
  input : {
    fontSize : 20,
    flex : 1,
  }
})

export default SearchUser;