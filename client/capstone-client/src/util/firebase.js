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

// export const userQuery = ({salary, skills, locations, data, setData}) => {
//   skills = skills.map(skill => skill.toLowerCase());
//   locations = locations.map(l => l.toLowerCase());
//   db.collection(DB_NAME).get().then(qs => {
//     qs.forEach(doc => {
//       const job = doc.data();
//       if(job.JobSalary >= salary && job.JobLocation in locations ) setData(prev => [...prev, job]);
//     });
//   });
// }

const contains = (a, b) => {
  for(const e1 of a) {
    for(const e2 of b) {
      if(e1 == e2) return true;
    }
  }
  return false;
}

export const userQuery = ({salary, skills, locations, setData}) => {
  skills = skills.map(skill => skill.toLowerCase());
  locations = locations.map(l => l.toLowerCase());
  db.collection(DB_NAME)
  .where('JobLocation', 'in', locations)
  .where('JobSalary', '>=', salary)
  .get()
  .then(qs => qs.forEach(doc => {
    const job = doc.data();
    console.log(skills, job.JobSkills)
    if(contains(skills, job.JobSkills)) setData(prev => [...prev, job]);
  }));
}


export const createFakeJobs = numJobs => {
  const randomLocation = () => ['chicago', 'san francisco', 'new york city'][Math.floor(Math.random() * 3)];
  for(; numJobs > 0; numJobs--) {
    db.collection(DB_NAME).add({
      JobSalary: "" + Math.floor((Math.random() * 75000) + 50000),
      JobSkills: ['python', 'r', 'sql'],
      JobTitle: Math.random() * 100 > 49 ? 'software engineer' : 'data scientist',
      JobLocation: randomLocation()
    })
    .then(docRef => console.log(docRef.id))
    .then(error => console.log(error));
  }
}

export default db;