import { render, screen } from '@testing-library/react';
import { DocItemButton } from './DocItemButton';

describe('DocItemButton', () => {
  const defaultProps = {
    isSelected: () => false,
    paddingLeft: '16px',
    href: '/test-link',
    children: 'Test Button',
  };

  it('renders with children content', () => {
    render(<DocItemButton {...defaultProps} />);

    const button = screen.getByRole('link', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });

  it('applies correct styles when selected', () => {
    render(
      <DocItemButton
        {...defaultProps}
        isSelected={() => true}
      />
    );

    const button = screen.getByRole('link', { name: 'Test Button' });
    expect(button).toHaveStyle({
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
    });
  });

  it('applies correct styles when not selected', () => {
    render(
      <DocItemButton
        {...defaultProps}
        isSelected={() => false}
      />
    );

    const button = screen.getByRole('link', { name: 'Test Button' });
    expect(button).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('applies custom padding left', () => {
    const customPadding = '32px';
    render(
      <DocItemButton
        {...defaultProps}
        paddingLeft={customPadding}
      />
    );

    const button = screen.getByRole('link', { name: 'Test Button' });
    expect(button).toHaveStyle({
      paddingLeft: customPadding,
    });
  });

  it('sets correct href attribute', () => {
    const testHref = '/test-path';
    render(
      <DocItemButton
        {...defaultProps}
        href={testHref}
      />
    );

    const button = screen.getByRole('link', { name: 'Test Button' });
    expect(button).toHaveAttribute('href', testHref);
  });

  it('renders with complex children content', () => {
    const complexChildren = (
      <>
        <span>Icon</span>
        <span>Label</span>
      </>
    );

    render(
      <DocItemButton {...defaultProps}>
        {complexChildren}
      </DocItemButton>
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});
