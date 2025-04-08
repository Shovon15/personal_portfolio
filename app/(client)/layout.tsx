import React from "react";
import ClientNav from "./_components/nav/clientNav";
import Footer from "@/components/footer";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <div className="">
      <ClientNav />
      <div className="max-w-screen-2xl mx-auto min-h-[83dvh]">{children}</div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
