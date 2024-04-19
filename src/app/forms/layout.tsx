import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function FormEditLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
}
