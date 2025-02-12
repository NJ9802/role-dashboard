"use client";

import RoleDashboard from "@/components/RoleDashboard/RoleDashboard";
import RoleDashboardSkeleton from "@/components/RoleDashboard/roleDashboardSkeleton";
import { useGetRoles } from "@/hooks/useGetRoles";
import { Role } from "@/types/role";
import { useMemo } from "react";

const RoleDashboardContainer = () => {
  const { data, isLoading, error } = useGetRoles();
  const permissions = useMemo(() => {
    let permissions: string[] = [];
    data?.map((role: Role) => permissions.push(...role.permissions));
    return Array.from(new Set(permissions));
  }, [data]);

  if (isLoading) {
    return <RoleDashboardSkeleton />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <RoleDashboard roles={data || []} allPermissions={permissions} />
    </>
  );
};

export default RoleDashboardContainer;
