import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {};

export default function page({}: Props) {
  return (
    <Alert variant="default">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your answers were recorded successfully. Thank you for submitting the
        form!{" "}
      </AlertDescription>
    </Alert>
  );
}
