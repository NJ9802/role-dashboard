import { Role } from "@/types/role";
import React from "react";
import RolesDashboardContextProvider from "./context/roleDashboardContext";
import RoleTable from "./roleTable";

interface RoleDashboardProps {
  roles: Role[];
  allPermissions: string[];
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({
  roles,
  allPermissions,
}) => {
  return (
    <RolesDashboardContextProvider
      roles={roles}
      allPermissions={allPermissions}
    >
      <RoleTable />
    </RolesDashboardContextProvider>
  );
};

export default RoleDashboard;
