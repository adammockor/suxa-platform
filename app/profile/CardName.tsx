'use client';
import Card from './Card';

export default function CardName({
  name,
  surename
}: {
  name?: string | null;
  surename?: string | null;
}) {
  return (
    <Card
      title="Meno a priezvisko"
      description="Aby ťa každý spoznal, tvoje meno a priezvisko budú dostupné všetkým členom komunity."
    >
      <div className="mt-4 mb-4 text-xl font-semibold lg:flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Meno (povinné)
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={name ?? ''}
            placeholder="Meno"
            maxLength={64}
            required
          />
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="surename"
            className="block mb-2 text-sm font-medium text-white"
          >
            Priezvisko (povinné)
          </label>
          <input
            type="text"
            name="surename"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={surename ?? ''}
            placeholder="Priezvisko"
            maxLength={64}
            required
          />
        </div>
      </div>
    </Card>
  );
}
