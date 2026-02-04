import Link from "next/link";
import { ContactInfo } from "@/types";

interface ContactLinksProps {
  contact: ContactInfo;
}

export function ContactLinks({ contact }: ContactLinksProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        href={`mailto:${contact.email}`}
        className="group flex flex-col items-center"
      >
        <p className="text-lg font-normal leading-normal tracking-wide transition-colors group-hover:text-primary">
          {contact.email}
        </p>
        <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </Link>

      <Link
        href={contact.socialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center"
      >
        <p className="text-lg font-normal leading-normal tracking-wide transition-colors group-hover:text-primary">
          {contact.socialHandle}
        </p>
        <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </Link>
    </div>
  );
}
