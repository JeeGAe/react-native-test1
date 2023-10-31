import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, Alert, ScrollView } from 'react-native';

// 컴포넌트
import SearchUser from '../components/SearchUser';
import UserList from '../components/UserList';

// apis
import { addData, getCollection } from '../apis/firebase';

function HomeScreen({ navigation, loading, users, setUsers, setUserInfo, filteredUsers, setFilteredUsers }){
  const [addUserModalOpenToggle, setAddUserModalOpenToggle] = useState(false);
  const [addUserInput, setAddUserInput] = useState({
    name : '',
    email : '',
    address : '',
    interest : '',
  });
  

  const handleChange = (e) => {
    const { text } = e.nativeEvent;
    const { name } = e._dispatchInstances.memoizedProps;
    console.log(text, name)
    setAddUserInput({...addUserInput, [name] : text });
  }

  const handleSubmitUserData = async () => {
    if(!addUserInput.name.trim() || !addUserInput.email.trim() || !addUserInput.address.trim() || !addUserInput.interest.trim()){
        Alert.alert('유저 정보를 전부 입력해 주세요!');
        return;
    }

    const newUser = {
      name : addUserInput.name.trim(),
      email : addUserInput.email.trim(),
      address : addUserInput.address,
      interest : addUserInput.interest,
    }

    try {
      await addData('Users', newUser);
      setAddUserInput({
        name : '',
        email : '',
        address : '',
        interest : '',
      })
      setAddUserModalOpenToggle(false);

    } catch (error) {
      console.log(error)
    } 
  }

  if(loading){
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.block , {backgroundColor : 'lightgray'}]}>
      <SearchUser users={users} setFilteredUsers={setFilteredUsers}/>
      <ScrollView style={{ maxHeight : 500 }}>
        <View style={styles.userListContainer}>
          {/* 유저 리스트 */}
          {filteredUsers.length !== 0 &&
            filteredUsers.map(user => (
              <UserList 
                key={user.email}
                name={user.name}
                email={user.email}
                address={user.address}
                interest={user.interest}
                setUserInfo={setUserInfo}
                navigation={navigation}
              />
            ))
          }
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addUserBtnLocation} onPress={() => setAddUserModalOpenToggle(true)}>
        <View style={styles.addUserBtn}>
          <Text style={styles.addUserBtnText}>+</Text>
        </View>
      </TouchableOpacity>
      {/* 유저 등록 모달 */}
      <Modal
        animationType='fade'
        visible={addUserModalOpenToggle}
        transparent={false}
      >
        <View style={{ flex : 1, justifyContent : 'center', alignItems : 'center'}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInputWarpper}>
              <View style={styles.modalInputContainer}>
                <Text style={styles.modalInputText}>이름</Text>
                <TextInput 
                  style={styles.modalInput}
                  placeholder='이름을 입력해주세요'
                  maxLength={30}
                  autoCorrect={false}
                  onChange={handleChange}
                  value={addUserInput.name}
                  name='name'
                />
              </View>
              <View style={styles.modalInputContainer}>
                <Text style={styles.modalInputText}>이메일</Text>
                <TextInput 
                  style={styles.modalInput}
                  placeholder='이메일을 입력해주세요'
                  inputMode='email'
                  name='email'
                  value={addUserInput.email}
                  onChange={handleChange}
                />
              </View>
              <View style={styles.modalInputContainer}>
                <Text style={styles.modalInputText}>거주지</Text>
                <TextInput 
                  style={styles.modalInput}
                  placeholder='거주지를 입력해주세요'
                  name='address'
                  value={addUserInput.address}
                  onChange={handleChange}
                />
              </View>
              <View style={styles.modalInputContainer}>
                <Text style={styles.modalInputText}>관심사</Text>
                <TextInput 
                  style={styles.modalInput}
                  placeholder='관심사를 입력해주세요'
                  name='interest'
                  value={addUserInput.interest}
                  onChange={handleChange}
                />
              </View>
            </View>
            <View style={styles.modalBtnContainer}>
              <Pressable 
                style={[styles.modalBtn, { backgroundColor : 'gray'}]}
                onPress={() => setAddUserModalOpenToggle(false)}
              >
                <Text style={styles.modalBtnText}>취소</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalBtn, { backgroundColor : '#3598db'}]}
                onPress={handleSubmitUserData}
              >
                <Text style={styles.modalBtnText}>등록</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  block : {
    flex : 1,
    paddingTop : 100,
  },
  userListContainer : {
    alignItems : 'center' , 
    gap : 10 ,
  },
  addUserBtnLocation : {
    position : 'absolute',
    bottom : 100,
    right : 100, 
  },
  addUserBtn : {
    borderRadius : 15,
    width : 30,
    height : 30,
    backgroundColor : '#000',
    alignItems : 'center',
  },
  addUserBtnText : {
    color : '#fff',
    fontSize : 30,
    fontWeight : 'bold',
    lineHeight : 33,
  },
  modalContainer : {
    minHeight : 350,
    width : '100%',
    backgroundColor : 'lightgray',
    height : '40%',
    justifyContent : 'space-between'
  },
  modalInputWarpper : {
    paddingTop : 50,
    justifyContent : 'center',
    alignItems : 'center',
    gap : 10,
  },
  modalInputContainer : {
    width : '80%',
    flexDirection : 'row',
  },
  modalInputText : {
    flex : 0.3,
    fontSize : 20,
    color : 'gray',
    lineHeight : 40,
  },
  modalInput : {
    flex : 0.7,
    height : 40,
    backgroundColor : '#fff',
    paddingVertical : 0,
    paddingLeft : 10,
    fontSize : 18,
    borderRadius : 5,
    borderColor : 'gray', 
    borderWidth : 1,
  },
  modalBtnContainer : {
    paddingBottom : 15,
    flexDirection : 'row',
    justifyContent : 'space-evenly',
  },
  modalBtn : {
    justifyContent : 'center',
    width : '45%',
    height : 50,
    borderRadius : 5,
  },
  modalBtnText : {
    fontSize : 20,
    color : '#fff',
    fontWeight : 'bold',
    textAlign : 'center',
  }
})

export default HomeScreen;