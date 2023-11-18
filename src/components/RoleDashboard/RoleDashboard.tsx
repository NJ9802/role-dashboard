"use client";

import { formatString } from "@/lib/utils";
import { Role } from "@/types/role";
import React from "react";
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
  let entitiesWithPermissions: { [key: string]: string[] } = {};

  allPermissions.forEach((permission) => {
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
              {formatString(entity)}
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
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="group border">
              {formatString(role.name)}
            </TableCell>
            {allPermissions.map((permission) =>
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
