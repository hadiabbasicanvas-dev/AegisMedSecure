import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-xs text-[#A0A0A0] font-mono py-1">
      <Link to="/dashboard" className="flex items-center hover:text-[#D90429] transition-colors">
        <Home className="h-3.5 w-3.5 mr-1 text-[#707070]" />
        <span>SOC</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = value.toUpperCase().replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight className="h-3 w-3 text-[#707070] shrink-0" />
            {isLast ? (
              <span className="font-bold text-[#D90429]">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-[#F5F5F5] transition-colors">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
