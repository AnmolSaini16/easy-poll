"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import { MutableRefObject, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, nextWeek } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { createPoll } from "@/lib/actions/poll";
import { LoadingButton } from "@/components/ui/LoadingButton";

const FormSchema = z.object({
  poll_options: z
    .array(z.string())
    .refine((value) => value.length >= 2 && value.length <= 6, {
      message:
        "You have to select at least two options and at max six options.",
    }),
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

export default function CreatePollForm() {
  const [options, setOptions] = useState<string[]>([]);
  const optionsInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const createPollMutation = useMutation({ mutationFn: createPoll });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const addOptions = () => {
    const newOption = optionsInputRef.current.value.trim();

    if (newOption) {
      if (!form.getValues("poll_options")?.includes(newOption)) {
        if (errors.poll_options) {
          form.clearErrors("poll_options");
        }
        form.setValue("poll_options", [...options, newOption]);
        setOptions((options) => [...options, newOption]);
        optionsInputRef.current.value = "";
      } else {
        form.setError("poll_options", {
          type: "custom",
          message: "Poll Options cannot be same",
        });
      }
    }
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const payload = { ...data };

    toast.promise(createPollMutation.mutateAsync(payload), {
      loading: "Creating your poll..",
      success: "Successfully created your poll",
      error: "Fail to create poll",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-center gap-6"
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
                <Textarea placeholder="descriptions of your poll" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poll_options"
          render={() => (
            <FormItem>
              <div>
                <FormLabel className="text-base">Poll Options*</FormLabel>
                <FormDescription>
                  Once created you cannot edit your poll options. Please double
                  check 📌.
                </FormDescription>
              </div>

              {options.map((option, index) => (
                <FormField
                  key={option}
                  control={form.control}
                  name="poll_options"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option}
                        className="flex justify-between items-center py-2"
                        {...field}
                      >
                        <FormLabel className="font-normal text-md">
                          {index + 1 + "."} {option}
                        </FormLabel>

                        <TrashIcon
                          className="w-5 h-5 cursor-pointer hover:scale-110 transition-all"
                          onClick={() => {
                            setOptions((prev) =>
                              prev.filter(
                                (prevOptions) => prevOptions !== option
                              )
                            );
                            field.onChange(
                              field.value?.filter((value) => value !== option)
                            );
                          }}
                        />
                      </FormItem>
                    );
                  }}
                />
              ))}

              <Input
                type="text"
                ref={optionsInputRef}
                placeholder="Press enter to add more option"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addOptions();
                  }
                }}
              />
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
                    disabled={(date) => date > nextWeek() || date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          text="Create Poll"
          loading={createPollMutation.isPending}
          disabled={createPollMutation.isPending}
        />
      </form>
    </Form>
  );
}
