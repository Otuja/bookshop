import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">Settings</h1>
      </div>

      <div className="grid gap-8">
        {/* General Settings */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="siteName" className="text-sm font-medium">Site Name</label>
              <input
                id="siteName"
                defaultValue="UNN Online Bookshop"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="supportEmail" className="text-sm font-medium">Support Email</label>
              <input
                id="supportEmail"
                defaultValue="support@unnbookshop.edu.ng"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Order Emails</label>
                <p className="text-sm text-muted-foreground">Receive emails for new orders.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
            <div className="border-t pt-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Low Stock Alerts</label>
                <p className="text-sm text-muted-foreground">Get notified when inventory is low.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
