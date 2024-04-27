import React from "react";
import Link from "next/link";
import { getUserForms } from "@/app/actions/getUserForms";
import { MAX_FREE_FROMS } from "@/lib/utils";
import ProgressBar from "../progressBar";
import SubscribeBtn from "@/app/subscription/SubscribeBtn";
import { auth } from "@/auth";
import { getUserSubscription } from "@/app/actions/userSubscriptions";

type Props = {};

export default async function UpdgradeAccBtn(props: Props) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const subscription = await getUserSubscription({ userId });
  if (subscription) {
    return null;
  }
  const forms = await getUserForms();
  const formCount = forms.length;
  const percent = (formCount / MAX_FREE_FROMS) * 100;

  return (
    <div className="p-4 mb-4 text-left text-xs">
      <ProgressBar value={percent} />
      <p className="mt-2">
        {formCount} out of {MAX_FREE_FROMS} forms generated.
      </p>
      <p>
        <SubscribeBtn price="price_1P9e2SDRdzzh1Z4QBMOqsdmD" userId={userId} />{" "}
        for unlimited forms.
      </p>
    </div>
  );
}
