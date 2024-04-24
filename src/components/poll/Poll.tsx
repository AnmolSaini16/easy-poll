"use client";

import React, { useMemo } from "react";
import { AlertCircle, Share } from "lucide-react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

import { Progress } from "../ui/progress";
import { useUser } from "@/hooks/useUser";
import { updatePoll } from "@/lib/actions/poll";
import { useGetPoll, usePollOptionListner } from "@/hooks/poll";
import { cn, getHighestOptions } from "@/lib/utils";
import { Button } from "../ui/button";
import { Alert, AlertTitle } from "../ui/alert";
import PollLoading from "./PollLoading";
import { Card, CardContent } from "../ui/card";

type Props = {
  pollId: string;
};

const Poll = ({ pollId }: Props) => {
  const router = useRouter();
  const { data: pollData, isLoading } = useGetPoll(pollId);
  const { data: userData } = useUser();

  usePollOptionListner(pollId);

  const totalVotes = useMemo(
    () =>
      pollData?.pollOptions?.reduce((acc, curr) => acc + curr?.count, 0) || 0,
    [pollData?.pollOptions]
  );

  const highestOptions = useMemo(
    () => getHighestOptions(pollData?.pollOptions ?? []),
    [pollData?.pollOptions]
  );

  if (isLoading && !pollData) {
    return <PollLoading />;
  }

  if (!pollData) {
    redirect("/");
  }

  const { user_poll_log, pollOptions, isPollActive } = pollData;

  const handleShare = () => {
    toast.promise(
      navigator.clipboard.writeText(location.origin + "/poll/" + pollId),
      {
        loading: "Copying link...",
        success: "Link copied successfully",
        error: (err) => "Failt to copy link " + err.toString(),
      }
    );
  };

  const castVotePromise = async (optionName: string) => {
    const { error } = await updatePoll({
      update_id: pollId,
      option_name: optionName,
    });
    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      router.refresh();
    }
  };

  const castVote = async (optionName: string) => {
    if (!userData) {
      toast.error("Please log in to vote");
    } else {
      toast.promise(castVotePromise(optionName), {
        loading: "Voting for " + optionName + "...",
        error: "Fail to vote for " + optionName,
        success: "Successfully vote for " + optionName,
      });
    }
  };

  const disablePoll = Boolean(user_poll_log) || !isPollActive;

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {pollOptions?.map((option) => {
            const percentage =
              totalVotes !== 0
                ? Math.round((option?.count / totalVotes) * 100)
                : 0;

            const highestOptionAfterPollExpired =
              highestOptions.includes(option?.option) && !isPollActive;

            return (
              <div
                key={option?.option}
                onClick={() => !disablePoll && castVote(option?.option)}
                className={cn(
                  "border rounded-lg px-2 py-4 space-y-2 bg-background transition-all delay-100",
                  !disablePoll &&
                    "hover:scale-105 hover:-translate-y-1 hover:cursor-pointer hover:border-primary",
                  highestOptionAfterPollExpired && "border-primary"
                )}
              >
                <div className="flex justify-between">
                  <p className="font-bold text-lg">
                    {option?.option} {highestOptionAfterPollExpired && "🥳"}
                  </p>
                  <p className=" font-bold">{percentage}%</p>
                </div>

                <Progress value={percentage} />

                <p className="text-muted-foreground">{option?.count} votes</p>
              </div>
            );
          })}
        </div>

        <div>
          <Card className="bg-muted/40 py-5">
            <CardContent className="text-center space-y-6 md:pt-4">
              {user_poll_log && (
                <Alert className="bg-transaparent w-fit mx-auto border-primary">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    You voted for{" "}
                    <span className="text-primary">
                      {user_poll_log?.option}{" "}
                    </span>
                    on{" "}
                    {new Date(
                      user_poll_log?.created_at ?? ""
                    ).toLocaleDateString()}
                  </AlertTitle>
                </Alert>
              )}
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground">Votes</p>
                <h1 className=" font-extrabold text-5xl">{totalVotes}</h1>
              </div>
              <Button className="w-[150px] mx-auto" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" /> Share
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Poll;
