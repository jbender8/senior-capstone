'''
This script is a scraper that scrapes Glassdoor
Four fields- Artifical Intelligence, Deep Learning, Machine Learning, Data Science
Cities- Chicago, San Francisco, New York City, Seattle, Houston
'''

import time
import firebase_admin
import google.cloud
from firebase_admin import credentials, firestore
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import ElementClickInterceptedException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.support.ui import WebDriverWait as wait


class GlassdoorScraper:
    def __init__(self):
        self.links_chicago = [
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=artificial+intelligence&sc.keyword=artificial+intelligence&locT=C&locId=1128808&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=deep+learnin&sc.keyword=deep+learning&locT=C&locId=1128808&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=machine+learning&sc.keyword=machine+learning&locT=C&locId=1128808&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=data+science&sc.keyword=data+science&locT=C&locId=1128808&jobType=']
        self.links_sanFrancisco = [
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=artificial+intelligence&sc.keyword=artificial+intelligence&locT=C&locId=1147401&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=deep+learning&sc.keyword=deep+learning&locT=C&locId=1147401&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=machine+learning&sc.keyword=machine+learning&locT=C&locId=1147401&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=data+science&sc.keyword=data+science&locT=C&locId=1147401&jobType='
        ]
        self.links_newYorkCity = [
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=artificial+intelligence&sc.keyword=artificial+intelligence&locT=C&locId=1132348&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=deep+learning&sc.keyword=deep+learning&locT=C&locId=1132348&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=machine+learning&sc.keyword=machine+learning&locT=C&locId=1132348&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=data+science&sc.keyword=data+science&locT=C&locId=1132348&jobType='
        ]
        self.links_seattle = [
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=artificial+intelligence&sc.keyword=artificial+intelligence+&locT=C&locId=1150505&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=deep+learning&sc.keyword=deep+learning&locT=C&locId=1150505&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=machine+learning&sc.keyword=machine+learning&locT=C&locId=1150505&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=data+science&sc.keyword=data+science&locT=C&locId=1150505&jobType='
        ]
        self.links_houston = [
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=artificial+intelligence&sc.keyword=artificial+intelligence&locT=C&locId=1140171&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=deep+learning&sc.keyword=deep+learning&locT=C&locId=1140171&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=machine+learning&sc.keyword=machine+learning&locT=C&locId=1140171&jobType=',
            'https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=data+science&sc.keyword=data+science+&locT=C&locId=1140171&jobType='
        ]
        self.jobSkills = ["python", "r", "sql", "hadoop", "spark", "java", "sas", "tableau", "hive", "scala", "aws", "c++",
                          "matlab", "tensorflow", "c", "excel", "nossql", "linux", "azure", "sclkit-learn", "spss", "pandas", "javascript", "perl",
                          "c#", "numpy", "keras", "git", "docker", "mysql", "hbase", "mongodb", "cassandra", "pytorch", "d3", "caffe"]

    def parseHelper(self, link, db, city, JobDomain):
        # Parse Glassdoor
        global countOfJobs
        pageIndex = 0
        driver = webdriver.Firefox()
        driver.get(link)

        # Bypass sign-in notification
        while(pageIndex < 1):
            try:
                driver.find_element_by_class_name("selected").click()
            except ElementClickInterceptedException:
                pass
            driver.implicitly_wait(1)
            try:
                driver.find_element_by_css_selector('.modal_closeIcon').click()
                print("Sign in notification has been bypassed")
            except NoSuchElementException:
                pass
            jobsOnPage = driver.find_elements_by_class_name("jl")

            # Scrape for jobs
            for job in jobsOnPage:
                job.click()
                time.sleep(1)
                infoCollected = False
                while not infoCollected:
                    try:
                        JobLocation = city
                        JobTitle = driver.find_element_by_xpath(
                            './/div[contains(@class, "title")]').text
                        JobWebsite = "Glassdoor"
                        JobDescription = driver.find_element_by_xpath(
                            './/div[@class="jobDescriptionContent desc"]').text
                        JobSkills = self.findSkills(JobDescription.lower())
                        JobLink = driver.current_url
                        infoCollected = True
                    except:
                        time.sleep(3)
                try:
                    actualSalary = self.findActualSalary(driver.find_element_by_xpath(
                        './/span[@class="gray salary"]').text)
                    if actualSalary != None:
                        JobSalary = actualSalary
                    else:
                        JobSalary = 0
                except (NoSuchElementException, WebDriverException) as e:
                    JobSalary = 0
                if JobSalary != 0 and city.lower() in JobLocation.lower():
                    # Add to Firebase database
                    documentName = "Glassdoor"+str(countOfJobs)
                    jobData = {
                        u'JobDomain': JobDomain,
                        u'JobLink': JobLink,
                        u'JobLocation': JobLocation,
                        u'JobSalary': JobSalary,
                        u'JobSkills': JobSkills,
                        u'JobTitle': JobTitle,
                        u'JobWebsite': JobWebsite

                    }
                    db.collection(u'ScrapedJobs').document(
                        documentName).set(jobData)
                    countOfJobs = countOfJobs+1
            pageIndex = pageIndex+1

            # Click to go to next page
            try:
                driver.find_element_by_xpath('.//li[@class="next"]//a').click()
            except NoSuchElementException:
                print("Scraping terminated before reaching target number of pages")
                break
        driver.close()
        print("Number of jobs added to database: {}".format(countOfJobs))

    def findSkills(self, description):
        # Find any of the skills in the job description
        skills = []
        for skill in self.jobSkills:
            if skill in description:
                skills.append(skill)
        return skills

    def findActualSalary(self, salaryRange):
        # Given the range of salary, derive the average salary from the range
        indexSeperator = salaryRange.find("-")
        lowSalaryRange = salaryRange[:indexSeperator]
        highSalaryRange = salaryRange[indexSeperator+1:]
        try:
            if lowSalaryRange.find("K") == -1:
                return None
            else:
                low = lowSalaryRange[1:-1]
                low = low + "000"
            if highSalaryRange.find("K") == -1:
                return None
            else:
                high = highSalaryRange[1:highSalaryRange.find("K")]
                high = high + "000"
            average = (int(low) + int(high))/2
            return str(average)
        except ValueError:
            return None

    def parse(self):
        cred = credentials.Certificate(
            "/Users/shashanksrikanth/Downloads/ServiceKey.json")
        app = firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Scraping Chicago...")
        self.parseHelper(
            self.links_chicago[0], db, "chicago", "artificial intelligence")
        self.parseHelper(self.links_chicago[1], db, "chicago", "deep learning")
        self.parseHelper(
            self.links_chicago[2], db, "chicago", "machine learning")
        self.parseHelper(self.links_chicago[3], db, "chicago", "data science")
        print("Scraping San Francisco...")
        self.parseHelper(
            self.links_sanFrancisco[0], db, "san francisco", "artificial intelligence")
        self.parseHelper(
            self.links_sanFrancisco[1], db, "san francisco", "deep learning")
        self.parseHelper(
            self.links_sanFrancisco[2], db, "san francisco", "machine learning")
        self.parseHelper(
            self.links_sanFrancisco[3], db, "san francisco", "data science")
        print("Scraping New York City...")
        self.parseHelper(
            self.links_newYorkCity[0], db, "new york", "artificial intelligence")
        self.parseHelper(
            self.links_newYorkCity[1], db, "new york", "deep learning")
        self.parseHelper(
            self.links_newYorkCity[2], db, "new york", "machine learning")
        self.parseHelper(
            self.links_newYorkCity[3], db, "new york", "data science")
        print("Scraping Seattle...")
        self.parseHelper(
            self.links_seattle[0], db, "seattle", "artificial intelligence")
        self.parseHelper(self.links_seattle[1], db, "seattle", "deep learning")
        self.parseHelper(
            self.links_seattle[2], db, "seattle", "machine learning")
        self.parseHelper(self.links_seattle[3], db, "seattle", "data science")
        print("Scraping Houston...")
        self.parseHelper(
            self.links_houston[0], db, "houston", "artificial intelligence")
        self.parseHelper(self.links_houston[1], db, "houston", "deep learning")
        self.parseHelper(
            self.links_houston[2], db, "houston", "machine learning")
        self.parseHelper(self.links_houston[3], db, "houston", "data science")
        print("Scraping Finished!")


countOfJobs = 0
scraper = GlassdoorScraper()
scraper.parse()
