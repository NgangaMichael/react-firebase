import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase-config';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';


function App() {

  const [newName, setnewName] = useState('');
  const [newage, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');


  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newage)});
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsers();
  },[]);

  return (
    <div className="App">

      <input placeholder='Name'
      onChange={(event) => {setnewName(event.target.value)}} 
      ></input>
      <input type='number' placeholder='Age'
      onChange={(event) => {setNewAge(event.target.value)}} 
      ></input>

      <button onClick={createUser}>Create user</button>

      {users.map((user) => {
        return(
          <div>
            <h3>Name: {user.name}</h3>
            <h3>Age: {user.age}</h3>
            <button onClick={() => {updateUser(user.id, user.age)}}>Increase age</button>
            <button onClick={() => {deleteUser(user.id)}}>Delete user</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
