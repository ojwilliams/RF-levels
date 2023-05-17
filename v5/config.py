from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time

RX1 = 'http://10.0.101.109/data.xml'
RX2 = 'http://10.0.101.110/data.xml'
RX3 = 'http://10.0.101.111/data.xml'
RX4 = 'http://10.0.101.112/data.xml'

def frequency(freq):
    for page in freq.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text
def MER_1(MER1):
    for page in MER1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return round(float(page.find('value').text))

def MER_2(MER2):
    for page in MER2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return round(float(page.find('value').text))

def MER_3(MER3):
    for page in MER3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return round(float(page.find('value').text))

def MER_4(MER4):
    for page in MER4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return round(float(page.find('value').text))

def POWER_1(POWERSTAT_1):
    for page in POWERSTAT_1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_LNB_PWR_1':
            return page.find('value').text
def POWER_2(POWERSTAT_2):
    for page in POWERSTAT_2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_LNB_PWR_2':
            return page.find('value').text
def POWER_3(POWERSTAT_3):
    for page in POWERSTAT_3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_LNB_PWR_3':
            return page.find('value').text
def POWER_4(POWERSTAT_4):
    for page in POWERSTAT_4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_LNB_PWR_4':
            return page.find('value').text

def triax(triaxSTAT_4):
    for page in triaxSTAT_4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_TRIAX_EN':
            return page.find('value').text

