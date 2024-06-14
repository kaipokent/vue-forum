import { initializeApp } from 'firebase/app'
import { getDatabase, ref as dbRef } from 'firebase/database'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAlD3LBZN0in--w6bJkjnOCH6KA06SFcFo',
  authDomain: 'vue-forum-a025e.firebaseapp.com',
  projectId: 'vue-forum-a025e',
  storageBucket: 'vue-forum-a025e.appspot.com',
  messagingSenderId: '658950932237',
  appId: '1:658950932237:web:b9a7f49fa0ecd720a35244'
})
export const db = getDatabase(firebaseApp)

export const categoriesRef = dbRef(db, 'categories')
export const forumsRef = dbRef(db, 'forums')
export const moderatorsRef = dbRef(db, 'moderators')
export const postsRef = dbRef(db, 'posts')
export const statsRef = dbRef(db, 'stats')
export const threadsRef = dbRef(db, 'threads')
export const usersRef = dbRef(db, 'users')
