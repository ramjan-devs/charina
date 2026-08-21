'use client';

import { Sparkles } from 'lucide-react';
import UserDropdown from './UserDropdown/UserDropdown';
import DynamicActionButton from '../../../DynamicActionButton/DynamicActionButton';

function RightSection() {
  return (
    <div className="flex items-center gap-3">
      <DynamicActionButton
        label="Ask AI"
        icon={Sparkles}
        showIcon
        className="bg-primary hover:bg-primary/90 rounded-md border-none px-4 text-white"
      />

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
}

export default RightSection;
