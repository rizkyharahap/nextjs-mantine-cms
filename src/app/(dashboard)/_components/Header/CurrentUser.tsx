"use client";

import { useRouter } from "next/navigation";
import {
  PiChatDuotone,
  PiGearSixDuotone,
  PiHeartDuotone,
  PiPauseDuotone,
  PiSignOut,
  PiStarDuotone,
  PiTrashDuotone,
  PiUserSwitchDuotone,
} from "react-icons/pi";

import {
  Avatar,
  type AvatarProps,
  type ElementProps,
  Loader,
  Menu,
} from "@mantine/core";

import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";
import { clearSession, logout } from "@/services/auth";

type CurrentUserProps = Omit<AvatarProps, "src" | "alt"> &
  ElementProps<"div", keyof AvatarProps>;

export function CurrentUser(props: CurrentUserProps) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearSession();
      router.push("/login");
    },
  });

  const { name } = useAuth();

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          name={name!}
          style={{ cursor: "pointer", ...props.style }}
          color="initials"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <PiHeartDuotone size="1rem" color="var(--mantine-color-red-6)" />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <PiStarDuotone size="1rem" color="var(--mantine-color-yellow-6)" />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <PiChatDuotone size="1rem" color="var(--mantine-color-blue-6)" />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<PiGearSixDuotone size="1rem" />}>
          Account settings
        </Menu.Item>
        <Menu.Item leftSection={<PiUserSwitchDuotone size="1rem" />}>
          Change account
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<PiPauseDuotone size="1rem" />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item color="red" leftSection={<PiTrashDuotone size="1rem" />}>
          Delete account
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          leftSection={
            isPending ? (
              <Loader color="blue" size="1rem" />
            ) : (
              <PiSignOut size="1rem" />
            )
          }
          disabled={isPending}
          onClick={() => mutate()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
