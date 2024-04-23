import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PollListLoading() {
  return (
    <div className="w-full gap-4 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-dense ">
      {[1, 2, 3].map((poll) => {
        return (
          <Card className="shadow-md" key={poll}>
            <CardHeader>
              <CardTitle className="space-y-4">
                <Skeleton className="h-8 w-60" />
                <CardDescription>
                  <Skeleton className="h-3 w-44" />
                </CardDescription>
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
