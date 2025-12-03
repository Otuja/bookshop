import { Search, MoreHorizontal } from "lucide-react";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Chinedu Okeke", email: "chinedu.okeke@unn.edu.ng", role: "Student", status: "Active" },
    { id: 2, name: "Prof. C. N. Udanor", email: "c.udanor@unn.edu.ng", role: "Staff", status: "Active" },
    { id: 3, name: "Admin User", email: "admin@unnbookshop.edu.ng", role: "Admin", status: "Active" },
    { id: 4, name: "Amaka Obi", email: "amaka.obi@unn.edu.ng", role: "Student", status: "Inactive" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">User Management</h1>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search users..."
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option>All Roles</option>
          <option>Student</option>
          <option>Staff</option>
          <option>Admin</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-muted/50">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {users.map((user) => (
                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{user.name}</td>
                  <td className="p-4 align-middle">{user.email}</td>
                  <td className="p-4 align-middle">
                    <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <button className="p-2 hover:bg-accent rounded-md transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
