import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useMemo, useState } from "react";

export function SearchComponent({ onSearchChange }: { onSearchChange: (filtered: any[]) => void }) {
  const { orders } = useAdmin();
  const [searchData, setSearchData] = useState("");

  const filteredOrders = useMemo(() => {
    if (!searchData) return orders;
    return orders.filter((order) =>
      order.name.toLowerCase().includes(searchData.toLowerCase()),
    );
  }, [orders, searchData]);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(filteredOrders);
    } 
  }, [filteredOrders, onSearchChange]);

  return (
    <section className="ms-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchData}
          placeholder="Find customer name..."
          className="border rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
          onChange={(e) => setSearchData(e.target.value)}
        />
      </form>
    </section>
  );
}