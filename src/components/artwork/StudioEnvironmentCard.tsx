import Image from "next/image";

interface StudioEnvironmentCardProps {
  image: string;
  description?: string;
}

export function StudioEnvironmentCard({
  image,
  description,
}: StudioEnvironmentCardProps) {
  return (
    <section className="px-6 py-6">
      <div className="bg-white dark:bg-[#1a170e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-5">
        {/* Header with Icon */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">brush</span>
          </div>
          <div>
            <h4 className="font-bold text-muted-gray dark:text-white">
              Studio Environment
            </h4>
            <p className="text-sm text-gold-muted">
              Where the work happens
            </p>
          </div>
        </div>

        {/* Studio Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={image}
            alt="Studio environment"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-800 dark:text-gray-50 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
