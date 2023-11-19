import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(string: string) {
  const formattedString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return formattedString.replaceAll("_", " ");
}

export function parsePermissions(permissions: string[]) {
  let entitiesWithPermissions: { [key: string]: string[] } = {};

  permissions.forEach((permission) => {
    const [entity, permitType] = permission.split(":");

    if (!entitiesWithPermissions[entity]) {
      entitiesWithPermissions[entity] = [];
    }

    entitiesWithPermissions[entity].push(permitType);
  });

  return entitiesWithPermissions;
}

export function formatPermission({
  entity,
  permission,
}: {
  entity: string;
  permission: string;
}) {
  return `${entity}:${permission}`;
}
