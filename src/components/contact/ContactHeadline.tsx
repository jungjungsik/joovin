interface ContactHeadlineProps {
  text?: string;
}

export function ContactHeadline({ text = "Let's talk art." }: ContactHeadlineProps) {
  return (
    <div className="mb-2">
      <h1 className="text-[40px] font-bold leading-tight text-center tracking-tight">
        {text}
      </h1>
    </div>
  );
}
