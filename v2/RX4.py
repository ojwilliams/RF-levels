import xml.etree.ElementTree as ET
import requests
import time
from flask import Flask, render_template

app = Flask(__name__)

# Function to parse XML and extract parameter values
def parse_xml(xml_content):
    root = ET.fromstring(xml_content)
    parameter_values = {}
    
    for parameter in root.iter('parameter'):
        param_id = parameter.attrib['id']
        if param_id in ['DB_L2174_FREQ1', 'DB_DEMOD_MER_1', 'DB_DEMOD_MER_2', 'DB_DEMOD_MER_3', 'DB_DEMOD_MER_4']:
            param_value = parameter.text
            parameter_values[param_id] = param_value
    
    return parameter_values

# Route for the graph page
@app.route('/')
def graph():
    xml_url = 'http://10.0.101.112/data.xml'
    xml_content = requests.get(xml_url).text
    parameter_values = parse_xml(xml_content)
    
    return render_template('graph.html', values=parameter_values)

if __name__ == '__main__':
    app.run()

