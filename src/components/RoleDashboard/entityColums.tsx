"use client";

import { formatString } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface EntityColumsProps {}

const EntityColums: React.FC<EntityColumsProps> = ({}) => {
  const {
    entities,
    entitiesWithPermissions,
    changeAllEntityPermissions,
    deleteEntity,
  } = useContext(RolesConfigContext);

  return (
    <>
      {entities.map((entity) => (
        <TableHead
          key={entity}
          className="group border"
          colSpan={entitiesWithPermissions[entity].length}
        >
          <div className="flex items-center justify-center gap-3">
            <Checkbox
              className="dashboardHiddenAction"
              onCheckedChange={(checked) =>
                changeAllEntityPermissions(checked, entity)
              }
            />

            <span>{formatString(entity)}</span>

            <Trash2
              className="dashboardHiddenAction h-4 w-4 cursor-pointer"
              onClick={() => deleteEntity(entity)}
            />
          </div>
        </TableHead>
      ))}
    </>
  );
};

export default EntityColums;
