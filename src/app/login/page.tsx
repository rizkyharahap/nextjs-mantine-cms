"use client";

import { useLayoutEffect } from "react";

import { redirect } from "next/navigation";

import { Stack, Text, Title } from "@mantine/core";

import { UnderlineShape } from "@/components/UnderlineShape";
import { checkSession } from "@/services/auth";

import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  useLayoutEffect(() => {
    if (checkSession()) {
      redirect("/");
    }
  }, []);

  return (
    <Stack gap="xl">
      <Stack>
        <Title order={2}>
          Welcome back! Please{" "}
          <Text fz="inherit" fw="inherit" component="span" pos="relative">
            Sign in
            <UnderlineShape
              c="blue"
              left="0"
              pos="absolute"
              h="0.625rem"
              bottom="-1rem"
              w="7rem"
            />
          </Text>{" "}
          to continue.
        </Title>
        <Text fz="sm" c="dimmed">
          By signing up, you will gain access to exclusive content, special
          offers, and be the first to hear about exciting news and updates.
        </Text>
      </Stack>

      <LoginForm />
    </Stack>
  );
}
