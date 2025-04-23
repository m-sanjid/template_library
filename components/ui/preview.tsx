import React from 'react';
import { Card } from './card';

interface PreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
}

export const Preview: React.FC<PreviewProps> = ({ component: Component }) => {
  if (!Component) {
    return (
      <div className="text-muted-foreground text-sm">
        No preview available
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-6">
        <Component />
      </div>
    </Card>
  );
}; 