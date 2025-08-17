"use client";

import { useParams } from "next/navigation";
import React from "react";
import { COMPONENTS } from "@/data/components";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

const ComponentPreviewPage = () => {
  const params = useParams();
  const { id, type } = params;
  const component = COMPONENTS.find((item) => item.id === id);

  if (!component) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Component not found</h1>
        <Link href="/components">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Components
          </Button>
        </Link>
      </div>
    );
  }

  const renderComponent = () => {
    if (type && component.type) {
      // For components with multiple types
      const typeComponent = component.type[type as string];
      return typeComponent?.component
        ? React.createElement(typeComponent.component)
        : null;
    } else {
      // For simple components
      return component.component
        ? React.createElement(component.component)
        : null;
    }
  };

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href={`/components/${id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Component Preview */}
      <div className="min-h-screen w-full pt-16">{renderComponent()}</div>
    </div>
  );
};

export default ComponentPreviewPage;
