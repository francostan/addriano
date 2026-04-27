import { Player } from './components/Player';
import { Chrome } from './components/Chrome';
import { Hero } from './components/Hero';
import { TracksBlock } from './components/TracksBlock';
import { SetsBlock } from './components/SetsBlock';
import { LivesBlock } from './components/LivesBlock';
import { BonusGrid } from './components/BonusGrid';

export default function App() {
  return (
    <Player>
      <Chrome />
      <main className="px-7 py-7 grid gap-6 max-w-[1400px] mx-auto">
        <Hero />
        <TracksBlock />
        <SetsBlock />
        <LivesBlock />
        <BonusGrid />
      </main>
      <Player.Sticky />
    </Player>
  );
}
