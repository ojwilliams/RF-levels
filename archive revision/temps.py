import requests
import json
r= requests.get("http://10.0.101.108/getData.json?src=RA&_=1681651193227")



#print("Received " + str(r.status_code) + " " + str(r.text))

y = json.loads(r.json)

print(y)
