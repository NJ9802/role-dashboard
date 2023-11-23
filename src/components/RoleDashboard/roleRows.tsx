"use client";

import { useCheckboxState } from "@/hooks/useCheckboxState";
import { checkCheckboxState } from "@/lib/utils";
import { Role } from "@/types/role";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface RoleCellProps {
  role: Role;
}

const RoleCell: React.FC<RoleCellProps> = ({ role }) => {
  const { changeAllRolePermissions, deleteRole, allPermissionsState } =
    useContext(RolesConfigContext);

  const checked = useCheckboxState(
    checkCheckboxState(role.permissions.length, allPermissionsState.length),
  );

  return (
    <TableCell className="group sticky left-0 border bg-white px-0 font-semibold transition-colors group-hover:bg-muted">
      <div className="flex items-center justify-center gap-3 px-4">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) =>
            changeAllRolePermissions(checked, role.id)
          }
          className="dashboardHiddenAction"
        />

        <span>{role.name}</span>

        <Trash2
          onClick={() => deleteRole(role.id)}
          className="dashboardHiddenAction h-4 w-4 cursor-pointer"
        />
      </div>
    </TableCell>
  );
};

const RoleRows: React.FC = ({}) => {
  const { rolesState, updateRolePermission, allPermissionsState } =
    useContext(RolesConfigContext);

  return (
    <>
      {rolesState.map((role) => (
        <TableRow key={role.id} className="group">
          <RoleCell role={role} />
          {allPermissionsState.map((permission) =>
            role.permissions.includes(permission) ? (
              <TableCell
                onClick={() => updateRolePermission(role.id, permission)}
                key={permission}
                className="cursor-pointer border text-center font-semibold transition-colors group-hover:bg-muted/50"
              >
                x
              </TableCell>
            ) : (
              <TableCell
                onClick={() => updateRolePermission(role.id, permission)}
                key={permission}
                className="cursor-pointer border transition-colors group-hover:bg-muted/50"
              ></TableCell>
            ),
          )}
          <TableCell className="border bg-border"></TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default RoleRows;
