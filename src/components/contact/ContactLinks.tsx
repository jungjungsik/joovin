import Link from "next/link";
import { ContactInfo } from "@/types";
import { SocialIcons } from "./SocialIcons";

interface ContactLinksProps {
  contact: ContactInfo;
}

export function ContactLinks({ contact }: ContactLinksProps) {
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

      <SocialIcons socialLinks={contact.socialLinks} />
    </div>
  );
}
