import React from "react";

type Props = {
    children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    );
};

export default ClientLayout;
