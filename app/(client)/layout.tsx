import React from "react";
import ClientNav from "./_components/nav/clientNav";
import Footer from "@/components/footer";

type Props = {
	children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
	return (
		<div className="min-h-screen">
			<ClientNav />
			<>{children}</>
			<Footer />
		</div>
	);
};

export default ClientLayout;
