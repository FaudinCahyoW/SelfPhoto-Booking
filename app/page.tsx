import ProductCard from "@/components/ProductCard";

export default async function Home() {
  return (
    <main className="w-full">
      <div className="px-6 py-6">
        <ProductCard />
      </div>
    </main>
  );
}
