import { baseOptions, linkItems } from "@/lib/layout.shared";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()} links={[...linkItems]} className="[--fd-layout-width:1024px]">
      {children}
    </HomeLayout>
  );
}
