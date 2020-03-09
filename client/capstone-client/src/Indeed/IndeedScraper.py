import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#urllist is a list of all searches including the results page numbers
cities = ["Chicago%2C+IL", "New+York%2C+NY", "San+Francisco%2C+CA", "Seattle%2C+WA", "Houston%2C+TX"]
job_desc = ["artificial+intelligence", "deep+learning", "machine+learning", "data+science"]
skills = ["python", "r", "sql", "hadoop", "spark", "java", "sas", "tableau", "hive", "scala", "aws", "c++", "matlab", "tensorflow", "c", "excel", "nosql", "linux", "azure", "sclkit-learn", "spss", "pandas", "javascript", "perl", "c#", "numpy", "keras", "git", "docker", "mysql", "hbase", "mongodb", "cassandra", "pytorch", "d3", "caffe"]
urllist = []
for city in cities:
    for desc in job_desc:
        for i in range(0, 51, 10):
            template = "https://www.indeed.com/jobs?q={}&l={}&radius=50&start={}"
            urllist.append([template.format(desc, city, i), desc.replace('+', ' ')])

#connect to firebase. the json file should be replaced by a json in the directory if you do not have this
cred = credentials.Certificate('seniorcapstone-46b64-firebase-adminsdk-9tth5-4bf505d030.json')
fb = firebase_admin.initialize_app(cred)
fs = firebase_admin.firestore.client(fb)
num = 0

#url should be the job posting page. getskills goes into the page and looks for skills in the skills list
def getskills(url):
    jobskills = []
    jobpage = requests.get(url)
    jobsoup = BeautifulSoup(jobpage.content, 'html.parser')
    desc = jobsoup.find("div", class_ = "jobsearch-jobDescriptionText")
    if desc != None and desc != []:
        desctxt = desc.text.lower()
        desclst = desctxt.split()
        for skill in skills:
            if skill in desclst:
                jobskills.append(skill)
    return jobskills

#url is a list of [url, job_desc]
for url in urllist:
    page = requests.get(url[0])
    soup = BeautifulSoup(page.content, 'html.parser')
    jobs = soup.find_all('div', class_="jobsearch-SerpJobCard unifiedRow row result")
    for j in jobs:
        jcompany = None
        jtitle = None
        jlocation = None
        jsalary = None
        href = j.find('a', class_="jobtitle turnstileLink", href = True)
        jlink = "https://www.indeed.com" + href['href']
        jskills = getskills(jlink)
        #Indeed uses div and span for the same fields in different entries
        #if the scraper can't find a span for the company then it will look for a div instead
        if j.find('span', class_="company") != None:
            jcompany = j.find('span', class_="company")
        else:
            jcompany = j.find('div', class_="company")
        if j.find('span', class_="title") != None:
            jtitle = j.find('span', class_="title")
        else:
            jtitle = j.find('a', class_="jobtitle turnstileLink")
        if j.find('div', class_="location accessible-contrast-color-location") != None:
            jlocation = j.find('div', class_="location accessible-contrast-color-location")
        else:
            jlocation = j.find('span', class_="location accessible-contrast-color-location")
        if j.find('div', class_="salaryText") != None:
            jsalary = j.find('div', class_="salaryText")
        else:
            jsalary = j.find('span', class_="salaryText")
        #create a dictionary to add data to the document
        data = {"JobDomain": url[1],
                "JobLink": jlink,
                "JobLocation": jlocation.text.strip(),
                "JobSalary": "",
                "JobSkills": jskills,
                "JobTitle": jtitle.text.strip(),
                "JobWebsite": "Indeed"}
        #not all postings were given a salary range. if there is none, default to ""
        if jsalary != None:
            salaryrange = []
            hourly = False
            salarystr = jsalary.text.strip()
            salarystr = salarystr.split()
            for s in salarystr:
                if s.lower() == "hour":
                    hourly = True
                if s.startswith("$"):
                    salaryrange.append(float(s[1:].replace(',', '')))
            if hourly:
                data["JobSalary"] = "{:0.2f}".format(sum(salaryrange)/len(salaryrange) * 40 * 52)
            else:
                data["JobSalary"] = "{:0.2f}".format(sum(salaryrange)/len(salaryrange))
        #create different documents for each posting
        if data["JobSkills"] != [] and data["JobSalary"] != "":
            docname = "ScrapedJobs/Indeed" + str(num)
            doc = fs.document(docname)
            doc.set(data)
            num += 1
