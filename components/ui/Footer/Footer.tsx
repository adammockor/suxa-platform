import Link from 'next/link';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 bg-zinc-900">
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="mailto:hello@suxa.sk"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Email
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="https://www.facebook.com/suxa.sk/"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Facebook
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="https://www.youtube.com/channel/UCfRE746YCj0TPwZg7uJeywQ"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Youtube
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="https://medium.com/suxa-slovensk%C3%A1-user-experience-asoci%C3%A1cia"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Medium
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="https://www.suxa.sk/ochrana-osobnych-udajov"
                className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Ochrana osobných údajov
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-white transition duration-150 ease-in-out hover:text-zinc-200">
                Slovenská User Experience Asociácia
                <br />
                Ilkovičova 2, 84216 Bratislava
                <br />
                DIČ: 2120903939
                <br />
                IČO: 51018756
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row bg-zinc-900">
        <div>
          <span>&copy; {new Date().getFullYear()} SUXA</span>
        </div>
        <div className="flex items-center">
          <span className="text-white">Crafted by</span>
          <a href="https://lbstudio.sk" aria-label="Lighting Beetle*">
            <img
              src="/logo-lb.svg"
              alt="Lighting Beetle* logo"
              className="inline-block h-5 ml-4 text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
