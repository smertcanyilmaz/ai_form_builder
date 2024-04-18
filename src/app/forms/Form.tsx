"use client";

import {
  FieldOptionSelectModel,
  FormSelectModel,
  QuestionSelectModel,
} from "@/types/form-types";
import React, { useState } from "react";
import {
  Form as FormComponent,
  FormField as ShadcdnFormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { publishForm } from "../actions/mutateForms";
import FormPublishSuccess from "./FormPublishSuccess";

type Props = {
  form: Form;
  editMode?: boolean;
};

type QuestionWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldOptionSelectModel>;
};

interface Form extends FormSelectModel {
  questions: Array<QuestionWithOptionsModel>;
}

export default function Form(props: Props) {
  const form = useForm();
  const [sucesssDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    if (props.editMode) {
      await publishForm(props.form.id);
      setSuccessDialogOpen(true);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-bold py-3">{props.form.name}</h1>
      <h3 className="text-md">{props.form.description}</h3>
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl items-center gap-6 my-4"
        >
          {props.form.questions.map(
            (question: QuestionSelectModel, index: number) => (
              <ShadcdnFormField
                control={form.control}
                name={`question_${question.id}`}
                key={`${question.text}_${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base mt-3">
                      {index + 1}. {question.text}
                    </FormLabel>
                    <FormControl>
                      <FormField
                        element={question}
                        key={index}
                        value={field.value}
                        onchange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          )}
          <Button type="submit">{props.editMode ? "Publish" : "Submit"}</Button>
        </form>
      </FormComponent>
      <FormPublishSuccess
        formId={props.form.id}
        open={sucesssDialogOpen}
        onOpenChange={handleDialogChange}
      />
    </div>
  );
}
