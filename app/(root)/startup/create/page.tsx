import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <React.Fragment>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>
      <StartupForm />
    </React.Fragment>
  );
};

export default page;
