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
  const jobs = [];
  db.collection('job').get().then(qs => {
    qs.forEach(doc => {
      jobs.push(doc.data());
    });
  });
  return jobs;
}

export const userQuery = ({salary, skills, location, level}) => {
  let minSalary, maxSalary;
  if(typeof salary === 'array') {
    minSalary = salary[0];
    maxSalary = salary[1];
  } else {
    minSalary = salary;
    maxSalary = '99999999999';
  }

  const jobs = [];
  db.collection('job')
    .where('location', '==', location)
    .where('salary', '>=', minSalary)
    .where('salary', '<=', maxSalary)
    .where('skills', 'array-contains-any', skills)
    .where('level', '==', level)
    .get()
    .then(qs => qs.forEach(doc => jobs.push(doc.data())));

  return jobs;
}

export default db;