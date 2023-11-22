"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AddNewPermission from "./addNewPermission/addNewPermission";
import AddNewRole from "./addNewRole";
import EntityColums from "./entityColums";
import PermissionColumns from "./permissionColumns";
import RoleRows from "./roleRows";

interface RoleTableProps {}

const RoleTable: React.FC<RoleTableProps> = ({}) => {
  return (
    <Table className="border-separate border-spacing-0">
      <TableHeader className="sticky top-0 z-20 bg-secondary">
        <TableRow>
          <TableHead
            className="sticky left-0 rounded-tl-xl border border-secondary bg-secondary text-center"
            rowSpan={2}
          >
            Role
          </TableHead>

          <EntityColums />

          <AddNewPermission />
        </TableRow>

        <TableRow>
          <PermissionColumns />
        </TableRow>
      </TableHeader>

      <TableBody className="z-10">
        <RoleRows />
      </TableBody>

      <AddNewRole />
    </Table>
  );
};

export default RoleTable;
