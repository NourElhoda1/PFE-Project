import React from 'react';
import Stats from '../../data/dashboard/Stats';

const DashboardStats = () => {
  return (
    <div className="flex gap-4 overflow-x-auto flex-nowrap">
      {Stats.map((Stat, index) => (
        <div key={index} className="flex items-center bg-white rounded-xl shadow-md p-3 min-w-[15rem] h-24">
          <div className="mr-4 p-3 rounded-full bg-info flex items-center justify-center">
            {Stat.icon}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{Stat.title}</h3>
            <p className="text-2xl font-semibold">{Stat.amount}</p>
            {Stat.change && (
              <p className={`text-sm ${Stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {Stat.change}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
