"use client";

import { Button, Center, Flex, Text, Title } from "@mantine/core";

import { useRouter } from "nextjs-toploader/app";
import { PiArrowLeft } from "react-icons/pi";

import classes from "./NotFound.module.css";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Flex direction="column" align="flex-start" mih="100vh" p="md">
      <Button
        c="inherit"
        variant="subtle"
        leftSection={<PiArrowLeft size="1rem" />}
        onClick={() => router.push("/")}
      >
        Go back
      </Button>

      <Center className={classes.container}>
        <Title className={classes.title} ta="center">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "orange", to: "blue" }}
          >
            404
          </Text>
        </Title>

        <Title
          component="span"
          c="dark"
          ta="center"
          size="h1"
          fw="bolder"
          mx="auto"
          mt="xl"
        >
          Sorry, the page not found
        </Title>

        <Text
          component="span"
          c="dimmed"
          ta="center"
          size="lg"
          mx="auto"
          mt="xs"
        >
          The link you followed probably broken or the page has been removed
        </Text>
      </Center>
    </Flex>
  );
}
