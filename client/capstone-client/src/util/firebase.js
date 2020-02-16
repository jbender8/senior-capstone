const firebase = require('firebase');
require('firebase/firestore');

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
const DB_NAME = 'testJobs';

export const getAllJobs = () => {
  const jobs = [];
  db.collection(DB_NAME).get().then(qs => {
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
  db.collection(DB_NAME)
    .where('JobLocation', '==', location)
    .where('JobSalary', '>=', minSalary)
    .where('JobSalary', '<=', maxSalary)
    .where('JobSkills', 'array-contains-any', skills)
    .get()
    .then(qs => qs.forEach(doc => jobs.push(doc.data())));

  return jobs;
}

export default db;