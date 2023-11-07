'use client';

import Card from '../profile/Card';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/ui/collapsible';
import { useState } from 'react';

export type Member = {
  name?: string | null;
  surename?: string | null;
  job_role?: string | null;
  email?: string | null;
  organization?: string | null;
  years_of_experience?: number | null;
  bio?: string | null;
  linkedin?: string | null;
  website?: string | null;
  city?: string | null;
  interests?: string | null;
};
export default function MemberCard({ member }: { member: Member }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    bio,
    linkedin,
    website,
    email,
    years_of_experience,
    organization,
    city,
    interests
  } = member;

  return (
    <Card>
      <div className="flex items-start gap-3 mb-4 min-h-[120px]">
        <Avatar className="h-12 w-12 text-black">
          <AvatarFallback>
            {member.name?.charAt(0)}
            {member.surename?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5 text-xs">
          <div className="font-semibold text-xl">
            {member.name} {member.surename}
          </div>
          <div className="text-zinc-300">
            {member.job_role} v {organization}
          </div>
          {city ? <div className="text-zinc-300">{city}</div> : null}
          {years_of_experience ? (
            <div className="text-zinc-300">
              {getYearsOfExperienceLabel(years_of_experience)}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-between">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="text-sm">
          <CollapsibleTrigger>
            <div className="text-left w-full flex justify-between items-start">
              O mne {isOpen ? <IconChevronUp /> : <IconChevronDown />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2">
              {bio ? (
                <p className="mb-2">
                  <span className="font-semibold">Bio:</span> {bio}
                  <br />
                </p>
              ) : null}
              {interests ? (
                <p>
                  <span className="font-semibold">Záujmy:</span> {interests}
                  <br />
                </p>
              ) : null}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div className="flex space-x-2">
          {email ? (
            <Link
              href={`mailto:${email}`}
              target="_blank"
              aria-label="Email link"
            >
              <IconEmail />
            </Link>
          ) : null}
          {linkedin ? (
            <Link href={linkedin} target="_blank" aria-label="LinkedIn link">
              <IconLinkedIn />
            </Link>
          ) : null}
          {website ? (
            <Link href={website} target="_blank" aria-label="Website link">
              <IconWebsite />
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
function getYearsOfExperienceLabel(years_of_experience: number) {
  switch (years_of_experience) {
    case 1:
      return `${years_of_experience} rok skúseností`;
    case 2:
    case 3:
    case 4:
      return `${years_of_experience} roky skúseností`;
    default:
      return `${years_of_experience} rokov skúseností`;
  }
}

const IconEmail = () => (
  <svg
    className=" h-4 w-4 text-zinc-300"
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="16" rx="2" width="20" x="2" y="4" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLinkedIn = () => (
  <svg
    className=" h-4 w-4 text-zinc-300"
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect height="12" width="4" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconWebsite = () => (
  <svg
    className=" h-4 w-4 text-zinc-300"
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconChevronDown = () => (
  <svg
    className="h-5 w-5 text-zinc-300"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconChevronUp = () => (
  <svg
    className="h-5 w-5 text-zinc-300"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);
