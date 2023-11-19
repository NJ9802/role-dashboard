"use client";

import { rolesReducer } from "@/lib/reducers";
import { formatPermission, formatString, parsePermissions } from "@/lib/utils";
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
  const [allPermissionsState, setAllPermissionsState] = useState(
    [...allPermissions].sort(),
  );

  const entitiesWithPermissions = parsePermissions(allPermissionsState);

  const entities = Object.keys(entitiesWithPermissions);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border text-center" rowSpan={2}>
            Role
          </TableHead>

          {entities.map((entity) => (
            <TableHead
              key={entity}
              className="group border text-center"
              colSpan={entitiesWithPermissions[entity].length}
            >
              <div className="flex items-center justify-center gap-3">
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
          {entities.map((entity) => {
            return entitiesWithPermissions[entity].map((permission) => (
              <TableHead key={permission} className="group border  text-center">
                <div className="flex items-center gap-3 pr-4">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      dispatch({
                        type: "change_all_permissions",
                        payload: {
                          checked,
                          permission: formatPermission({ entity, permission }),
                        },
                      });
                    }}
                    className="dashboardHiddenAction"
                  />

                  <span>{formatString(permission)}</span>

                  <Trash2
                    onClick={() => {
                      setAllPermissionsState([
                        ...allPermissionsState.filter(
                          (item) =>
                            item !== formatPermission({ entity, permission }),
                        ),
                      ]);

                      dispatch({
                        type: "delete_permission",
                        payload: {
                          permission: formatPermission({ entity, permission }),
                        },
                      });
                    }}
                    className="dashboardHiddenAction h-4 w-4 cursor-pointer"
                  />
                </div>
              </TableHead>
            ));
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rolesState.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="group border">
              <div className="flex items-center gap-3 pr-4">
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
