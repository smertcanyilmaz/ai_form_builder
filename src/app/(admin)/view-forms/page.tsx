import { getUserForms } from "@/app/actions/getUserForms";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { forms as dbForms } from "@/db/schema";
import FormsList from "@/app/forms/FormsList";

type Props = {};

export default async function page({}: Props) {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return <FormsList forms={forms} />;
}
