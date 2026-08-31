import React from "react";

export type DashboardRoutesTypes =
  | "/dashboard"
  | "/expenses"
  | "/income"
  | "/categories";

export type NavItemTypes = {
  route: DashboardRoutesTypes;
  label: string;
  icon: React.ReactNode;
};
