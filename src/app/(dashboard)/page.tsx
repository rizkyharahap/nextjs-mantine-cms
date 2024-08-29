import { Anchor, Text, Title } from "@mantine/core";

import classes from "./Page.module.css";

export default function DashboardPage() {
  return (
    <div className={classes.container}>
      <Title className={classes.title} ta="center">
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup, if you want to
        learn more on Mantine + Next.js integration follow{" "}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>
    </div>
  );
}
