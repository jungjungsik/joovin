import Link from "next/link";
import { ContactInfo } from "@/types";

interface ContactLinksProps {
  contact: ContactInfo;
}

export function ContactLinks({ contact }: ContactLinksProps) {
  // Display socialHandle if set, otherwise extract username from URL
  const displaySocial = contact.socialHandle ||
    (contact.socialUrl ? `@${contact.socialUrl.split('/').pop()}` : '');

  return (
    <div className="flex flex-col items-center gap-6">
      {contact.email && (
        <Link
          href={`mailto:${contact.email}`}
          className="group flex flex-col items-center"
        >
          <p className="text-lg font-normal leading-normal tracking-wide transition-colors group-hover:text-primary dark:text-white">
            {contact.email}
          </p>
          <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
      )}

      {contact.socialUrl && (
        <Link
          href={contact.socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center"
        >
          <p className="text-lg font-normal leading-normal tracking-wide transition-colors group-hover:text-primary dark:text-white">
            {displaySocial}
          </p>
          <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
      )}
    </div>
  );
}
