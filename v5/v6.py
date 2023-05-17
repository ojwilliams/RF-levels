from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time
import matplotlib.pyplot as plt

import numpy as np
from matplotlib import animation as animation, pyplot as plt, cm

titles = ['MER 1', 'MER 2', 'MER 3', 'MER 4']


RX1 = 'http://10.0.101.86/data.xml'
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

while True:
    time.sleep(1)
    with urlopen(RX1) as a:
        tree = ET.parse(a)
        rootrx1 = tree.getroot()

    with urlopen(RX2) as b:
        tree = ET.parse(b)
        rootrx2 = tree.getroot()

    with urlopen(RX3) as c:
        tree = ET.parse(c)
        rootrx3 = tree.getroot()

    with urlopen(RX4) as d:
        tree = ET.parse(d)
        rootrx4 = tree.getroot()
    """
    print('RX1 =', frequency(rootrx1),"MER: ", MER_1(rootrx1), MER_2(rootrx1), MER_3(rootrx1), MER_4(rootrx1))
    print('RX2 =', frequency(rootrx2),"MER: ", MER_1(rootrx2), MER_2(rootrx2), MER_3(rootrx2), MER_4(rootrx2))
    print('RX3 =', frequency(rootrx3),"MER: ", MER_1(rootrx3), MER_2(rootrx3), MER_3(rootrx3), MER_4(rootrx3))
    print('RX4 =', frequency(rootrx4),"MER: ", MER_1(rootrx4), MER_2(rootrx4), MER_3(rootrx4), MER_4(rootrx4), "Triax Mode? =", triax(rootrx4))
    """

    plt.rcParams["figure.figsize"] = [7.50, 3.50]
    plt.rcParams["figure.autolayout"] = True

    fig = plt.figure()

    data = [MER_1(rootrx4), MER_2(rootrx4), MER_3(rootrx4), MER_4(rootrx4)]
    colors = ['red', 'yellow', 'blue', 'green',]
    bars = plt.bar(titles, data, facecolor='pink', alpha=0.75)

    def animate(frame):
       global bars
       index = np.random.randint(1, 7)
       bars[frame].set_height(index)
       #bars[frame].set_facecolor(colors[np.random.randint(0, len(colors))])

    ani = animation.FuncAnimation(fig, animate, frames= data )

    plt.show()
    plt.close()
