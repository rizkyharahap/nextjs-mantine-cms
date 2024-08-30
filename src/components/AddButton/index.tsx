import { forwardRef } from "react";

import {
  Button,
  type ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";

import { PiPlus as AddIcon } from "react-icons/pi";

export type AddButtonProps = Omit<ButtonProps, "leftSection">;

export const AddButton = createPolymorphicComponent<"button", AddButtonProps>(
  forwardRef<HTMLButtonElement, AddButtonProps>(function AddButton(props, ref) {
    return (
      <Button ref={ref} leftSection={<AddIcon size="1rem" />} {...props} />
    );
  }),
);
