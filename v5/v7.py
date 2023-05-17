from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time
import numpy as np
from matplotlib import animation as animation, pyplot as plt, cm


RX1_url = 'http://10.0.101.200/data.xml'
RX2_url = 'http://10.0.101.84/data.xml'
RX3_url = 'http://10.0.101.7/data.xml'
RX4_url = 'http://10.0.101.85/data.xml'


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

while True:
    time.sleep(2)
    with urlopen(RX1_url) as a:
        tree = ET.parse(a)
        rootrx1 = tree.getroot()
        
    with urlopen(RX2_url) as b:
        tree = ET.parse(b)
        rootrx2 = tree.getroot()

    with urlopen(RX3_url) as c:
        tree = ET.parse(c)
        rootrx3 = tree.getroot()
    with urlopen(RX4_url) as d:
        tree = ET.parse(d)
        rootrx4 = tree.getroot()

    RX1 = rootrx1
    RX2 = rootrx2
    RX3 = rootrx3
    RX4 = rootrx4
  
    
   # print('RX1 =', frequency(rootrx1),"MER: ", MER_1(rootrx1), MER_2(rootrx1), MER_3(rootrx1), MER_4(rootrx1), POWER_1(RX1), POWER_2(RX1))

    # Create/update bar chart
    x = ['MER 1.1','MER 2.1','MER 3.1','MER 4.1','MER 1.2','MER 2.2','MER 3.2','MER 4.2','MER 1.3','MER 2.3','MER 3.3','MER 4.3','MER 1.4','MER 2.4','MER 3.4','MER 4.4']
    y = [MER_1(RX1),MER_2(RX1),MER_3(RX1),MER_4(RX1),MER_1(RX2),MER_2(RX2),MER_3(RX2),MER_4(RX2),MER_1(RX3),MER_2(RX3),MER_3(RX3),MER_4(RX3),MER_1(RX4),MER_2(RX4),MER_3(RX4),MER_4(RX4)]

    plt.bar(x, y)

    plt.ylim(top=30,bottom=0)  # Set y-axis upper limit
    plt.xlabel(frequency(RX1) + " " + frequency(RX2) + " " + frequency (RX3) + " " + frequency(RX4))
    plt.ylabel('Value')
    plt.title('Title TBC')
    plt.pause(5)  # Pause for 1 second

    # Clear current plot
    plt.clf()

    # Delay before next execution
    #time.sleep(10)  # Delay for 1 hour
