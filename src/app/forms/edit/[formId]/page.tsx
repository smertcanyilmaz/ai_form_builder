import { auth } from "@/auth";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React, { cache } from "react";
import Form from "../../Form";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

const getForm = cache(async (formId: string) => {
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
  return form;
});

export async function generateStaticParams() {
  const Uforms = await db.query.forms.findMany({
    with: {
      user: true,
    },
  });

  return Uforms.map((form) => form.id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getForm(params.formId);

  return {
    title: form?.name || "Form not found",
  };
}

export default async function page({ params }: Props) {
  const formId = params.formId;

  if (!formId) {
    return <div>Form not found</div>;
  }

  const session = await auth();
  const userId = session?.user?.id;
  const form = await getForm(formId);

  if (userId !== form?.userId) {
    return <div>You are not authorized to view this page</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return <Form form={form} editMode={true} />;
}
