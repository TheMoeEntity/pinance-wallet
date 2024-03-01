'use client'
import React, { ReactNode } from "react";
import Header from "./_components/Header";
import { SnackbarProvider } from "notistack";

const Template = ({ children }: { children: ReactNode }) => {
    return (
        <SnackbarProvider
            classes={{ containerRoot: 'z-alert' }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
            <Header />
            {children}
        </SnackbarProvider>
    )
}

export default Template