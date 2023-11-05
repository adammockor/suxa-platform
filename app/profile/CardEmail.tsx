'use client';
import Card from './Card';

export default function CardEmail({
  email,
  emailVisible
}: {
  email?: string | null;
  emailVisible?: boolean | null;
}) {
  return (
    <Card
      title="Kontaktné údaje"
      description="Tvoj e-mail už máme. Budeme ti naň posielať SUXA newsletter a môžeš si vybrať, či ho uverejniíme alebo nie. Odporúčame ho zdieľať - SUXA je uzavretá komunita a prístup k nemu budú mať len členovia."
    >
      <div className="mt-4 mb-4 text-xl font-semibold lg:flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            E-mail (povinné)
          </label>
          <input
            type="text"
            name="email"
            className="w-full p-3 rounded-md bg-zinc-400 text-black"
            defaultValue={email ?? ''}
            placeholder="Tvoj email"
            required
            readOnly
          />
        </div>
      </div>
      <div className="w-full text-xl">
        <div className="flex items-center mb-4">
          <input
            id="email_visible"
            name="email_visible"
            type="checkbox"
            defaultChecked={emailVisible ?? true}
            className="w-6 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
          />
          <label htmlFor="email_visible" className="ml-2">
            Uverejniť e-mail v zozname členov
          </label>
        </div>
      </div>
    </Card>
  );
}
