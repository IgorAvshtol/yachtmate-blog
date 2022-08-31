import Link from 'next/link';
import React, { ForwardedRef, forwardRef } from 'react';

interface ILink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const AccessibilityLink = forwardRef(({ to, ...props }: ILink, ref: ForwardedRef<HTMLAnchorElement>) => {
  return (
      <Link href={to}>
        <a {...props} ref={ref}/>
      </Link>
  );
});
AccessibilityLink.displayName = 'AccessibilityLink';