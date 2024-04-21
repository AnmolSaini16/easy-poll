import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PollLoading() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        {[1, 2, 3]?.map((option) => {
          return (
            <div
              key={option}
              className="border rounded-lg px-2 py-4 space-y-2 bg-background "
            >
              <div className="flex justify-between">
                <Skeleton className=" h-5 w-40 rounded-md" />
                <Skeleton className=" h-5 w-16 rounded-md" />
              </div>

              <Skeleton className=" h-5 w-full rounded-md" />

              <Skeleton className=" h-5 w-16 rounded-md" />
            </div>
          );
        })}
      </div>

      <Card className="bg-muted/40 py-5 h-fit">
        <CardContent className="text-center space-y-6 md:pt-4">
          <div className="space-y-2 text-center">
            <Skeleton className=" h-5 w-12 rounded-md mx-auto" />
            <Skeleton className=" h-16 w-20 rounded-md mx-auto" />
          </div>
          <Skeleton className="h-10 w-[150px] rounded-md mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}
