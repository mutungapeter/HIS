import React from "react";
import { GoArrowUpRight } from "react-icons/go";



interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  count: string | number;
 
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  title, 
  count,

}) => {
  return (
    <div className="bg-white cursor-pointer rounded-xl p-5 md:p-6 shadow-sm border hover:shadow-lg transition-shadow duration-300 font-nunito">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
        <GoArrowUpRight
                  size={18}
                  className="text-primary cursor-pointer"
                />
          
        </div>

      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-blue-600">
            {icon}
          </div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>
        <h4 className="text-lg font-bold text-gray-800 truncate">{count}</h4>
      </div>


    </div>
  );
};

export default MetricCard;
