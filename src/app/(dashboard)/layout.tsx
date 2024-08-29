import { type Metadata } from "next";

import { Paper, ScrollArea } from "@mantine/core";

import { Logo } from "@/components/Logo";
import { AuthProvider } from "@/providers/AuthProvider";

import Footer from "./_components/Footer";
import { Header } from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import classes from "./Layout.module.css";

export const metadata: Metadata = {
  title: "Teman Dokter CMS",
  description: "Teman Dokter CMS",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className={classes.root}>
        <Paper className={classes.sidebarWrapper} withBorder>
          <div className={classes.logoWrapper}>
            <Logo w="3rem" />
          </div>
          <ScrollArea flex="1" px="md">
            <Sidebar />
          </ScrollArea>
        </Paper>
        <div className={classes.content}>
          <Header />
          <main className={classes.main}>{children}</main>

          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}
