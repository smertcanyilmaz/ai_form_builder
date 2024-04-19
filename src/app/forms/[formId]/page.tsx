import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import Form from "@/forms/Form";

type Props = {
  params: {
    formId: string;
  };
};

export default async function page({ params }: Props) {
  const formId = params.formId;

  if (!formId) {
    return <div>Form not found</div>;
  }

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

  if (!form) {
    return <div>Form not found</div>;
  }

  return <Form form={form} />;
}
