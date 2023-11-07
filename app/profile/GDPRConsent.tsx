'use client';
import Link from 'next/link';
import Card from './Card';

function GDPRConsent({ gdprConsent }: { gdprConsent?: boolean | null }) {
  return (
    <Card title="Spracovanie osobných údajov">
      <div className="mt-4 flex gap-4">
        <div className="w-full">
          <p className="mb-4">
            Aby sme ťa mohli zaregistrovať, potrebujeme tvoj súhlas so
            spracovaním údajov, ktoré si nám poskytol/la. Viac o spracovaní
            osobných údajov sa{' '}
            <Link
              href="https://www.suxa.sk/ochrana-osobnych-udajov"
              target="_blank"
            >
              dočítaš tu
            </Link>
            .
          </p>
          <div className="flex items-center mb-4 text-xl">
            <input
              id="gdpr_consent"
              name="gdpr_consent"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
              required
              defaultChecked={gdprConsent ?? false}
            />
            <label htmlFor="gdpr_consent" className="ml-2">
              <Link href="SUXA-GDPR-SsSOU_VSEOBECNY SUHLAS_ZA_06112023.doc">
                Spracovanie osobných údajov
              </Link>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default GDPRConsent;
