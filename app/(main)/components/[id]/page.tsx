"use client";

import { useParams, useRouter } from "next/navigation";
import React, { JSX } from "react";
import { COMPONENTS } from "@/data/components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Code,
  ArrowLeft,
  ShoppingCart,
  Star,
  Download,
  Heart,
  Share2,
} from "lucide-react";
import { Link } from "next-view-transitions";
import PricingPage from "@/app/(out)/pricing/page";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnimatedButton } from "@/components/AnimatedButton";
import type { COMPONENT_TYPE } from "@/data/components";

interface Component {
  id: string;
  title?: string;
  description?: string;
  component?: React.ComponentType<COMPONENT_TYPE>;
  code?: string;
  type?: Record<string, COMPONENT_TYPE>;
  tags?: string[];
}

const ComponentDetailPage = (): JSX.Element => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const component = COMPONENTS.find((item) => item.id === id) as
    | Component
    | undefined;
  const { addToCart } = useCart();

  const handlePreview = (typeKey?: string) => {
    const previewRoute = typeKey
      ? `/components/${id}/${typeKey}/preview`
      : `/components/${id}/preview`;
    router.push(previewRoute);
  };

  const handleAddToCart = () => {
    if (!component) return;

    addToCart({
      name: component.title || "",
      description: component.description || "",
      price: 29, // You can set a default price or get it from the component data
      quantity: 1,
    });
    toast.success("Added to cart", {
      description: `${component.title} has been added to your cart.`,
    });
  };

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

  return (
    <div className="w-full pb-20">
      {/* Header Section */}
      <Link
        href="/components"
        className="bg-accent fixed top-20 rounded-full p-2"
      >
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Components
        </Button>
      </Link>
      <div className="mt-24 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{component?.title}</h1>
            <p className="text-muted-foreground mb-4">
              {component?.description}
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                4.8
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                1.2k
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button onClick={handleAddToCart} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart - $29
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {component.type ? (
          // Handling components with multiple types
          Object.entries(component.type).map(([key, value]) => (
            <div key={key} className="mb-12">
              <div className="bg-card w-full rounded-lg border p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold">{value.title}</div>
                    <div className="text-muted-foreground">
                      {value.description}
                    </div>
                  </div>
                  <Button onClick={() => handlePreview(key)} className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="gap-2">
                      <Code className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-0">
                    <div className="bg-card overflow-hidden rounded-lg border p-6">
                      {value.component ? (
                        React.createElement(value.component)
                      ) : (
                        <pre className="w-full">{value.code}</pre>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-0">
                    <div className="bg-muted w-full overflow-x-auto rounded-lg p-4">
                      <PricingPage />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ))
        ) : (
          // Handling simple components
          <div className="w-full">
            <div className="bg-card w-full rounded-lg border p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">{component.title}</div>
                  <div className="text-muted-foreground">
                    {component.description}
                  </div>
                </div>
                <AnimatedButton
                  className="bg-primary text-secondary rounded-full p-2"
                  label="Preview"
                  onClick={() => handlePreview()}
                  logo={<Eye className="h-5 w-5" />}
                />
              </div>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2">
                    <Code className="h-4 w-4" />
                    Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-0">
                  <div className="bg-card overflow-hidden rounded-lg border p-6">
                    {component.component ? (
                      React.createElement(component.component)
                    ) : (
                      <pre className="w-full">{component.code}</pre>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-0">
                  <div className="bg-muted w-full overflow-x-auto rounded-lg p-4">
                    <PricingPage />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Component Tags</h3>
          <div className="flex flex-wrap gap-2">
            {component?.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            )) || (
              <div className="text-muted-foreground">
                No tags available for this component.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Eye className="h-4 w-4" />
              Preview Component
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Code className="h-4 w-4" />
              View Code
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentDetailPage;
