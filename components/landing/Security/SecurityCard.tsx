import { SecurityFeature } from "./types";

interface SecurityCardProps {
  feature: SecurityFeature;
}

export function SecurityCard({
  feature,
}: SecurityCardProps) {
  const Icon = feature.icon;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="inline-flex rounded-2xl bg-emerald-100 p-4">
        <Icon className="h-8 w-8 text-emerald-700" />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {feature.title}
      </h3>

      <p className="mt-3 text-slate-600 leading-7">
        {feature.description}
      </p>
    </article>
  );
}