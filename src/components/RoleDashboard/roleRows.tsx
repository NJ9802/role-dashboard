"use client";

import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface RoleRowsProps {}

const RoleRows: React.FC<RoleRowsProps> = ({}) => {
  const {
    rolesState,
    changeAllRolePermissions,
    deleteRole,
    allPermissionsState,
  } = useContext(RolesConfigContext);

  return (
    <>
      {rolesState.map((role) => (
        <TableRow key={role.id} className="group">
          <TableCell className="group sticky left-0 border bg-white transition-colors group-hover:bg-muted/50">
            <div className="flex items-center gap-3 pr-4">
              <Checkbox
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

          {allPermissionsState.map((permission) =>
            role.permissions.includes(permission) ? (
              <TableCell
                key={permission}
                className="border text-center font-semibold"
              >
                x
              </TableCell>
            ) : (
              <TableCell
                key={permission}
                className="border text-center"
              ></TableCell>
            ),
          )}
        </TableRow>
      ))}
    </>
  );
};

export default RoleRows;
