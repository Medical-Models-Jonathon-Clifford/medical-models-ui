import { render, screen } from '@testing-library/react';
import { ResourceLineChart } from './ResourceLineChart';
import { TotalResourceMetrics } from '@mm/types';
import { LineChart } from './LineChart';
import { borderColourChart, colorBackgroundChart } from '@mm/tokens';

jest.mock('./LineChart', () => ({
  LineChart: jest.fn(() => null),
}));

describe('ResourceLineChart', () => {
  const mockMetrics: TotalResourceMetrics = {
    total: 150,
    dailyCounts: [
      { date: '2025-01-01', newResources: 50, runningTotal: 50 },
      { date: '2025-01-02', newResources: 50, runningTotal: 100 },
      { date: '2025-01-03', newResources: 50, runningTotal: 150 },
    ],
  };

  const defaultProps = {
    title: 'Test Resources',
    label: 'Test Label',
    metrics: mockMetrics,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and total count', () => {
    render(<ResourceLineChart {...defaultProps} />);

    expect(screen.getByText('Test Resources:')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('renders chart with correct data transformation', () => {
    render(<ResourceLineChart {...defaultProps} />);

    const expectedChartData = {
      datasets: [
        {
          label: 'Test Label',
          data: [
            { x: '2025-01-01', y: 50 },
            { x: '2025-01-02', y: 100 },
            { x: '2025-01-03', y: 150 },
          ],
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(LineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });

  it('handles undefined metrics', () => {
    render(
      <ResourceLineChart
        {...defaultProps}
        metrics={undefined}
      />
    );

    const expectedChartData = {
      datasets: [
        {
          label: 'Test Label',
          data: undefined,
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(LineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });

  it('passes line options to LineChart', () => {
    render(<ResourceLineChart {...defaultProps} />);

    expect(LineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.any(Object), // You might want to test specific options if they're important
      }),
      expect.any(Object)
    );
  });

  it('handles empty dailyCounts array', () => {
    const emptyMetrics: TotalResourceMetrics = {
      total: 0,
      dailyCounts: [],
    };

    render(
      <ResourceLineChart
        {...defaultProps}
        metrics={emptyMetrics}
      />
    );

    const expectedChartData = {
      datasets: [
        {
          label: 'Test Label',
          data: [],
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(LineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });
});
