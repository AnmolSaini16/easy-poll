import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PollListLoading() {
  return (
    <div className="w-full gap-6 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-dense ">
      {[1, 2, 3].map((poll) => {
        return (
          <Card className="shadow-md" key={poll}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-8 w-60" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-44" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
