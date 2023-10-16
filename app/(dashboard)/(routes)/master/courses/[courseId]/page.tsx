import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { Actions } from "./_components/actions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && <Banner label="该项目未完成" />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-[600]">项目设置</h1>
            <span className="text-sm text-slate-700">
              完成所有内容{completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="flex items-center gap-x-2 mt-4">
          <IconBadge icon={LayoutDashboard} size="base" />
          <h2 className="text-xl">填写内容</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />

            <ImageForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => {
                return { value: category.id, label: category.name };
              })}
            />
            <ChaptersForm initialData={course} courseId={course.id} />

            <PriceForm initialData={course} courseId={course.id} />

            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
