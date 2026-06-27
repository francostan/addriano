import { Player } from './components/Player';
import { Chrome } from './components/Chrome';
import { Hero } from './components/Hero';
import { Release } from './components/Release';
import { TracksBlock } from './components/TracksBlock';
import { SetsBlock } from './components/SetsBlock';
import { LivesBlock } from './components/LivesBlock';
import { DatesBlock } from './components/DatesBlock';

export default function App() {
  return (
    <Player>
      <Chrome />
      <main className="px-7 py-7 pb-[140px] md:pb-7 grid gap-6 max-w-[1400px] mx-auto">
        <Hero />
        <Release />
        <TracksBlock />
        <SetsBlock />
        <LivesBlock />
        <DatesBlock />
      </main>
      <Player.Sticky />
    </Player>
  );
}
