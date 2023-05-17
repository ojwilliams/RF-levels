import pandas as pd
import numpy as np
import xml.etree.cElementTree as et


tree=et.parse('data.xml')
root=tree.getroot()

name = []
value = []

for name in root.iter('name'):
    print (name.text)
    print ("Name =")
    name.append(name.text)
