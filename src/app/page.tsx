"use client";
import RoleDashboardContainer from "@/containers/RoleDashboardContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  // const roles = await prisma.role.findMany();
  // const permissions = await prisma.permissions.findFirst();
  // const allPermissions = permissions?.permissions;

  return (
    <QueryClientProvider client={queryClient}>
      <RoleDashboardContainer />
    </QueryClientProvider>
  );
}
