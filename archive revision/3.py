import requests

x = requests.get('http://10.0.101.110/data.xml')

print(x.text)


import time
starttime = time.time()
while True:
    print("tick")
    time.sleep(5)
    print("tock")
    time.sleep(5)
    
