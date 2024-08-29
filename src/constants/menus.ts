import { type ElementType } from "react";
import {
  PiChartLineUpDuotone,
  PiChatCenteredDotsDuotone,
  PiKanbanDuotone,
  PiLockKeyDuotone,
  PiShieldCheckDuotone,
  PiSquaresFourDuotone,
  PiStarDuotone,
  PiTableDuotone,
  PiUserPlusDuotone,
  PiUsersDuotone,
} from "react-icons/pi";

import { routes } from "./routes";

interface MenuItem {
  header: string;
  section: {
    name: string;
    href: string;
    icon: ElementType;
    dropdownItems?: {
      name: string;
      href: string;
      badge?: string;
    }[];
  }[];
}

export const menus: MenuItem[] = [
  {
    header: "Overview",
    section: [
      {
        name: "Welcome",
        href: routes.dashboard.root,
        icon: PiStarDuotone,
      },
    ],
  },

  {
    header: "Apps",
    section: [
      {
        name: "Kanban",
        href: routes.dashboard.kanban,
        icon: PiKanbanDuotone,
      },
    ],
  },

  {
    header: "Management",
    section: [
      {
        name: "Customers",
        icon: PiUsersDuotone,
        href: routes.dashboard.customers.root,
        dropdownItems: [
          {
            name: "List",
            href: routes.dashboard.customers.list,
          },
        ],
      },
    ],
  },

  {
    header: "Widgets",
    section: [
      {
        name: "Charts",
        href: routes.dashboard.charts,
        icon: PiChartLineUpDuotone,
      },
      {
        name: "Metrics",
        href: routes.dashboard.metrics,
        icon: PiSquaresFourDuotone,
      },
      {
        name: "Tables",
        href: routes.dashboard.tables,
        icon: PiTableDuotone,
      },
    ],
  },

  {
    header: "Authentication",
    section: [
      {
        name: "Register",
        href: routes.auth.register,
        icon: PiUserPlusDuotone,
      },
      {
        name: "Login",
        href: routes.auth.login,
        icon: PiShieldCheckDuotone,
      },
      {
        name: "Forgot Password",
        href: routes.auth.forgotPassword,
        icon: PiLockKeyDuotone,
      },
      {
        name: "OTP",
        href: routes.auth.otp,
        icon: PiChatCenteredDotsDuotone,
      },
    ],
  },
];
