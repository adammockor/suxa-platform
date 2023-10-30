'use client';
import Card from './Card';

function GDPRConsent({ gdprConsent }: { gdprConsent?: boolean | null }) {
  return (
    <Card title="Spracovanie osobných údajov">
      <div className="mt-4 text-xl flex gap-4">
        <div className="w-full">
          <div className="flex items-center mb-4">
            <input
              id="gdpr_consent"
              name="gdpr_consent"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
              required
              defaultChecked={gdprConsent ?? false}
            />
            <label htmlFor="gdpr_consent" className="ml-2">
              Súhlasím so spracovaním údajov (povinné)
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default GDPRConsent;
