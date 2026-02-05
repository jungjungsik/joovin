interface ReflectiveTextProps {
  text: string;
}

export function ReflectiveText({ text }: ReflectiveTextProps) {
  return (
    <section className="px-6 lg:px-0 py-12 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Vertical Decorative Line */}
        <div
          className="w-px h-12 bg-gray-300 dark:bg-gray-600"
          aria-hidden="true"
        />

        {/* Reflective Text */}
        <p className="serif-text text-lg text-gray-800 dark:text-gray-50 leading-relaxed max-w-md italic">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </section>
  );
}
