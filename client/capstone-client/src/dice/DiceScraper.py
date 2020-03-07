import requests
import re
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

## URLs for queries
queries =   [
            "https://www.dice.com/jobs?q=artificial%20intelligence&location=Chicago,%20IL,%20USA&latitude=41.8781136&longitude=-87.6297982&countryCode=US&locationPrecision=City&adminDistrictCode=IL&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=deep%20learning&location=Chicago,%20IL,%20USA&latitude=41.8781136&longitude=-87.6297982&countryCode=US&locationPrecision=City&adminDistrictCode=IL&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=machine%20learning&location=Chicago,%20IL,%20USA&latitude=41.8781136&longitude=-87.6297982&countryCode=US&locationPrecision=City&adminDistrictCode=IL&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=data%20science&location=Chicago,%20IL,%20USA&latitude=41.8781136&longitude=-87.6297982&countryCode=US&locationPrecision=City&adminDistrictCode=IL&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=artificial%20intelligence&location=San%20Francisco,%20CA,%20USA&latitude=37.7749295&longitude=-122.4194155&countryCode=US&locationPrecision=City&adminDistrictCode=CA&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=deep%20learning&location=San%20Francisco,%20CA,%20USA&latitude=37.7749295&longitude=-122.4194155&countryCode=US&locationPrecision=City&adminDistrictCode=CA&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=machine%20learning&location=San%20Francisco,%20CA,%20USA&latitude=37.7749295&longitude=-122.4194155&countryCode=US&locationPrecision=City&adminDistrictCode=CA&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=data%20science&location=San%20Francisco,%20CA,%20USA&latitude=37.7749295&longitude=-122.4194155&countryCode=US&locationPrecision=City&adminDistrictCode=CA&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=artificial%20intelligence&location=New%20York,%20NY,%20USA&latitude=40.7127753&longitude=-74.0059728&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=deep%20learning&location=New%20York,%20NY,%20USA&latitude=40.7127753&longitude=-74.0059728&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=machine%20learning&location=New%20York,%20NY,%20USA&latitude=40.7127753&longitude=-74.0059728&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=data%20science&location=New%20York,%20NY,%20USA&latitude=40.7127753&longitude=-74.0059728&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=artificial%20intelligence&location=Seattle,%20WA,%20USA&latitude=47.6062095&longitude=-122.3320708&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=deep%20learning&location=Seattle,%20WA,%20USA&latitude=47.6062095&longitude=-122.3320708&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=machine%20learning&location=Seattle,%20WA,%20USA&latitude=47.6062095&longitude=-122.3320708&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=data%20science&location=Seattle,%20WA,%20USA&latitude=47.6062095&longitude=-122.3320708&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=artificial%20intelligence&location=Houston,%20TX,%20USA&latitude=29.7604267&longitude=-95.3698028&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=deep%20learning&location=Houston,%20TX,%20USA&latitude=29.7604267&longitude=-95.3698028&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=machine%20learning&location=Houston,%20TX,%20USA&latitude=29.7604267&longitude=-95.3698028&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en",
            "https://www.dice.com/jobs?q=data%20science&location=Houston,%20TX,%20USA&latitude=29.7604267&longitude=-95.3698028&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi&page=1&pageSize=20&language=en"
            ]
cities = ['chicago', 'san francisco', 'new york', 'seattle', 'houston']

targetSkills = ['python','r', 'sql', 'hadoop', 'spark', 'java', 'sas', 'tableau',
            'hive', 'scala', 'aws', 'c++', 'matlab', 'tensorflow', 'c', 'excel',
            'nosql', 'linux', 'azure', 'sclkit-learn', 'spss', 'pandas',
            'javascript', 'perl', 'c#', 'numpy', 'keras', 'git', 'docker',
            'mysql', 'hbase', 'mongodb', 'cassandra', 'pytorch', 'd3', 'caffe',
            'data science', 'deep learning', 'machine learning',
            'artificial intelligence']

avg = {
        'chicago': '66580',
        'san francisco': '103913',
        'new york': '79096',
        'seattle': '85000',
        'houston': '61013'
        }

domains = ['artificial intelligence', 'deep learning', 'machine learning', 'data science']


