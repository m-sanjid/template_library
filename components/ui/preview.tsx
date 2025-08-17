import React from "react";
import { Card } from "./card";

interface PreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
}

export const Preview: React.FC<PreviewProps> = ({ component: Component }) => {
  if (!Component) {
    return (
      <div className="text-muted-foreground text-sm">No preview available</div>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <div className="flex items-center gap-2 border-b p-4">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="p-6">
        <Component />
      </div>
    </Card>
  );
};
