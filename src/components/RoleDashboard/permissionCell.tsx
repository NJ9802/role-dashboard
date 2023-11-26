"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { TableCell } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface PermissionCellProps {
  checked: boolean;
  roleId: string;
  permission: string;
}

const PermissionCell: React.FC<PermissionCellProps> = ({
  checked,
  roleId,
  permission,
}) => {
  const { updateRolePermission } = useContext(RolesConfigContext);
  return (
    <TableCell
      onClick={() => updateRolePermission(roleId, permission)}
      className="cursor-pointer border text-center font-semibold transition-colors group-hover:bg-muted/50"
    >
      <AnimatePresence>
        {checked && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, x: 0, y: [null, 10, 0], rotate: 0 },
              hidden: { opacity: 0, x: -10, y: -20, rotate: -180 },
            }}
            exit={{
              opacity: 0,
              y: 20,
              rotate: 90,
              transition: { ease: "easeIn" },
            }}
            transition={{ ease: "easeOut" }}
          >
            x
          </motion.p>
        )}
      </AnimatePresence>
    </TableCell>
  );
};

export default PermissionCell;
