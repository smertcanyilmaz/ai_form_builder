import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import Form from "../../Form";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

const formArr: Array<any> = [];

export const formInfo = async ({ params }: Props) => {
  "use server";
  const formId = params.formId;
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
    },
  });
  formArr.push(form);
  return form;
};

// const formArr: Array<any> = [];

let formName: any = "";

export const metadata: Metadata = {
  title: `${formArr[0]?.name}`,
};

export default async function page({ params }: Props) {
  const formId = params.formId;
  const form = await formInfo({ params });

  if (!formId) {
    return <div>Form not found</div>;
  }

  const session = await auth();
  const userId = session?.user?.id;
  // const form = await db.query.forms.findFirst({
  //   where: eq(forms.id, parseInt(formId)),
  //   with: {
  //     questions: {
  //       with: {
  //         fieldOptions: true,
  //       },
  //     },
  //   },
  // });

  if (userId !== form?.userId) {
    return <div>You are not authorized to view this page</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return <Form form={form} editMode={true} />;
}
