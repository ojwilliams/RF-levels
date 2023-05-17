from xml.etree import ElementTree as ET
import requests

RX1 = "datarx1.xml"

RX2 = "datarx2.xml"
RX3 = "datarx3.xml"
RX4 = "datarx4.xml"



treerx1 = ET.parse(RX1)
rootrx1 = treerx1.getroot()

treerx2 = ET.parse(RX2)
rootrx2 = treerx2.getroot()

treerx3 = ET.parse(RX3)
rootrx3 = treerx3.getroot()

treerx4 = ET.parse(RX4)
rootrx4 = treerx4.getroot()

def requency():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text

def MER_1():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return page.find('value').text

def MER_2():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return page.find('value').text

def MER_3():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return page.find('value').text

def MER_4():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return page.find('value').text
  
print("Frequency = " + requency())
print("MER 1 = " + MER_1())
print("MER 2 = " + MER_2())
print("MER 3 = " + MER_3())
print("MER 4 = " + MER_4())












#variables

"""
DB_DEMOD_CURRENT_1
DB_DEMOD_CURRENT_2
DB_DEMOD_CURRENT_3
DB_DEMOD_CURRENT_4
DB_IP_ADDRESS
DB_STATUS_PIN_ALARM_LEVEL
DB_STATUS_PIN_MODE

DB_DECOD_IP4_LOCK    #1-4
DB_L2174_WEB_TEXT

DB_DEMOD_PWR_LEVEL_4 #1-4
DB_DEMOD_LNB_PWR_4 #1-4
"""
