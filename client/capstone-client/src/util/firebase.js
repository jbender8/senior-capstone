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
const DB_NAME = 'ScrapedJobs';

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

export const userQuery = ({salary, skills, locations, setData, fields}) => {
  const dashIndex = salary.indexOf('-');
  let minSalary, maxSalary;

  if(dashIndex !== -1) {
    const salaries = salary.split('-');
    [minSalary, maxSalary] = salaries;
  } else {
    minSalary = salary;
    maxSalary = "9999999999999999";
  }

  skills = skills.map(skill => skill.toLowerCase());
  locations = locations.map(l => l.toLowerCase());
  fields = fields.map(f => f.toLowerCase());

  console.log(minSalary, maxSalary, fields, locations, skills);

  db.collection(DB_NAME)
  .where('JobLocation', 'in', locations)
  .where('JobSalary', '>=', minSalary)
  .where('JobSalary', '<=', maxSalary)
  .get()
  .then(qs => qs.forEach(doc => {
    const job = doc.data();
    if(contains(skills, job.JobSkills) && fields.indexOf(job.JobDomain) !== -1) {
      setData(prev => [...prev, job]);
    }
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