from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time
import matplotlib.pyplot as plt
titles = ['MER 1', 'MER 2', 'MER 3', 'MER 4']


RX1 = 'http://10.0.101.109/data.xml'
RX2 = 'http://10.0.101.110/data.xml'
RX3 = 'http://10.0.101.111/data.xml'
RX4 = 'http://10.0.101.112/data.xml'

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

#RX1 functions
    def get_RX1():
        with urlopen(RX1) as a:
        tree = ET.parse(a)
        rootrx1 = tree.getroot()
    
        for page in rootrx1.findall('parameter'):
            if page.find('name').text == 'DB_L2174_FREQ1':
                RX1_Frequency = page.find('value').text
                return global RX1_Frequendcy
            
            if page.find('name').text == 'DB_DEMOD_MER_1':
                RX1_MER_1 = page.find('value').text
                return global RX1_MER_1

            if page.find('name').text == 'DB_DEMOD_MER_2':
                RX1_MER_2 = page.find('value').text
                return global RX1_MER_2

            if page.find('name').text == 'DB_DEMOD_MER_3':
                RX1_MER_3 = page.find('value').text
                return global RX1_MER_3

            if page.find('name').text == 'DB_DEMOD_MER_4':
                RX1_MER_4 = page.find('value').text
                return global RX1_MER_4

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

rx1levels = [int(float(RX1_MER_1())), int(float(RX1_MER_2())),int(float(RX1_MER_3())),int(float(RX1_MER_4()))]

    
while True:
    print(RX1_frequency(), RX1_frequency(), RX1_MER_1(), RX1_MER_2(), RX1_MER_3(), RX1_MER_4())
    print(RX2_frequency(), RX2_frequency(), RX2_MER_1(), RX2_MER_2(), RX2_MER_3(), RX2_MER_4())
    print(RX3_frequency(), RX3_frequency(), RX3_MER_1(), RX3_MER_2(), RX3_MER_3(), RX3_MER_4())
    print(RX4_frequency(), RX4_frequency(), RX4_MER_1(), RX4_MER_2(), RX4_MER_3(), RX4_MER_4())

