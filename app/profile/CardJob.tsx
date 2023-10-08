'use client';

import { useState } from 'react';
import Card from './Card';

const roles = [
  'Developer',
  'Produktový manažér',
  'UX dizajnér',
  'UI dizajnér',
  'Interakčný dizajnér',
  'Výskumník',
  'Iné'
];

function getRoleSelectValue(role: string) {
  if (role === '') {
    return undefined;
  }

  if (!roles.includes(role)) {
    return 'Iné';
  }

  return role;
}

function CardJob({
  organization,
  job_role,
  years_of_experience,
  city
}: {
  organization: string;
  job_role: string;
  years_of_experience: string;
  city: string;
}) {
  const [role, setRole] = useState(job_role);

  const handleRoleChange: React.FormEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (event) => {
    setRole((event.target as HTMLFormElement).value);
  };

  return (
    <Card
      title="Vaša práca"
      description="Vyplňte svoju aktuálnu pracovnú skúsenosť"
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="organization"
            className="block mb-2 text-sm font-medium text-white"
          >
            Organizácia
          </label>
          <input
            type="text"
            name="organization"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={organization}
            placeholder="Organizácia"
            maxLength={64}
          />
        </div>
        <div className="w-1/2 mt-4">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-white"
          >
            Mesto
          </label>
          <input
            type="text"
            name="city"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={city}
            placeholder="Mesto"
            maxLength={64}
          />
        </div>
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="job_role"
            className="block mb-2 text-sm font-medium text-white"
          >
            Pracovná rola (povinné)
          </label>
          <select
            name="job_role"
            className="w-full p-3 rounded-md bg-zinc-800"
            placeholder="Your job role"
            value={getRoleSelectValue(role)}
            onChange={handleRoleChange}
            required
          >
            <option value="">Vyber si rolu</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        {/* SHow input custom job role is different to predefined list  */}
        {role === 'Iné' || (role !== '' && !roles.includes(role)) ? (
          <div className="w-1/2 mt-4">
            <label
              htmlFor="job_role_other"
              className="block mb-2 text-sm font-medium text-white"
            >
              Iná pracovná rola
            </label>
            <input
              type="text"
              name="job_role_other"
              className="w-full p-3 rounded-md bg-zinc-800"
              defaultValue={role === 'Iné' ? '' : role}
              placeholder="Pracovná rola"
              maxLength={64}
              required
            />
          </div>
        ) : null}
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="years_of_experience"
            className="block mb-2 text-sm font-medium text-white"
          >
            Počet rokov skúsenosťí
          </label>
          <input
            type="text"
            name="years_of_experience"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={years_of_experience}
            placeholder="Počet rokov skúsenosťí"
            pattern="[0-9]+"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}

export default CardJob;
