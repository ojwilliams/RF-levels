#!/usr/bin/env python3
''' Generates graphs displaying live MER data from vislink RF receivers.
    Requests Vislink's data.xml file from the receiver, parse's the data and processes it.
    You will need to check the data schema if you wish to use this code with a different receiver.
    

Author:
    Oscar Williams - 2023
'''

from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time
import numpy as np
from matplotlib import animation as animation, pyplot as plt, cm


#RX1_url = 'http://10.0.101.200/data.xml'
#RX2_url = 'http://10.0.101.84/data.xml'
#RX3_url = 'http://10.0.101.7/data.xml'
RX4_url = 'http://10.0.101.112/data.xml'


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
    with urlopen(RX4_url) as d:
        tree = ET.parse(d)
        rootrx4 = tree.getroot()

    #RX1 = rootrx1
    #RX2 = rootrx2
    #RX3 = rootrx3
    RX4 = rootrx4
  
    
   # print('RX1 =', frequency(rootrx1),"MER: ", MER_1(rootrx1), MER_2(rootrx1), MER_3(rootrx1), MER_4(rootrx1), POWER_1(RX1), POWER_2(RX1))

    # Create/update bar chart
    x = ['MER 1.4','MER 2.4','MER 3.4','MER 4.4']
    y = [MER_1(RX4),MER_2(RX4),MER_3(RX4),MER_4(RX4)]

    plt.bar(x, y)

    plt.ylim(top=30,bottom=0)  # Set y-axis upper limit
    plt.xlabel(frequency(RX4))
    plt.ylabel('Value')
    plt.title('Title TBC')

    bars = plt.bar(x, y)


    # Color each bar based on its value
    #for i in range(len(y)):
       # bars[i].set_color(colormap(i / len(y)))

    
    plt.pause(5)  # Pause for 1 second

    # Clear current plot
    plt.clf()

    # Delay before next execution
    #time.sleep(10)  # Delay for 1 hour
