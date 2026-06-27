import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Player } from './Player';
import { usePlayer } from './Player/context';
import { Release } from './Release';

function Probe() {
  const { current } = usePlayer();
  return <span data-testid="current">{current?.title ?? 'none'}</span>;
}

describe('Release band', () => {
  it('plays beheaded ritual when PLAY is clicked', () => {
    render(<Player><Release /><Probe /></Player>);
    expect(screen.getByTestId('current').textContent).toBe('none');
    act(() => { screen.getByRole('button').click(); });
    expect(screen.getByTestId('current').textContent).toBe('beheaded ritual');
  });
});
