from urllib.request import urlopen
import xml.etree.ElementTree as ET
import time

RX1 = 'http://10.0.101.109/data.xml'
RX2 = 'http://10.0.101.110/data.xml'
RX3 = 'http://10.0.101.111/data.xml'
RX4 = 'http://10.0.101.112/data.xml'

with urlopen(RX4) as a:
    tree = ET.parse(a)
    rootrx1 = tree.getroot()



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
    
while True:
    print(RX1_frequency(), RX1_MER_1(), RX1_MER_2(), RX1_MER_3(), RX1_MER_4())
