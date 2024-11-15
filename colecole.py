import matplotlib

matplotlib.use('TkAgg')  # TkAgg is a suitable backend for interactive plots

import numpy as np
import matplotlib.pyplot as plt

# Define the parameters for the 4-Cole-Cole expression
epsilon_inf = 4.0  # High-frequency permittivity
deltas = [56.0, 5200, 0.0, 0.0]  # Changes in permittivity for each relaxation process
taus = [8.377, 132.629, 159.155, 15.915]  # Relaxation times for each process
alphas = [0.1, 0.1, 0.2, 0.0]  # Broadening parameters for each process
sig = 0.250
epsilon0 = 8.854187817e-12



# Define the frequency range (in Hz)
frequencies = np.logspace(1, 11, 500)
angular_frequencies = 2 * np.pi * frequencies


# Compute the complex permittivity
def cole_cole_expression(omega, epsilon_inf, deltas, taus, alphas):
  epsilon = epsilon_inf
  for delta, tau, alpha in zip(deltas, taus, alphas):
    epsilon += delta / (1 + (1j * omega * tau) ** (1 - alpha))
  epsilon += sig / (1j * omega * epsilon0)
  return epsilon


# Calculate permittivity values over the frequency range
permittivity = np.array(
  [cole_cole_expression(omega, epsilon_inf, deltas, taus, alphas) for omega in angular_frequencies])

# Separate the real and imaginary parts
epsilon_real = permittivity.real
epsilon_imag = permittivity.imag

# Plotting the real and imaginary parts of permittivity
plt.figure(figsize=(14, 6))

# Plot real part of permittivity
plt.subplot(1, 2, 1)
plt.plot(frequencies, epsilon_real)
plt.xscale('log')
plt.xlabel('Frequency (Hz)')
plt.ylabel('Real Part of Permittivity (ε\')')
plt.title('Real Part of Permittivity vs Frequency')
plt.grid(True)

# Plot imaginary part of permittivity
plt.subplot(1, 2, 2)
plt.plot(frequencies, epsilon_imag)
plt.xscale('log')
plt.xlabel('Frequency (Hz)')
plt.ylabel('Imaginary Part of Permittivity (ε\'\')')
plt.title('Imaginary Part of Permittivity vs Frequency')
plt.grid(True)

plt.show()
