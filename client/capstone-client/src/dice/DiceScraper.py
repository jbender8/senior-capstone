import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
queries =   [
            "https://www.dice.com/jobs?q=software&location=Chicago,%20IL,%20USA&latitude=41.8781136&longitude=-87.6297982&countryCode=US&locationPrecision=City&adminDistrictCode=IL&radius=30&radiusUnit=mi&page=1&pageSize=20&language=en"
            ]
cities = ['chicago', 'san francisco', 'new york city', 'seattle', 'houston']

targetSkills = ['python','r', 'sql', 'hadoop', 'spark', 'java', 'sas', 'tableau',
          'hive', 'scala', 'aws', 'c++', 'matlab', 'tensorflow', 'c', 'excel',
          'nosql', 'linux', 'azure', 'sclkit-learn', 'spss', 'pandas',
          'javascript', 'perl', 'c#', 'numpy', 'keras', 'git', 'docker',
          'mysql', 'hbase', 'mongodb', 'cassandra', 'pytorch', 'd3', 'caffe']

## Jobs - artificial intelligence, deep learning, machine learning,
## data science

class DiceScraper():

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
        for q in queries:
            self.findJobs(q)
        end = datetime.now()
        print("end time: " + str(end.strftime("%d-%m-%Y %H:%M:%S")))
        self.kill()
        time = end - start
        print("time elapsed: " + str(time))
        print("done")


    def fsPush(self, data):
        '''push scraped data to Firestore'''
        
        docId = str(now) + ' Dice{0:0>4}'.format(self.count)
        doc = self.fs.document('diceTest/' + docId)
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
            loc = pg.find('li', class_ = 'location').text.strip()

        try:
            s = pg.find('span', class_ = 'icon-bank-note icons')
            s = s.findParent()
            s = s.findNextSibling()
            if ( s != None ):
                sal = s.text.strip()
        except:
            return
            
        if ( pg.find('input', id = 'estSkillText') != None ):
            skills = pg.find('input', id = 'estSkillText')['value'].split(', ')
            for i in range(0, len(skills)):
                skills[i] = skills[i].strip()

        if sal == "":
            sal = "$placeholder"
            ## https://www.guru99.com/python-regular-expressions-complete-tutorial.html
        
        data = {"JobTitle": title,
                "JobLocation": loc,
                "JobSalary": sal,
                "JobSkills": skills,
                "JobWebsite": "https://www.dice.com/",
                "JobLink": link}
        self.count += 1
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
            print("page " + str(x + 1))
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

