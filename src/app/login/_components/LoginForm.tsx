import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  type StackProps,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth";

interface LoginFormProps extends Omit<StackProps, "children"> {}

export const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(LoginBodySchema),
    initialValues: {
      email: "john.doe@example.com",
      password: "123456789",
      remember: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("expired_at", res.expired_at);

      localStorage.setItem(
        "profile",
        JSON.stringify({
          name: res.name,
          email: res.email,
        }),
      );

      router.replace("/");
    },
  });

  const handleSubmit = form.onSubmit((variables) => mutate(variables));

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack {...props}>
        <TextInput
          name="email"
          label="Email"
          required
          {...form.getInputProps("email", { type: "checkbox" })}
        />
        <PasswordInput
          name="password"
          label="Password"
          required
          {...form.getInputProps("password", { type: "checkbox" })}
        />
        <Group justify="space-between">
          <Checkbox
            name="remember"
            label="Remember me"
            {...form.getInputProps("remember", { type: "checkbox" })}
          />
        </Group>
        <Button type="submit" loading={isPending}>
          Login
        </Button>
      </Stack>
    </Box>
  );
}
