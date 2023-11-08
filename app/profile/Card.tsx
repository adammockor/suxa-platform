import { ReactNode } from 'react';

interface Props {
  title?: string;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl mb-8 border rounded-md border-zinc-700 mx-auto">
      <div className="px-5 py-4">
        {title ? <h3 className="mb-1 text-2xl font-medium">{title}</h3> : null}
        {description ? <p className="text-zinc-300">{description}</p> : null}
        {children}
      </div>
      {footer ? (
        <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-300">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export default Card;
