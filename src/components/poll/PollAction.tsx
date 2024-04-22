"use client";

import { Pencil, Share, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Tables } from "@/types/supabase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deletePoll } from "@/lib/actions/poll";

type Props = {
  poll: Tables<"poll">;
};

const PollAction = ({ poll }: Props) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleShare = () => {
    toast.promise(
      navigator.clipboard.writeText(location.origin + "/poll/" + poll.id),
      {
        loading: "Copying link...",
        success: "Link copied successfully",
        error: (err) => "Failt to copy link " + err.toString(),
      }
    );
  };

  const deleteVotePromise = async () => {
    const { error } = await deletePoll(poll.id);
    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      router.refresh();
    }
  };

  const handleDeletePoll = () => {
    toast.promise(deleteVotePromise(), {
      loading: "Deleting poll...",
      success: "Succesfully deleted poll",
      error: "Failed to delete vote",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 ">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            <span>Share</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePoll}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PollAction;
