import RoleDashboard from "@/components/RoleDashboard/RoleDashboard";
import { prisma } from "@/db/prismaClient";

export default async function Home() {
  const roles = await prisma.role.findMany();
  const permissions = await prisma.permissions.findFirst();
  const allPermissions = permissions?.permissions;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <RoleDashboard roles={roles} allPermissions={allPermissions!} />
    </main>
  );
}
