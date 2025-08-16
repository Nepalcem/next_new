import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6 space-y-6">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {session.user?.name?.charAt(0).toUpperCase() ||
                session.user?.email?.charAt(0).toUpperCase() ||
                "U"}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {session.user?.name || "No Name Set"}
            </h1>
            <p className="text-gray-600">{session.user?.email}</p>
            {session.user?.role && (
              <p className="text-sm text-gray-500 capitalize">
                Role: {session.user.role}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Session Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {session.user?.id || "Not available"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {session.user?.email || "Not available"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {session.user?.name || "Not set"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                "No image"
              )}
            </p>
          </div>
          {session.user?.role && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-1 text-sm text-gray-900 capitalize">
                {session.user.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Session Data (for debugging) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Full Session Data
        </h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
