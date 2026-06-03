"use client";
import Link from "next/link";
export function SideBarComp() {
  return (
    <div>
      <aside className="shrink-0 top-0 left-0 h-screen bg-[#101E3B] w-64 text-white">
        <div className="p-4">
          <ul className="space-y-2 ">
            <li>
              <Link href="/adminPage/dashboard" className="block p-2 rounded hover:bg-[#1990FE]" >
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/adminPage/serviceManage" className="block p-2 rounded hover:bg-[#1990FE]">
                Manage Content
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      
    </div>
  );
}
