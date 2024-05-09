import { getUserForms } from "@/app/actions/getUserForms";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { forms as dbForms } from "@/db/schema";
import FormsList from "@/app/forms/FormsList";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "My Forms",
};

export const revalidate = 0;

export default async function page({}: Props) {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return <FormsList forms={forms} />;
}
