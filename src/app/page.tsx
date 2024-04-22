import CarouselCompoenent from "@/components/common/Carousel";
import PollListLoading from "@/components/common/PollListLoading";
import PollsList from "@/components/common/PollsList";
import { ActivePollLists, ExpiredPollsList } from "@/lib/actions/poll";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-10">
      <CarouselCompoenent />

      <h1 className="text-2xl font-bold text-primary">Active Public Polls</h1>
      <Suspense fallback={<PollListLoading />}>
        <ActivePolls />
      </Suspense>

      <h1 className="text-2xl font-bold text-red-400">Previous polls</h1>
      <Suspense fallback={<PollListLoading />}>
        <ExpiredPolls />
      </Suspense>
    </div>
  );
}

const ActivePolls = async () => {
  const { data: polls } = await ActivePollLists();

  if (!polls?.length) {
    return (
      <h1 className="text-center text-muted-foreground">No polls yet 😔</h1>
    );
  }

  return <PollsList polls={polls} />;
};

const ExpiredPolls = async () => {
  const { data: polls } = await ExpiredPollsList();

  if (!polls?.length) {
    return (
      <h1 className="text-center text-muted-foreground">No polls yet 😔</h1>
    );
  }

  return <PollsList polls={polls} isExpired={true} />;
};
