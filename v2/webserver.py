import xml.etree.ElementTree as ET
import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Function to parse XML and extract parameter values
def parse_xml(xml_content):
    root = ET.fromstring(xml_content)
    parameter_values = {}
    
    for parameter in root.iter('parameter'):
        param_name = parameter.find('name').text
        value_element = parameter.find('value')
        param_value = value_element.text.strip() if value_element is not None else None
        parameter_values[param_name] = param_value
    
    return parameter_values
# Route for the XML data
@app.route('/')
def xml_data():
    xml_url = 'http://10.0.101.112/data.xml'
    xml_content = requests.get(xml_url).text
    parameter_values = parse_xml(xml_content)
    
    return jsonify(parameter_values)

# Route for the HTML page
@app.route('/graph')
def graph():
    return render_template('graph.html')

if __name__ == '__main__':
    app.run()
