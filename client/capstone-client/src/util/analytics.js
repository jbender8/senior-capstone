const analytics = {};

analytics.citiesByFreq = data => {
    const cities = {};
    const cityObjects = [];
    for(const job of data) {
        if(job.JobLocation in cities) {
            cities[job.JobLocation] += 1;
        } else {
            cities[job.JobLocation] = 1;
        }
    }
    for(const cityName of Object.keys(cities)) {
        const freq = cities[cityName];
        cityObjects.push({
            name: cityName,
            value: freq
        });
    }
    return cityObjects;
}

analytics.jobTitlesByAveSalary = data => {
    const titles = {};
    const titleObjects = [];
    for(const job of data) {
        const title = job.JobTitle;
        if(title in titles) {
            console.log(job.JobSalary)
            titles[title].push(job.JobSalary);
        } else {
            titles[title] = [job.JobSalary];
        }
    }
    console.log(titles)
    for(const title of Object.keys(titles)) {
        titles[title] = titles[title].reduce((a, b) => a + b, 0) / titles[title].length;
        titleObjects.push({
            title,
            salary: titles[title]
        });
    }
    return titleObjects;
}

export default analytics;