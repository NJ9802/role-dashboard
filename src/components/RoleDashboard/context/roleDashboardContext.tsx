"use client";

import useRolesConfig from "@/hooks/useRolesConfig";
import { Role } from "@/types/role";
import { createContext } from "react";

interface RolesDashboardContextProviderProps {
  children: React.ReactNode;
  roles: Role[];
  allPermissions: string[];
}

interface IRolesConfigContext {
  rolesState: Role[];
  allPermissionsState: string[];
  entities: string[];
  entitiesWithPermissions: { [key: string]: string[] };
  addNewRole: (newRoleName: string) => void;
  changeAllEntityPermissions: (
    checked: boolean | string,
    entity: string,
  ) => void;
  changeAllPermissions: (checked: boolean | string, permission: string) => void;
  changeAllRolePermissions: (checked: boolean | string, roleId: string) => void;
  deleteEntity: (entity: string) => void;
  deletePermission: (permission: string) => void;
  deleteRole: (roleId: string) => void;
  setAllPermissionsState: React.Dispatch<React.SetStateAction<string[]>>;
}

export const RolesConfigContext = createContext<IRolesConfigContext>({
  rolesState: [],
  allPermissionsState: [],
  entities: [],
  entitiesWithPermissions: {},
  addNewRole: () => {},
  changeAllEntityPermissions: () => {},
  changeAllPermissions: () => {},
  changeAllRolePermissions: () => {},
  deleteEntity: () => {},
  deletePermission: () => {},
  deleteRole: () => {},
  setAllPermissionsState: () => {},
});

const RolesDashboardContextProvider: React.FC<
  RolesDashboardContextProviderProps
> = ({ children, roles, allPermissions }) => {
  const rolesConfig = useRolesConfig(roles, allPermissions);

  return (
    <RolesConfigContext.Provider value={rolesConfig}>
      {children}
    </RolesConfigContext.Provider>
  );
};

export default RolesDashboardContextProvider;
