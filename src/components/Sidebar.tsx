"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Package, FileText, LogOut } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Inventory System</h2>
      <nav className="space-y-2 flex-1">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/dashboard">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/dashboard/add-item">
            <Package className="mr-2 h-4 w-4" />
            Add Item
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/dashboard/issue-item">
            <FileText className="mr-2 h-4 w-4" />
            Issue Item
          </Link>
        </Button>
      </nav>
      <SignOutButton redirectUrl="/">
        <Button variant="ghost" className="w-full justify-start mt-4">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SignOutButton>
    </div>
  );
}