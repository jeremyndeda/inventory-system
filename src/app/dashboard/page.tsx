"use client";
import { useQuery } from "convex/react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

interface Item {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  status: "in_store" | "issued";
  dateAdded: number;
}

export default function Dashboard() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const items = useQuery(api.items.getItems, {
    category: categoryFilter || undefined,
    startDate: startDate ? new Date(startDate).getTime() : undefined,
    endDate: endDate ? new Date(endDate).getTime() : undefined,
  }) as Item[] | undefined;

  const generatePDF = () => {
    if (!items || items.length === 0) {
      toast.error("No items to generate PDF");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Inventory Report", 20, 20);
    doc.setFontSize(12);
    let y = 30;

    items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} | Category: ${item.category} | Quantity: ${item.quantity} | Status: ${item.status} | Date: ${new Date(
          item.dateAdded
        ).toLocaleDateString()}`,
        20,
        y
      );
      y += 10;
    });

    doc.save("inventory-report.pdf");
    toast.success("PDF generated successfully");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex space-x-4">
              <Input
                placeholder="Filter by category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button onClick={generatePDF}>Generate PDF</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{new Date(item.dateAdded).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}