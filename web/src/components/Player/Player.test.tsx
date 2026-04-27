import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Player } from './index';
import { usePlayer } from './context';
import type { Track } from '../../types';

const sample: Track = { id: 't1', title: 'TEST', year: 2026, bpm: 130, musicalKey: 'A', duration: '04:00', embedUrl: '' };

function Probe() {
  const p = usePlayer();
  return (
    <div>
      <span data-testid="title">{p.current?.title ?? 'none'}</span>
      <span data-testid="state">{p.isPlaying ? 'playing' : 'paused'}</span>
      <button onClick={() => p.play(sample)}>play</button>
      <button onClick={() => p.pause()}>pause</button>
      <button onClick={() => p.toggle()}>toggle</button>
    </div>
  );
}

describe('Player', () => {
  it('starts empty', () => {
    render(<Player><Probe /></Player>);
    expect(screen.getByTestId('title').textContent).toBe('none');
    expect(screen.getByTestId('state').textContent).toBe('paused');
  });

  it('play sets current and playing', () => {
    render(<Player><Probe /></Player>);
    act(() => { screen.getByText('play').click(); });
    expect(screen.getByTestId('title').textContent).toBe('TEST');
    expect(screen.getByTestId('state').textContent).toBe('playing');
  });

  it('pause flips state', () => {
    render(<Player><Probe /></Player>);
    act(() => { screen.getByText('play').click(); });
    act(() => { screen.getByText('pause').click(); });
    expect(screen.getByTestId('state').textContent).toBe('paused');
  });

  it('toggle flips between play/pause when current set', () => {
    render(<Player><Probe /></Player>);
    act(() => { screen.getByText('play').click(); });
    act(() => { screen.getByText('toggle').click(); });
    expect(screen.getByTestId('state').textContent).toBe('paused');
    act(() => { screen.getByText('toggle').click(); });
    expect(screen.getByTestId('state').textContent).toBe('playing');
  });
});
