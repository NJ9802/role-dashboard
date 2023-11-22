import { prisma } from "@/db/prismaClient";
import { Role } from "@/types/role";

export const POST = async (req: Request) => {
  const { newRoles }: { newRoles: Role[] } = await req.json();

  const processedNewRoles = newRoles.map((role) => {
    return { name: role.name, permissions: role.permissions };
  });

  const createdRoles = await prisma.$transaction(
    processedNewRoles.map((role) => prisma.role.create({ data: role })),
  );

  return Response.json({ createdRoles });
};

export const PUT = async (req: Request) => {
  const { roles }: { roles: Role[] } = await req.json();

  const updatedRoles = await prisma.$transaction(
    roles.map((role) =>
      prisma.role.update({
        where: { id: role.id },
        data: { permissions: role.permissions },
      }),
    ),
  );
  return Response.json({ updatedRoles });
};

export const DELETE = async (req: Request) => {
  const { rolesIds }: { rolesIds: string[] } = await req.json();

  const deletedRoutes = await prisma.$transaction(
    rolesIds.map((id) => prisma.role.delete({ where: { id } })),
  );

  return Response.json({ deletedRoutes });
};
