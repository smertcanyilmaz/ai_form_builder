import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import FormsList from "./forms/FormsList";
import { db } from "@/db";

export default async function Home() {
  const forms = await db.query.forms.findMany();
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <FormGenerator />
        <FormsList forms={forms} />
      </main>
    </SessionProvider>
  );
}
