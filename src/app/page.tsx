import CarouselCompoenent from "@/components/common/Carousel";
import PollsList from "@/components/common/PollsList";
import { ActivePollLists, ExpiredPollsList } from "@/lib/actions/poll";

export default function Home() {
  return (
    <div className="space-y-10">
      <CarouselCompoenent />

      <h1 className="text-2xl font-bold text-yellow-500 text-center">
        Active Votes
      </h1>
      <ActivePolls />

      <h1 className="text-2xl font-bold text-red-400 text-center">
        Previous Votes
      </h1>
      <ExpiredPolls />
    </div>
  );
}

const ActivePolls = async () => {
  const { data: polls } = await ActivePollLists();
  if (!polls?.length) {
    return <h1>No polls yet</h1>;
  }
  return <PollsList polls={polls} />;
};

const ExpiredPolls = async () => {
  const { data: polls } = await ExpiredPollsList();
  if (!polls?.length) {
    return <h1>No polls yet</h1>;
  }
  return <PollsList polls={polls} isExpired={true} />;
};
