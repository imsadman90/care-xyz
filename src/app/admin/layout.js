import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }
  return <AdminLayout>{children}</AdminLayout>;
}
