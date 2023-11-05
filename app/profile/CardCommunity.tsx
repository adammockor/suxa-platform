'use client';
import Card from './Card';

function CardCommunity({
  interests,
  expectations
}: {
  interests?: string | null;
  expectations?: string | null;
}) {
  return (
    <Card
      title="Záujmy"
      description="Aktivity SUXA organizujeme podľa toho, čo zaujíma jej členov. Napíš nám, aké témy by si rád videl/a a my sa pokúsime vyjsť ti v ústrety."
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="interests"
            className="block mb-2 text-sm font-medium text-white"
          >
            Aké obsahové témy ťa zaujímajú?
          </label>
          <textarea
            name="interests"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={interests ?? ''}
            maxLength={500}
            rows={5}
          />
        </div>
      </div>
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="expectations"
            className="block mb-2 text-sm font-medium text-white"
          >
            Aké sú tvoje očakávania od členstva v SUXA?
          </label>
          <textarea
            name="expectations"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={expectations ?? ''}
            maxLength={500}
            rows={5}
          />
        </div>
      </div>
    </Card>
  );
}

export default CardCommunity;
