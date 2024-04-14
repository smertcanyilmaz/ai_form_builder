import React, { ChangeEvent } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FieldOptionSelectModel,
  QuestionSelectModel,
} from "@/types/form-types";
import { FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";

type Props = {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldOptionSelectModel>;
  };
  value: string;
  onChange: (value: string | ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({ element, value, onChange }: Props) {
  if (!element) return null;

  const components: any = {
    Input: () => <Input type="text" onChange={onChange} />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option, index) => (
            <SelectItem
              key={`${option.text} ${option.value}`}
              value={`answerId_${option.id}`}
            >
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => (
      <RadioGroup onValueChange={onChange}>
        {element.fieldOptions.map((option, index) => (
          <div
            key={`${option.text} ${option.value}`}
            className="flex items-center space-x-2"
          >
            <FormControl>
              <RadioGroupItem
                value={`answerId_${option.id}`}
                id={option?.value?.toString() || `answerId_${option.id}`}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label className="text-base">{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };
  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
}
