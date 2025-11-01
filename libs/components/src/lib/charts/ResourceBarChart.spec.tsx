import { render, screen } from '@testing-library/react';
import { ResourceBarChart } from './ResourceBarChart';
import { BarChart } from './BarChart';
import { borderColourChart, colorBackgroundChart } from '@mm/tokens';

jest.mock('./BarChart', () => ({
  BarChart: jest.fn(() => null),
}));

describe('ResourceBarChart', () => {
  const defaultProps = {
    title: 'Test Resources',
    chartTitle: 'Test Chart',
    label: 'Test Label',
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasetData: [10, 20, 30],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and total count', () => {
    render(<ResourceBarChart {...defaultProps} />);

    expect(screen.getByText('Test Resources:')).toBeInTheDocument();
    // First label is used as total
    expect(screen.getByText('Label 1')).toBeInTheDocument();
  });

  it('renders chart with correct data', () => {
    render(<ResourceBarChart {...defaultProps} />);

    const expectedChartData = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: 'Test Label',
          data: [10, 20, 30],
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });

  it('handles undefined labels and data', () => {
    render(
      <ResourceBarChart
        {...defaultProps}
        labels={undefined}
        datasetData={undefined}
      />
    );

    const expectedChartData = {
      labels: undefined,
      datasets: [
        {
          label: 'Test Label',
          data: undefined,
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });

  it('passes bar options with correct chart title to BarChart', () => {
    render(<ResourceBarChart {...defaultProps} />);

    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          plugins: expect.objectContaining({
            title: expect.objectContaining({
              text: 'Test Chart'
            })
          })
        })
      }),
      expect.any(Object)
    );
  });

  it('handles empty arrays', () => {
    render(
      <ResourceBarChart
        {...defaultProps}
        labels={[]}
        datasetData={[]}
      />
    );

    const expectedChartData = {
      labels: [],
      datasets: [
        {
          label: 'Test Label',
          data: [],
          borderColor: borderColourChart,
          backgroundColor: colorBackgroundChart,
        },
      ],
    };

    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedChartData,
      }),
      expect.any(Object)
    );
  });

  it('renders TotalCount with undefined when labels are empty', () => {
    render(
      <ResourceBarChart
        {...defaultProps}
        labels={[]}
      />
    );

    expect(screen.getByText('Test Resources:')).toBeInTheDocument();
    expect(screen.queryByText('Label 1')).not.toBeInTheDocument();
  });
});
