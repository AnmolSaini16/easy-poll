"use client";

import { CalendarIcon, Pencil, Share, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
import { deletePoll, updatePollDetails } from "@/lib/actions/poll";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, nextWeek } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

type Props = {
  poll: Tables<"poll">;
};

const PollAction = ({ poll }: Props) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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

  const deletePollPromise = async () => {
    const { error } = await deletePoll(poll.id);
    if (error) {
      console.error(error.message);
      throw new Error();
    } else {
      router.refresh();
    }
  };

  const handleDeletePoll = () => {
    toast.promise(deletePollPromise(), {
      loading: "Deleting poll...",
      success: "Succesfully deleted poll",
      error: "Failed to delete poll",
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
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
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

      <EditPollModal
        key={`${showEditModal}`}
        poll={poll}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
    </>
  );
};

export default PollAction;

const EditPollModal = ({
  poll,
  showEditModal,
  setShowEditModal,
}: {
  poll: Tables<"poll">;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const queryCache = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: poll.title,
      description: poll?.description ?? "",
      end_date: new Date(poll.end_date),
    },
  });

  const { isDirty } = form.formState;

  const editPollPromise = async (payload: {
    title: string;
    end_date: Date;
    description?: string;
  }) => {
    const { error } = await updatePollDetails(payload, poll.id);
    if (error) {
      console.error(error.message);
      throw new Error();
    } else {
      queryCache.invalidateQueries({ queryKey: ["poll-" + poll.id] });
      router.refresh();
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast.promise(
      editPollPromise({
        title: data.title,
        end_date: data.end_date,
        description: data.description,
      }),
      {
        loading: "Saving Changes...",
        success: "Changes saved",
        error: "Failed to edit changes",
      }
    );
    setShowEditModal(false);
  };

  return (
    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit poll</DialogTitle>
          <DialogDescription>
            Make changes to your poll here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-center gap-6"
            id="edit-poll"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="title of your poll " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriptions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="descriptions of your poll"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > nextWeek() || date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" id="edit-poll" disabled={!isDirty}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const FormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title should be minimum of 2 characters " })
    .max(200, { message: "Title has a maximum characters of 200" }),
  description: z
    .string()
    .max(500, { message: "Title has a maximum characters of 500" })
    .optional(),
  end_date: z.date(),
});
