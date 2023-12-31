'use client';
import Card from './Card';

function CardBio({
  bio,
  linkedin,
  website
}: {
  bio?: string | null;
  linkedin?: string | null;
  website?: string | null;
}) {
  return (
    <Card
      title="Profil"
      description="Pomôž ostatným lepšie ťa spoznať. Vyplň pár detailov o sebe a prilož linky na LinkedIn profil či web."
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-white"
          >
            O tebe
          </label>
          <textarea
            name="bio"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={bio ?? ''}
            placeholder="O tebe"
            maxLength={500}
            rows={5}
          />
        </div>
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="linkedin"
            className="block mb-2 text-sm font-medium text-white"
          >
            Linkedin profil
          </label>
          <input
            type="text"
            name="linkedin"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={linkedin ?? ''}
            placeholder="Linkedin profil url"
            maxLength={64}
          />
        </div>
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="website"
            className="block mb-2 text-sm font-medium text-white"
          >
            Osobný web
          </label>
          <input
            type="text"
            name="website"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={website ?? ''}
            placeholder="Osobný web url"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}

export default CardBio;
