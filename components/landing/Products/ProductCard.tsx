import { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl">
      <div className="inline-flex rounded-2xl bg-emerald-50 p-4">
        <Icon className="h-8 w-8 text-emerald-600" />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {product.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {product.description}
      </p>
    </article>
  );
}