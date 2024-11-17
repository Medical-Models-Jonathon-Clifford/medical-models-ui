import matplotlib

matplotlib.use('TkAgg')  # TkAgg is a suitable backend for interactive plots

import numpy as np
import matplotlib.pyplot as plt

# Define the parameters for the 4-Cole-Cole expression for a hypothetical body tissue
epsilon_inf = 4.0  # High-frequency permittivity
deltas = [56.0, 5200, 0.0, 0.0]  # Changes in permittivity for each relaxation process
taus = [8.377, 132.629, 159.155, 15.915]  # Relaxation times for each process
alphas = [0.1, 0.1, 0.2, 0.0]  # Broadening parameters for each process
sig = 0.700
epsilon_0 = 8.854e-12  # Vacuum permittivity in F/m

# Define the frequency range (in Hz)
frequencies = np.logspace(1, 11, 50)  # From 10 Hz to 10 MHz
angular_frequencies = 2 * np.pi * frequencies


# Compute the complex permittivity
def cole_cole_expression(omega, epsilon_inf, deltas, taus, alphas):
  epsilon = epsilon_inf
  for delta, tau, alpha in zip(deltas, taus, alphas):
    epsilon += delta / (1 + (1j * omega * tau) ** (1 - alpha))
  epsilon += sig / (1j * omega * epsilon_0)
  return epsilon


# Calculate permittivity over the frequency range
permittivity = np.array(
  [cole_cole_expression(omega, epsilon_inf, deltas, taus, alphas) for omega in angular_frequencies])

# Separate the real and imaginary parts
epsilon_real = permittivity.real
epsilon_imaginary = permittivity.imag

# Calculate conductivity from the imaginary part of permittivity
conductivity = angular_frequencies * epsilon_0 * epsilon_imaginary

# Plotting the real part of permittivity and conductivity
plt.figure(figsize=(14, 6))

# Plot real part of permittivity
plt.subplot(1, 2, 1)
plt.plot(frequencies, epsilon_real)
plt.xscale('log')
plt.xlabel('Frequency (Hz)')
plt.ylabel('Real Part of Permittivity (ε\')')
plt.title('Real Part of Permittivity vs Frequency')
plt.grid(True)

# Plot conductivity derived from imaginary part of permittivity
plt.subplot(1, 2, 2)
plt.plot(frequencies, conductivity)
plt.xscale('log')
plt.xlabel('Frequency (Hz)')
plt.ylabel('Conductivity (S/m)')
plt.title('Conductivity vs Frequency')
plt.grid(True)

plt.tight_layout()
plt.show()
