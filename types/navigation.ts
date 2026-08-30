import React from "react";

export type DashboardRoutesTypes = "/dashboard" | "/expenses";

export type NavItemTypes = {
  route: DashboardRoutesTypes;
  label: string;
  icon: React.ReactNode;
};
