from urllib.request import urlopen, HTTPError
import xml.etree.ElementTree as ET
from flask import Flask, render_template, jsonify, request, redirect, url_for
from apscheduler.schedulers.background import BackgroundScheduler
import subprocess
import json

app = Flask(__name__)

receivers = {
    "RX1": {"url": "http://10.0.101.109/data.xml", "data": {}},
    "RX2": {"url": "http://10.0.101.110/data.xml", "data": {}},
    "RX3": {"url": "http://10.0.101.111/data.xml", "data": {}},
    "RX4": {"url": "http://10.0.101.112/data.xml", "data": {}}
}
def save_to_file():
    with open('receiver_settings.json', 'w') as f:
        json.dump(receivers, f)

def load_from_file():
    try:
        with open('receiver_settings.json', 'r') as f:
            data = json.load(f)
            for key in receivers:
                receivers[key]['url'] = data.get(key, {}).get('url', receivers[key]['url'])
    except FileNotFoundError:
        pass  # If the file doesn't exist yet, just use the default URLs
    except json.JSONDecodeError:
        print("Error: receiver_settings.json contains invalid JSON. Please check or delete the file.")


# Load the URLs from the file at the start of the application
load_from_file()


def retrieve_data_for_all_receivers():
    for key in receivers.keys():
        retrieve_data(key)

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

def is_receiver_online(url):
    # Extract IP address from the URL
    ip_address = url.split('/')[2].split(':')[0]
    param = '-n' if subprocess.sys.platform.lower() == 'win32' else '-c'
    command = ['ping', param, '1', ip_address]
    return subprocess.call(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE) == 0

def retrieve_data(receiver_key):
    try:
        if not is_receiver_online(receivers[receiver_key]["url"]):
            print(f"Vislink receiver {receiver_key} is offline!")
            return
        
        with urlopen(receivers[receiver_key]["url"]) as d:
            tree = ET.parse(d)
            root = tree.getroot()

        data = {
            "frequency": frequency(root),
            "mer_1": MER_1(root),
            "mer_2": MER_2(root),
            "mer_3": MER_3(root),
            "mer_4": MER_4(root)
        }

        receivers[receiver_key]["data"] = data

        for key, value in data.items():
            if key == "frequency":
                print(f"{receiver_key} {key.capitalize()}: {value}")
            else:
                print(f"{key.capitalize()}: {value}")

    except HTTPError as e:
        print(f"Error accessing URL for {receiver_key}. URL: {receivers[receiver_key]['url']}. Error: {e}")

@app.route('/')
def index():
    return render_template('index.html', receivers=receivers)

@app.route('/data')
def get_data():
    all_data = {}
    for key in receivers.keys():
        retrieve_data(key)
        all_data[key] = receivers[key]["data"]
    return jsonify(all_data)

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        for key in receivers:
            # Check if the checkbox for this receiver is checked
            if request.form.get(f'{key}_update') == 'yes':
                ip_ending = request.form.get(f'{key}_url')
                receivers[key]['url'] = f'http://10.0.101.{ip_ending}/data.xml'
        save_to_file()  # Remember to save changes to file
        return redirect(url_for('settings'))

    return render_template('settings.html', receivers=receivers)



if __name__ == '__main__':
    
    scheduler = BackgroundScheduler()


    scheduler.add_job(retrieve_data_for_all_receivers, 'interval', seconds=5)

    scheduler.start()
    
    app.run(debug=True, port=80, host='127.0.0.1')
