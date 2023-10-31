/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 컴포넌트
import HomeScreen from './screens/HomeScreen';
import UserInfoScreen from './screens/UserInfoScreen';

// api
import { getCollection } from './apis/firebase';

const Stack = createNativeStackNavigator();

function App() {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    function onResult(querySnapshot){
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          ...doc.data(),
          id : doc.id
        })
      });
      setFilteredUsers([...list])
      setUsers(list);
      setLoading(false);
    }

    function onError(error){
      console.log(`${error} occured when reading Users data`);
    }
    
    return getCollection('Users', onResult, onError, null, null, null);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Home" children={(props) => (
          <HomeScreen 
            {...props}
            loading={loading}
            users={users}
            setUsers={setUsers}
            setUserInfo={setUserInfo}
            filteredUsers={filteredUsers}
            setFilteredUsers={setFilteredUsers}
          />
        )} />
        <Stack.Screen name="UserInfo" children={(props) => (
          <UserInfoScreen {...props} userInfo={userInfo}/>
        )} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
