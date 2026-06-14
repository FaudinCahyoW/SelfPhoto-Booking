"use client";
import { useMemo, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { SearchComponent } from "@/components/SearchComponent";

type SortKey = "booking_id" | "name" | "service_type" | "date" | "time"
type SortDirection = "asc" | "desc"

export default function DashboardPage() {
  const { orders, services } = useAdmin();
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("booking_id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const baseOrders = useMemo(() => {
    return filteredOrders.length > 0 || orders.length === 0 ? filteredOrders : orders;

  }, [filteredOrders, orders])

  const sortedOrders = useMemo(() => {
    const copyData = [...baseOrders]
    return copyData.sort((a,b) => {
      let valueA = ""
      let valueB = ""

      if(sortKey === "service_type"){
        valueA = a.service_tb?.service_type || ""
        valueB = b.service_tb?.service_type || ""
      }else{
        valueA = a[sortKey] || ""
        valueB = b[sortKey] || ""
      }

      if (sortDirection === "asc"){
        return String(valueA).localeCompare(String(valueB), undefined, {numeric: true})
      }else{
        return String(valueB).localeCompare(String(valueA), undefined, {numeric: true})

      }
    })
  }, [baseOrders, sortKey, sortDirection])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem)
  

  const targetOrdersLength =
    filteredOrders.length > 0 || orders.length === 0
      ? filteredOrders.length
      : orders.length;
  const totalPages = Math.ceil(targetOrdersLength / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const todayStr = new Date().toLocaleDateString("en-CA");
  const todayOrdersCount = orders.filter((o) => o.date === todayStr).length;

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "asc"
    if (sortKey === key && sortDirection === "asc"){
      direction = "desc"
    }
    setSortDirection(direction)
    setSortKey(key)
  }

  const handleSearchChange = (newData: any[]) => {
    setFilteredOrders(newData);
  };

  const RenderSortIcon = ({columN}: {columN: SortKey}) => {
    if (sortKey !== columN) return <span className="text-slate-300 ml-1 text-xs cursor-pointer">⇅ sort</span>
    return sortDirection === "asc" ? <span className="text-slate-800 ml-1 text-xs cursor-pointer">▲ asc</span>: <span className="text-slate-800 ml-1 text-xs cursor-pointer">▼ desc</span>
  }

  return (
    <div className="flex min-h-screen font-sans p-4">
      <main className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <span className="text-xs text-slate-400 font-medium block">
              Total Orders
            </span>
            <span className="text-xl font-bold text-slate-800 block mt-1">
              {orders.length} orders
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              All order queue
            </span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <span className="text-xs text-slate-400 font-medium block">
              Total Services
            </span>
            <span className="text-xl font-bold text-slate-800 block mt-1">
              {services.length} Services
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              Active package variations
            </span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <span className="text-xs text-slate-400 font-medium block">
              Today Schedule
            </span>
            <span className="text-xl font-bold text-emerald-600 block mt-1">
              {todayOrdersCount} Session
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              Registered visit today
            </span>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <section className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">New Orders</h2>
            <SearchComponent onSearchChange={handleSearchChange} />
          </section>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th onClick={() => handleSort("booking_id")} className="py-4 text-left font-semibold text-slate-500">
                    Booking ID <RenderSortIcon columN="booking_id"/>
                  </th>
                  <th onClick={() => handleSort("name")} className="py-4 text-left font-semibold text-slate-500">
                    Customer <RenderSortIcon columN="name"/>
                  </th>
                  <th onClick={() => handleSort("service_type")} className="py-4 text-left font-semibold text-slate-500">
                    Order Service <RenderSortIcon columN="service_type"/>
                  </th>
                  <th onClick={() => handleSort("date")} className="py-4 text-right font-semibold text-slate-500">
                    Order Date <RenderSortIcon columN="date"/>
                  </th>
                  <th onClick={() => handleSort("time")} className="py-4 text-right font-semibold text-slate-500">
                    Order Time Schedule <RenderSortIcon columN="time"/>
                  </th>
                  <th className="py-4 text-right font-semibold text-slate-500">
                    Customer Phone Number
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentOrders.length > 0 ? (
                  currentOrders.map((o) => (
                    <tr
                      key={o.booking_id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 font-medium text-slate-800">
                        {o.booking_id}
                      </td>
                      <td className="py-4 font-medium text-slate-800">
                        {o.name}
                      </td>
                      <td className="py-4 text-slate-600">
                        {o.services_tb?.service_type}
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {o.date}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {o.time}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <a
                          href={`https://wa.me/${o.phone_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition"
                        >
                          Contact Customer
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Data not found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6 mt-4">
              {/* Mobile Pagination */}
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    paginate(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              {/* Desktop Pagination */}
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, targetOrdersLength)}
                    </span>{" "}
                    of <span className="font-medium">{targetOrdersLength}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => paginate(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                    >
                      &laquo;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-xs font-semibold ring-1 ring-inset ring-slate-300 ${
                            currentPage === page
                              ? "z-10 bg-blue-600 text-white"
                              : "text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        paginate(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
