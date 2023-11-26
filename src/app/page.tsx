import RoleDashboard from "@/components/RoleDashboard/RoleDashboard";
import { prisma } from "@/db/prismaClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const roles = await prisma.role.findMany();
  const permissions = await prisma.permissions.findFirst();
  const allPermissions = permissions?.permissions;

  return (
    <>
      <RoleDashboard roles={roles} allPermissions={allPermissions!} />
    </>
  );
}
