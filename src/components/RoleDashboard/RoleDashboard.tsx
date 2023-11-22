import { Role } from "@/types/role";
import React from "react";
import RolesDashboardContextProvider from "./context/roleDashboardContext";
import RoleTable from "./roleTable";
import SaveButton from "./saveButton";

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

      <div className="mt-12 flex w-full justify-end">
        <SaveButton />
      </div>
    </RolesDashboardContextProvider>
  );
};

export default RoleDashboard;
