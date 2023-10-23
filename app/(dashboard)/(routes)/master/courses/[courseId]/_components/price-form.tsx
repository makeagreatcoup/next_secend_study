"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  balance: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseId
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: initialData?.balance || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("修改成功");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("网络异常");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        售价
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>取消</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              修改
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.balance && "text-slate-500 italic"
        )}>
          {initialData.balance
            ? initialData.balance
            : ""
          }
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                保存
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}