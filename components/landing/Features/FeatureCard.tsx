import { Feature } from "./types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({
  feature,
}: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-emerald-300
      hover:shadow-2xl
      "
    >
      <div
        className="
        inline-flex
        rounded-2xl
        bg-emerald-50
        p-4
        transition-colors
        group-hover:bg-emerald-600
        "
      >
        <Icon
          className="
          h-8
          w-8
          text-emerald-600
          transition-colors
          group-hover:text-white
          "
        />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {feature.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {feature.description}
      </p>
    </div>
  );
}