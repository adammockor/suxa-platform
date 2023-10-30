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
      description="E-mail bude vašim vstupom do komunity a budeme naň posielať SUXA newsletter. Môžete sa rozhodnúť nezobrazovať ho v zozname členov."
    >
      <div className="mt-4 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email (povinné)
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
      <div className="mt-4 text-xl flex gap-4">
        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <input
              id="email_visible"
              name="email_visible"
              type="checkbox"
              defaultChecked={emailVisible ?? true}
              className="w-6 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
            />
            <label htmlFor="email_visible" className="ml-2">
              Zobrazovať e-mail v zozname členov
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}
