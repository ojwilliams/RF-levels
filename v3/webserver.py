#!/usr/bin/env python3
''' Generates graphs displaying live MER data from Vislink RF receivers.
    Requests Vislink's data.xml file from the receiver, parses the data, and processes it.
    You will need to check the data schema if you wish to use this code with a different receiver.
    

Author:
    Oscar Williams - 2023
'''

from urllib.request import urlopen
import xml.etree.ElementTree as ET
from flask import Flask, render_template, jsonify
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

RX4_url = 'http://10.0.101.112/data.xml'
frequency_rx4 = None
mer_1_rx4 = None
mer_2_rx4 = None
mer_3_rx4 = None
mer_4_rx4 = None

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


def retrieve_data():
    global frequency_rx4, mer_1_rx4, mer_2_rx4, mer_3_rx4, mer_4_rx4

    with urlopen(RX4_url) as d:
        tree = ET.parse(d)
        rootrx4 = tree.getroot()

    frequency_rx4 = frequency(rootrx4)
    mer_1_rx4 = MER_1(rootrx4)
    mer_2_rx4 = MER_2(rootrx4)
    mer_3_rx4 = MER_3(rootrx4)
    mer_4_rx4 = MER_4(rootrx4)

    # Print the values
    print("Frequency: ", frequency_rx4)
    print("MER 1: ", mer_1_rx4)
    print("MER 2: ", mer_2_rx4)
    print("MER 3: ", mer_3_rx4)
    print("MER 4: ", mer_4_rx4)



@app.route('/')
def index():
    # Retrieve the data
    retrieve_data()

    # Create a dictionary with the data
    data = {
        'frequency_rx4': frequency_rx4,
        'mer_1_rx4': mer_1_rx4,
        'mer_2_rx4': mer_2_rx4,
        'mer_3_rx4': mer_3_rx4,
        'mer_4_rx4': mer_4_rx4
    }

    # Render the template with the data
    return render_template('index.html', data=data)


@app.route('/data')
def get_data():
    data = {
        'frequency_rx4': frequency_rx4,
        'mer_1_rx4': mer_1_rx4,
        'mer_2_rx4': mer_2_rx4,
        'mer_3_rx4': mer_3_rx4,
        'mer_4_rx4': mer_4_rx4
    }
    return jsonify(data)


if __name__ == '__main__':
    # Create and configure the scheduler
    scheduler = BackgroundScheduler()
    scheduler.add_job(retrieve_data, 'interval', seconds=150, max_instances=1)
    scheduler.start()

    app.run()
