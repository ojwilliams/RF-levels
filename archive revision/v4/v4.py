from xml.etree import ElementTree as ET
import requests

#point to RF receivers data. Increase for more receivers

RX1 = "datarx1.xml"
RX2 = "datarx2.xml"
RX3 = "datarx3.xml"
RX4 = "datarx4.xml"

#parse xml data 
treerx1 = ET.parse(RX1)
rootrx1 = treerx1.getroot()

treerx2 = ET.parse(RX2)
rootrx2 = treerx2.getroot()

treerx3 = ET.parse(RX3)
rootrx3 = treerx3.getroot()

treerx4 = ET.parse(RX4)
rootrx4 = treerx4.getroot()

#RX1 functions
def RX1_frequency():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text

def RX1_MER_1():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return page.find('value').text

def RX1_MER_2():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return page.find('value').text

def RX1_MER_3():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return page.find('value').text

def RX1_MER_4():
    for page in rootrx1.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return page.find('value').text

#RX2 Functions

def RX2_frequency():
    for page in rootrx2.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text

def RX2_MER_1():
    for page in rootrx2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return page.find('value').text

def RX2_MER_2():
    for page in rootrx2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return page.find('value').text

def RX2_MER_3():
    for page in rootrx2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return page.find('value').text

def RX2_MER_4():
    for page in rootrx2.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return page.find('value').text

#RX3 Functions
def RX3_frequency():
    for page in rootrx3.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text

def RX3_MER_1():
    for page in rootrx3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return page.find('value').text

def RX3_MER_2():
    for page in rootrx3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return page.find('value').text

def RX3_MER_3():
    for page in rootrx3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return page.find('value').text

def RX3_MER_4():
    for page in rootrx3.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return page.find('value').text

#RX4 functions
def RX4_frequency():
    for page in rootrx4.findall('parameter'):
        if page.find('name').text == 'DB_L2174_FREQ1':
            return page.find('value').text

def RX4_MER_1():
    for page in rootrx4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_1':
            return page.find('value').text

def RX4_MER_2():
    for page in rootrx4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_2':
            return page.find('value').text

def RX4_MER_3():
    for page in rootrx4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_3':
            return page.find('value').text

def RX4_MER_4():
    for page in rootrx4.findall('parameter'):
        if page.find('name').text == 'DB_DEMOD_MER_4':
            return page.find('value').text


import matplotlib.pyplot as plt
titles = ['MER 1', 'MER 2', 'MER 3', 'MER 4']

rx1levels = [int(float(RX1_MER_1())), int(float(RX1_MER_2())),int(float(RX1_MER_3())),int(float(RX1_MER_4()))]
rx2levels = [int(float(RX2_MER_1())), int(float(RX2_MER_2())),int(float(RX2_MER_3())),int(float(RX2_MER_4()))]
rx3levels = [int(float(RX3_MER_1())), int(float(RX3_MER_2())),int(float(RX3_MER_3())),int(float(RX3_MER_4()))]
rx4levels = [int(float(RX4_MER_1())), int(float(RX4_MER_2())),int(float(RX4_MER_3())),int(float(RX4_MER_4()))]


#plot 1:
rx1levels = [int(float(RX1_MER_1())), int(float(RX1_MER_2())),int(float(RX1_MER_3())),int(float(RX1_MER_4()))]
plt.subplot(2, 2, 1)
plt.title('RX 1 = ' + RX1_frequency())
plt.ylabel("MER Readings (-DB)")
plt.ylim(0, 33)
plt.bar(titles,rx1levels)

#plot 2:

plt.subplot(2, 2, 2)
rx2levels = [int(float(RX2_MER_1())), int(float(RX2_MER_2())),int(float(RX2_MER_3())),int(float(RX2_MER_4()))]
plt.title('RX 2 = ' + RX2_frequency())
plt.ylabel("MER Readings (-DB)")
plt.ylim(0, 33)
plt.bar(titles,rx2levels)

#plot 3:

plt.subplot(2, 2, 3)
rx3levels = [int(float(RX3_MER_1())), int(float(RX3_MER_2())),int(float(RX3_MER_3())),int(float(RX3_MER_4()))]
plt.title('RX 3 = ' + RX3_frequency())
plt.ylabel("MER Readings (-DB)")
plt.ylim(0, 33)
plt.bar(titles,rx3levels)

#plot 4:

plt.subplot(2, 2, 4)
plt.title('RX 4 = ' + RX4_frequency())
plt.ylabel("MER Readings (-DB)")
plt.ylim(0, 33)
plt.bar(titles,rx4levels)

plt.show()

"""

plt.bar(titles,levels)
plt.title('RX 1 = ' + frequency())
plt.ylabel("MER Readings (-DB)")
plt.xlabel("Legs")
plt.ylim(0, 33)
plt.show()


"""



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
