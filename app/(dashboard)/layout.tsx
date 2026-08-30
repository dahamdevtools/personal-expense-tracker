import SideMenu from "@/components/sideMenu";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="w-full max-w-7xl h-screen overflow-hidden flex px-3.5 gap-3.5">
      <SideMenu />
      <main className="flex-1 py-3.5">{children}</main>
    </div>
  );
}
