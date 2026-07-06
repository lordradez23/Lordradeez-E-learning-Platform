"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transactions } from "@/constants";

const TransactionTable = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground font-medium">Name Course</TableHead>
              <TableHead className="text-muted-foreground font-medium">Category</TableHead>
              <TableHead className="text-muted-foreground font-medium">Name User</TableHead>
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{transaction.course}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                <TableCell className="text-right font-semibold">{transaction.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
