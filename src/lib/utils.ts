import { Role } from "@/types/role";
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

export function isPermissionsChanged(
  allPermissionsState: string[],
  initialPermissions: string[],
) {
  return (
    allPermissionsState.toString() !== [...initialPermissions].sort().toString()
  );
}

export const areRolesChanged = (initialRoles: Role[], rolesState: Role[]) => {
  const getNameAndPermissions = (role: Role) => ({
    name: role.name,
    permissions: role.permissions,
  });

  const changed =
    JSON.stringify(rolesState.map(getNameAndPermissions)) !==
    JSON.stringify(initialRoles.map(getNameAndPermissions));

  return changed;
};

export const arePermissionsChanged = (
  initialPermissions: string[],
  allPermissionsState: string[],
) => {
  return (
    [...initialPermissions].sort().toString() !== allPermissionsState.toString()
  );
};

export const checkCheckboxState = (sampleLength: number, total: number) => {
  if (sampleLength === total) {
    return true;
  } else if (sampleLength === 0) {
    return false;
  } else {
    return "indeterminate";
  }
};

export const getPermissionHeaderState = (
  rolesState: Role[],
  permission: string,
) => {
  const rolesWithThisPermission = rolesState.filter((role) =>
    role.permissions.includes(permission),
  );

  return checkCheckboxState(rolesWithThisPermission.length, rolesState.length);
};

export const getEntityHeaderState = ({
  entitiesWithPermissions,
  entity,
  rolesState,
}: {
  entitiesWithPermissions: { [key: string]: string[] };
  entity: string;
  rolesState: Role[];
}) => {
  const entityPermissions = entitiesWithPermissions[entity].map((permission) =>
    formatPermission({ entity, permission }),
  );

  const rolesWithAllEntityPermissions = rolesState.filter((role) => {
    return entityPermissions.every((permission) =>
      role.permissions.includes(permission),
    );
  });

  return checkCheckboxState(
    rolesWithAllEntityPermissions.length,
    rolesState.length,
  );
};
