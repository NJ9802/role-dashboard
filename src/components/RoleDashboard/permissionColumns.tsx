"use client";

import { formatPermission, formatString } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface PermissionColumnsProps {}

const PermissionColumns: React.FC<PermissionColumnsProps> = ({}) => {
  const {
    entities,
    entitiesWithPermissions,
    changeAllPermissions,
    deletePermission,
  } = useContext(RolesConfigContext);

  return (
    <>
      {entities.map((entity) => {
        return entitiesWithPermissions[entity].map((permission) => (
          <TableHead key={permission} className="group border px-0 text-center">
            <div className="mx-4 flex items-center justify-center gap-3">
              <Checkbox
                className="dashboardHiddenAction"
                onCheckedChange={(checked) =>
                  changeAllPermissions(
                    checked,
                    formatPermission({ entity, permission }),
                  )
                }
              />

              <span>{formatString(permission)}</span>

              <Trash2
                className="dashboardHiddenAction h-4 w-4 shrink-0 cursor-pointer"
                onClick={() =>
                  deletePermission(formatPermission({ entity, permission }))
                }
              />
            </div>
          </TableHead>
        ));
      })}
    </>
  );
};

export default PermissionColumns;
