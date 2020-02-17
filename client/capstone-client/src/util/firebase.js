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
const DB_NAME = 'RealFakeData';

export const getAllJobs = () => {
  const jobs = [];
  db.collection(DB_NAME).get().then(qs => {
    qs.forEach(doc => {
      jobs.push(doc.data());
    });
  });
  return jobs;
}

export const userQuery = ({salary, skills, location, data, setData}) => {
  let minSalary, maxSalary;
  if(typeof salary === 'array') {
    minSalary = salary[0];
    maxSalary = salary[1];
  } else {
    minSalary = salary;
    maxSalary = '99999999999';
  }
  
  skills = skills.map(skill => skill.toLowerCase());
  location = location.toLowerCase();

  db.collection(DB_NAME)
    .where('JobLocation', '==', location)
    .where('JobSalary', '>=', minSalary)
    .where('JobSalary', '<=', maxSalary)
    .where('JobSkills', 'array-contains-any', skills)
    .get()
    .then(qs => qs.forEach(doc => setData([...data, doc.data()]) ));

}


export const createFakeJobs = numJobs => {
  const randomLocation = () => ['chicago', 'san francisco', 'new york city'][Math.floor(Math.random() * 3)];
  for(; numJobs > 0; numJobs--) {
    db.collection(DB_NAME).add({
      JobSalary: (Math.random() * 75000) + 50000,
      JobSkills: ['python', 'r', 'sql'],
      JobTitle: Math.random() * 100 > 49 ? 'software engineer' : 'data scientist',
      JobLocation: randomLocation()
    })
    .then(docRef => console.log(docRef.id))
    .then(error => console.log(error));
  }
}

export default db;