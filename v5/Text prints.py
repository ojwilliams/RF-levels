import time
import config.py as conf

while True:
    time.sleep(10)
    with urlopen(RX1.conf) as a:
        tree = ET.parse(a)
        rootrx1 = tree.getroot()

    with urlopen(RX2.conf) as b:
        tree = ET.parse(b)
        rootrx2 = tree.getroot()

    with urlopen(RX3.conf) as c:
        tree = ET.parse(c)
        rootrx3 = tree.getroot()

    with urlopen(RX4.conf) as d:
        tree = ET.parse(d)
        rootrx4 = tree.getroot()

    print('RX1 =', frequency(rootrx1),"MER: ", MER_1(rootrx1), MER_2(rootrx1), MER_3(rootrx1), MER_4(rootrx1))
    print('RX2 =', frequency(rootrx2),"MER: ", MER_1(rootrx2), MER_2(rootrx2), MER_3(rootrx2), MER_4(rootrx2))
    print('RX3 =', frequency(rootrx3),"MER: ", MER_1(rootrx3), MER_2(rootrx3), MER_3(rootrx3), MER_4(rootrx3))
    print('RX4 =', frequency(rootrx4),"MER: ", MER_1(rootrx4), MER_2(rootrx4), MER_3(rootrx4), MER_4(rootrx4), "Triax Mode? =", triax(rootrx4))

