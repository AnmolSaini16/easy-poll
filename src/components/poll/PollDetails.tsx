import React from "react";

import { Badge } from "../ui/badge";
import { IPoll } from "@/types";
import { isPollActive } from "@/lib/utils";

type Props = {
  poll: IPoll;
};

const PollDetails = ({ poll }: Props) => {
  return (
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-bold break-words">{poll?.title}</h1>
      <p className="text-muted-foreground">{poll?.description}</p>

      <div className="flex justify-between flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <h4 className="text-lg">
          <span className="text-muted-foreground">Asked by: </span>
          {poll?.users?.user_name}{" "}
          <span className="text-muted-foreground">on </span>
          {new Date(poll.created_at).toLocaleString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>

        <h4 className="text-lg">
          {isPollActive(poll?.end_date) ? (
            <>
              <span className="text-muted-foreground">Active till: </span>
              {new Date(poll?.end_date).toLocaleString()}{" "}
            </>
          ) : (
            <Badge variant="destructive"> Poll Expired</Badge>
          )}
        </h4>
      </div>
    </div>
  );
};

export default PollDetails;
