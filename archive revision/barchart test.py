import matplotlib.pyplot as plt
import vone

MER1 = vone.MER_1

# x-coordinates of left sides of bars
left = [1, 2, 3, 4]

# heights of bars
height = [MER1, 24, 36, 40]

# labels for bars
tick_label = ['MER1', 'MER 2', 'MER 3', 'MER 4']

# plotting a bar chart
plt.bar(left, height, tick_label = tick_label,
		width = 0.8, color = ['red', 'green'])

# naming the x-axis
plt.xlabel('x - axis')
# naming the y-axis
plt.ylabel('y - axis')
# plot title
plt.title('My bar chart!')

# function to show the plot
plt.show()
