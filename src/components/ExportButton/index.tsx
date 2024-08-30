import { forwardRef } from "react";

import {
  Button,
  type ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";

import { PiExport as ExportIcon } from "react-icons/pi";

export type ExportButtonProps = Omit<ButtonProps, "leftSection">;

export const ExportButton = createPolymorphicComponent<
  "button",
  ExportButtonProps
>(
  forwardRef<HTMLButtonElement, ExportButtonProps>(
    function ExportButton(props, ref) {
      return (
        <Button ref={ref} leftSection={<ExportIcon size="1rem" />} {...props} />
      );
    },
  ),
);
