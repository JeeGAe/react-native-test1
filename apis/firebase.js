import firestore from '@react-native-firebase/firestore';

const getRef = (collections) => {
  return firestore().collection(collections);
}

export const addData = async (collections, data) => {
  console.log('adding user...', collections, data);
  await getRef(collections).add(data);
  console.log(`${collections} : ${JSON.stringify(data)} added in firestore!`);
  // .then(() => {
  //   console.log(`User added : `, JSON.stringify(data))
  // })
}

export const getCollection = (collections, onResult, onError, query, order, limit) => {
  let ref = getRef(collections);

  if(query && query.exists && query.condition && query.condition.length !== 0){
    for(let cond of query.condition){
      ref = ref.where(...cond);
    }
  }
  if(order && order.exists && order.condition && order.condition !== 0){
    ref = ref.orderBy(...order.condition);
  }
  if(limit && limit.exists && limit.condition){
    ref = ref.limit(limit.condition);
  }

  return ref.onSnapshot(onResult, onError);
}