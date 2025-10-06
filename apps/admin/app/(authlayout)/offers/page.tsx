import React from "react";

const page = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Offers Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Offers
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          <p className="mt-2 text-sm text-green-600">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Active Offers
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">856</p>
          <p className="mt-2 text-sm text-green-600">+8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Redeemed Offers
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">2,341</p>
          <p className="mt-2 text-sm text-blue-600">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Conversion Rate
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">23.4%</p>
          <p className="mt-2 text-sm text-red-600">-2% from last month</p>
        </div>
      </div>

      {/* Additional Content Area */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Offers Activity</h2>
        <p className="text-gray-600">
          Offers management content will go here...
        </p>
      </div>
    </div>
  );
};

export default page;
