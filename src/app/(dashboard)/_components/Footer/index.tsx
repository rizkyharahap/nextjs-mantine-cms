import React from "react";

import { Text } from "@mantine/core";

import classess from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classess.footer}>
      <Text component="span" c="dimmed" size="xs">
        Copyright © 2024. All rights reserved.
      </Text>
    </footer>
  );
}

export default Footer;
