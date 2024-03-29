"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";



type DialogProp = {
    button: React.ReactNode;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    handleOpen: () => void;
    formComponent: React.ReactNode;
};

export const UserModal = ({ modalOpen, setModalOpen, handleOpen, button, formComponent }: DialogProp) => {

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen} >
            <DialogTrigger asChild>
                <div onClick={handleOpen}>
                    {button}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-5 bg-secondary mx-auto">
                {formComponent}
            </DialogContent>
        </Dialog>
    );
};