class DiceScraper():

    domain = ''
    cred = credentials.Certificate('seniorcapstone-46b64-firebase-adminsdk-9tth5-1baa5fae82.json')
    fb = firebase_admin.initialize_app(cred)
    fs = firebase_admin.firestore.client(fb)
    count = 0

    def __init__(self):
        '''the constructor'''
        
        print("starting driver")
        start = datetime.now()
        print("start time: " + str(start.strftime("%d-%m-%Y %H:%M:%S")))
        self.driver = webdriver.Chrome()
        i = 0
        for q in queries:
            self.domain = domains[i%4]
            self.findJobs(q)
            i += 1
        end = datetime.now()
        print("end time: " + str(end.strftime("%d-%m-%Y %H:%M:%S")))
        self.kill()
        time = end - start
        print("time elapsed: " + str(time))
        print("done")


    def fsPush(self, data):
        '''push scraped data to Firestore'''
        
        docId = str(now) + ' Dice{0:0>4}'.format(self.count)
        doc = self.fs.document('ScrapedJobs/' + docId)
        doc.create(data)

    def scrape(self, link):
        '''pass this a link to scrape a job page'''
        
        page = requests.get(link)
        pg = BeautifulSoup(page.content, 'html.parser')

        title = ""
        loc = ''
        sal = ''
        skills = []

        try:
            rem = pg.find('h2', class_ = 'h1 jobs-page-header-h1').text
            if ( 'Sorry! That job has been removed.' in rem ):
                return
        except:
            pass
        
        if ( pg.find('h1', class_ = 'jobTitle') != None ):
            title = pg.find('h1', class_ = 'jobTitle').text.strip()
            
        if ( pg.find('li', class_ = 'location' ) != None):
            loc = pg.find('li', class_ = 'location').text.strip().lower()
            if loc[-2:] == 'il':
                loc = 'chicago'
            elif loc[-2:] == 'ca':
                loc = 'san francisco'
            elif loc[-2:] == 'ny':
                loc = 'new york'
            elif loc[-2:] == 'wa':
                loc = 'seattle'
            elif loc[-2:] == 'tx':
                loc = 'houston'
##            cf = False
##            for c in cities:
##                if (c in loc):
##                    cf = True
##                    loc = c
##                    break
##            if (cf == False):
##                return

        try:
            s = pg.find('span', class_ = 'icon-bank-note icons')
            s = s.findParent()
            s = s.findNextSibling()
            if ( s != None ):
                sal = s.text.strip()
                try:
                    r = re.findall('\$[\d{0,9)]+[,[\d{0,9}]+]*',sal)
                    sal = int(r[0].strip('$').replace(',', ''))
                    if ( sal < 1000):
                        sal = str(sal * 2080)
                    sal = str(sal)
                except:
                    pass
            if (sal == ''):
                try:
                    desc = pg.find(id='jobdescSec').text
                    r = re.findall('\$[\d{0,9)]+[,[\d{0,9}]+]*', desc)
                    sal = int(r[0].strip('$').replace(',', ''))
                    if ( sal < 1000):
                        sal = str(sal * 2080)
                    sal = str(sal)
                except:
                    pass
        except:
            pass
            
        if ( pg.find('input', id = 'estSkillText') != None ):
            sk = pg.find('input', id = 'estSkillText')['value'].split(', ')
##            for s in sk:
##                skills.append(s.lower())
            for skill in sk:
                if ( skill.lower() in targetSkills ):
                    skills.append(skill.lower())
            if (len(skills) == 0):
                skills.append(self.domain)
            
        if not sal.isnumeric():
            sal = avg[loc]
        
        data = {"JobTitle": title,
                "JobDomain": self.domain,
                "JobLocation": loc,
                "JobSalary": sal,
                "JobSkills": skills,
                "JobWebsite": "https://www.dice.com/",
                "JobLink": link}
        self.count += 1
        ##print(self.domain)
        self.fsPush(data)

    def findJobs(self, link):
        '''Pass this a query to find job pages to scrape'''
        
        self.driver.implicitly_wait(5)
        self.driver.get(link)

        results = self.driver.find_element_by_id('totalJobCount').text
        results = int(results)

        pgs = int(results / 20) + 1
        
        xStart = '/html/body/dhi-js-dice-client/div/dhi-search-page-container/dhi-search-page/div/dhi-search-page-results/div/div[3]/js-search-display/div/div[2]/dhi-search-cards-widget/div/dhi-search-card['
        xEnd = ']/div/div[1]/div/div[2]/div[1]/h5/a'

        for x in range (0, pgs):
            ##print("page " + str(x + 1))
            for i in range (1, 21):
                try:
                    j = self.driver.find_element_by_xpath(xStart + str(i) + xEnd).get_attribute('href')
                    self.scrape(j)
                except:
                    break
            try:
                nxt = '/html/body/dhi-js-dice-client/div/dhi-search-page-container/dhi-search-page/div/dhi-search-page-results/div/div[3]/js-search-display/div/div[3]/div[1]/js-search-pagination-container/pagination/ul/li[7]/a'
                nextButton = self.driver.find_element_by_xpath(nxt)
                nextButton.click()
            except:
                break
            

    def kill(self):
        self.driver.close()

ds = DiceScraper()

