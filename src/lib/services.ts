import { Role } from "@/types/role";

export const createNewRoles = async (newRoles: Role[]) => {
  const res = await fetch("/api/roles", {
    method: "POST",
    body: JSON.stringify({ newRoles }),
  });

  return await res.json();
};

export const updateRoles = async (roles: Role[]) => {
  const res = await fetch("/api/roles", {
    method: "PUT",
    body: JSON.stringify({ roles }),
  });

  return await res.json();
};

export const deleteRoles = async (rolesIds: string[]) => {
  const res = await fetch("/api/roles", {
    method: "DELETE",
    body: JSON.stringify({ rolesIds }),
  });

  return await res.json();
};

export const updatePermissions = async (updatedPermissions: string[]) => {
  const res = await fetch("/api/permissions", {
    method: "PUT",
    body: JSON.stringify({ updatedPermissions }),
  });

  return await res.json();
};
