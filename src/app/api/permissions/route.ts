import { prisma } from "@/db/prismaClient";

export const PUT = async (req: Request) => {
  const { updatedPermissions }: { updatedPermissions: string[] } =
    await req.json();

  const permissions = await prisma.permissions.findFirst();

  if (!permissions) {
    return Response.json(
      { error: "There aren't permissions" },
      { status: 500 },
    );
  }

  const updatePermissions = await prisma.permissions.update({
    where: { id: permissions.id },
    data: { permissions: updatedPermissions },
  });

  return Response.json({ updatePermissions });
};
