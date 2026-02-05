interface ContactHeadlineProps {
  text?: string;
}

export function ContactHeadline({ text = "Let's talk art." }: ContactHeadlineProps) {
  return (
    <div className="mb-2 max-w-4xl mx-auto">
      <h1 className="text-[40px] lg:text-5xl font-bold leading-tight text-center tracking-tight dark:text-white">
        {text}
      </h1>
    </div>
  );
}
