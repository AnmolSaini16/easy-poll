import React from "react";

import PollDetails from "./PollDetails";
import { IPoll } from "@/types";
import Poll from "./Poll";

type Props = {
  poll: IPoll;
};

const PollRootWrapper = ({ poll }: Props) => {
  return (
    <div className="space-y-8">
      <PollDetails poll={poll} />

      <Poll poll={poll} />
    </div>
  );
};

export default PollRootWrapper;
