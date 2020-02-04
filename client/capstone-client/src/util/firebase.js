const firebase = require('firebase');
require('firebase/firestore');

// db.collection('job').add({
//   level: 'junior',
//   location: 'chicago',
//   skills: ['statistics', 'machine learning', 'python'],
//   title: 'junior machine learning engineer (test)',
//   website: 'thisjobisfake.com',
//   salary: '75,000'
// })
//   .then(ref => console.log(`Success. Job created. Id=${ref.id}`))
//   .then(error => console.log(`Error => \n ${error}`));

firebase.initializeApp({
    apiKey: "AIzaSyB2rbtZmbpObKrAWgFNMlLXNHNpQYO6j_I",
    authDomain: "seniorcapstone-46b64.firebaseapp.com",
    databaseURL: "https://seniorcapstone-46b64.firebaseio.com",
    projectId: "seniorcapstone-46b64",
    storageBucket: "seniorcapstone-46b64.appspot.com",
    messagingSenderId: "914766340288",
    appId: "1:914766340288:web:47fe50d979f29b20378d25",
    measurementId: "G-SX109HBPFS"
  });

firebase.analytics();
const db = firebase.firestore();

export const getAllJobs = () => {
  db.collection('job').get().then(qs => {
    qs.forEach(doc => {
      console.log(`${doc.id}`);
      const object = doc.data();
      for(const prop in object) {
        console.log(` \t ${prop} = ${object[prop]}`);
      }
    });
  });
}

export default db;