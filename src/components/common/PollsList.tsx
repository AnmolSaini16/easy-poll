import Link from "next/link";

import { IPolls } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {
  polls: IPolls;
  isExpired?: boolean;
};

const PollsList = ({ polls, isExpired = false }: Props) => {
  return (
    <div className="w-full gap-6 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-dense ">
      {polls.map((poll) => {
        const totalVotes = poll?.poll_option?.reduce(
          (acc, curr) => acc + curr?.count,
          0
        ) as number;

        return (
          <Link href={"/poll/" + poll.id} key={poll.id}>
            <Card className="shadow-md transition-all delay-100 scale-100 relative md:hover:-translate-y-1 md:hover:border-primary hover:cursor-pointer">
              <CardHeader className="space-y-4">
                <CardTitle className="truncate">{poll.title}</CardTitle>
                <CardDescription>
                  Created{" "}
                  {new Date(poll.created_at).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <Badge
                variant="outline"
                className=" absolute -top-2 -right-2 border-green-500 text-sm bg-background"
              >
                {totalVotes} votes
              </Badge>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default PollsList;
