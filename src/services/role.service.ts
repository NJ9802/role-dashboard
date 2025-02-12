import { ApiClientService } from "@/lib/ApiClientService";
import { API_URL } from "@/settings/global";
import { Role } from "@/types/role";

class RoleService {
  private url: string;

  constructor(path: string) {
    this.url = `${API_URL}${path}`;
  }

  getPath = (path?: string): string => {
    return `${this.url}${path || ""}`;
  };

  getRoles = async () => {
    return ApiClientService.get(this.getPath());
  };

  createRole = async (data: Role) =>
    ApiClientService.post(this.getPath(), data);

  deleteRole = async (id: string) =>
    ApiClientService.delete(this.getPath(`/${id}`));

  updateRolePermissions = async (id: string, permissions: string[]) =>
    ApiClientService.patch(this.getPath(`/update-permissions/${id}`), {
      permissions,
    });

  bulkSaveAndUpdate = async (data: {roles: Role[]}) => 
    ApiClientService.post(this.getPath("/update"), data);
}

const roleService = new RoleService("/role");
export default roleService;
