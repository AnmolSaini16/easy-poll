import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Rocket } from "lucide-react";

export default function ProfileLoading() {
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-muted/40">
      <CardHeader>
        <h1 className="text-3xl font-bold flex items-center gap-2 ">
          Your Polls <Rocket className="text-green-500" />
        </h1>
        <CardDescription>
          Manage your polls and view their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>End At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[1, 2, 3, 4].map((value) => {
              return (
                <TableRow key={value}>
                  <TableCell className="font-medium">
                    <Skeleton className=" h-5 w-24 rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Skeleton className=" h-5  w-24 rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Skeleton className=" h-5  w-24 rounded-lg" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Skeleton className=" h-5  w-24 rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-1">
                    <Skeleton className=" h-2  w-2 rounded-full" />
                    <Skeleton className=" h-2  w-2 rounded-full" />
                    <Skeleton className=" h-2  w-2 rounded-full" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
