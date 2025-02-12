import { ROLE_LIST_QUERY_KEY } from "@/constants/query-keys";
import RoleService from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  return useQuery({
    queryFn: RoleService.getRoles,
    queryKey: [ROLE_LIST_QUERY_KEY],
  });
};
