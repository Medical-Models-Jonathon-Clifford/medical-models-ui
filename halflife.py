import numpy as np
import matplotlib.pyplot as plt

# Constants
initial_dose = 10  # Initial dose in mg
half_life = 36  # Half-life in hours
elimination_constant = np.log(2) / half_life

# Time points (0 to 5 half-lives, enough to see significant decay)
time_points = np.linspace(0, 36 * 5, 500)

# Concentration calculation
concentrations = initial_dose * np.exp(-elimination_constant * time_points)

# Plotting
plt.figure(figsize=(10, 6))
plt.plot(time_points, concentrations, label='Diazepam Concentration')
plt.title('Diazepam Concentration Over Time')
plt.xlabel('Time (hours)')
plt.ylabel('Concentration (mg)')
plt.grid(True)
plt.axhline(5.0, color='r', linestyle='--', label='50% concentration threshold')
plt.legend()

# Show the plot
plt.show()
