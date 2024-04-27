import React from "react";

type Props = {
  value: number;
};

export default function ProgressBar(props: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-primary h-2.5 rounded-md"
        style={{ width: `${props.value}%` }}
      ></div>
    </div>
  );
}
