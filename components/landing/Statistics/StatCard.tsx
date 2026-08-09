import { Statistic } from "./types";

interface StatCardProps {
  stat: Statistic;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="rounded-3xl bg-slate-900 p-8 text-white transition-transform duration-300 hover:-translate-y-2">
      <h3 className="text-5xl font-bold text-emerald-400">
        {stat.value}
      </h3>

      <p className="mt-4 text-xl font-semibold">
        {stat.label}
      </p>

      <p className="mt-3 text-slate-300 leading-7">
        {stat.description}
      </p>
    </article>
  );
}