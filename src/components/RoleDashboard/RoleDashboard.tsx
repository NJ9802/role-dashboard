"use client";

import { rolesReducer } from "@/lib/reducers";
import { formatString } from "@/lib/utils";
import { Role } from "@/types/role";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useImmerReducer } from "use-immer";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface RoleDashboardProps {
  roles: Role[];
  allPermissions: string[];
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({
  roles,
  allPermissions,
}) => {
  const [rolesState, dispatch] = useImmerReducer(rolesReducer, roles);
  const [allPermissionsState, setAllPermissionsState] =
    useState(allPermissions);

  let entitiesWithPermissions: { [key: string]: string[] } = {};

  allPermissionsState.forEach((permission) => {
    const entity = permission.split(":")[0];

    const permitType = permission.split(":")[1];

    if (!entitiesWithPermissions[entity]) {
      entitiesWithPermissions[entity] = [];
    }

    entitiesWithPermissions[entity].push(permitType);
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border text-center" rowSpan={2}>
            Role
          </TableHead>
          {Object.keys(entitiesWithPermissions).map((entity) => (
            <TableHead
              key={entity}
              className="group border text-center"
              colSpan={entitiesWithPermissions[entity].length}
            >
              <div className="flex items-center justify-center gap-4">
                <Checkbox
                  className="dashboardHiddenAction"
                  onCheckedChange={(checked) => {
                    dispatch({
                      type: "change_all_entity_permissions",
                      payload: {
                        entity,
                        checked,
                        allPermissions: allPermissionsState,
                      },
                    });
                  }}
                />
                <span>{formatString(entity)}</span>
                <Trash2
                  onClick={() => {
                    setAllPermissionsState([
                      ...allPermissionsState.filter(
                        (permission) => permission.split(":")[0] !== entity,
                      ),
                    ]);

                    dispatch({
                      type: "delete_entity_permissions",
                      payload: { entity },
                    });
                  }}
                  className="dashboardHiddenAction h-4 w-4 cursor-pointer"
                />
              </div>
            </TableHead>
          ))}
        </TableRow>
        <TableRow>
          {Object.keys(entitiesWithPermissions).map((entity) => {
            return entitiesWithPermissions[entity].map((permission) => (
              <TableHead key={permission} className="border text-center">
                {formatString(permission)}
              </TableHead>
            ));
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rolesState.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="group border">
              <div className="flex items-center gap-4 pr-4">
                <Checkbox
                  onCheckedChange={(checked) => {
                    dispatch({
                      type: "change_all_role_permissions",
                      payload: {
                        roleId: role.id,
                        checked,
                        allPermissions: allPermissionsState,
                      },
                    });
                  }}
                  className="dashboardHiddenAction"
                />
                <span>{formatString(role.name)}</span>
                <Trash2
                  onClick={() => {
                    dispatch({
                      type: "delete_role",
                      payload: {
                        roleId: role.id,
                      },
                    });
                  }}
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
      </TableBody>
    </Table>
  );
};

export default RoleDashboard;
