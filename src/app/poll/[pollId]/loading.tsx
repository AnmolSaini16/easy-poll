import PollLoading from "@/components/poll/PollLoading";
import { Skeleton } from "@/components/ui/skeleton";

export default function PollPageLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 w-full">
        <Skeleton className=" h-8 w-48 rounded-md" />

        <div className="flex justify-between flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <h4 className="text-lg">
            <Skeleton className=" h-5 w-64 rounded-md" />
          </h4>

          <h4 className="text-lg">
            <Skeleton className=" h-5 w-40 rounded-md" />
          </h4>
        </div>
      </div>
      <PollLoading />
    </div>
  );
}
