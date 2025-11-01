import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileIcon } from './ProfileIcon';

describe('ProfileIcon', () => {
  it('renders with default size and initials', () => {
    render(
      <ProfileIcon
        givenName="John"
        familyName="Smith"
      />
    );

    const avatar = screen.getByText('JS');
    expect(avatar).toBeInTheDocument();
    expect(avatar.closest('div')).toHaveStyle({
      width: '32px',
      height: '32px',
    });
  });

  it('renders with custom size', () => {
    render(
      <ProfileIcon
        givenName="John"
        familyName="Smith"
        size={48}
      />
    );

    const avatar = screen.getByText('JS').closest('div');
    expect(avatar).toHaveStyle({
      width: '48px',
      height: '48px',
    });
  });

  it('handles single-letter names', () => {
    render(
      <ProfileIcon
        givenName="J"
        familyName="S"
      />
    );

    const avatar = screen.getByText('JS');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with string size value', () => {
    render(
      <ProfileIcon
        givenName="John"
        familyName="Doe"
        size="64px"
      />
    );

    const avatar = screen.getByText('JD').closest('div');
    expect(avatar).toHaveStyle({
      width: '64px',
      height: '64px',
    });
  });

  it('applies correct background color from stringToColor', () => {
    render(
      <ProfileIcon
        givenName="John"
        familyName="Smith"
      />
    );

    const avatar = screen.getByText('JS').closest('div');
    expect(avatar).toHaveStyle({
      backgroundColor: '#ae5cae',
    });
  });
});
