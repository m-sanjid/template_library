"use client";

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { COMPONENTS } from '@/data/components'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Eye, Code, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const TemplateDetailPage = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const component = COMPONENTS.find((item) => item.id === id)

  const handlePreview = (typeKey?: string) => {
    const previewRoute = typeKey 
      ? `/components/${id}/${typeKey}/preview` 
      : `/components/${id}/preview`;
    router.push(previewRoute);
  };

  if (!component) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Component not found</h1>
        <Link href="/components">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Components
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full pb-20">
      {/* Header Section */}
      <div className="mb-8">
        <Link href="/components">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Components
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">{component.title}</h1>
        <p className="text-muted-foreground">{component.description}</p>
      </div>

      {component.type ? (
        // Handling components with multiple types
        Object.entries(component.type).map(([key, value]) => (
          <div key={key} className="mb-12">
            <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xl font-semibold">{value.title}</div>
                  <div className="text-muted-foreground">{value.description}</div>
                </div>
                <Button 
                  onClick={() => handlePreview(key)} 
                  className="gap-2"
                >
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
                  <div className='rounded-lg border bg-card p-6 overflow-hidden'>
                    {value.component ? (
                      React.createElement(value.component)
                    ) : (
                      <pre className="w-full">{value.code}</pre>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-0">
                  <div className="w-full p-4 bg-muted rounded-lg overflow-x-auto">
                    <pre className="text-sm">{value.code}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ))
      ) : (
        // Handling simple components
        <div className="w-full">
          <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xl font-semibold">{component.title}</div>
                <div className="text-muted-foreground">{component.description}</div>
              </div>
              <Button 
                onClick={() => handlePreview()} 
                className="gap-2"
              >
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
                <div className='rounded-lg border bg-card p-6 overflow-hidden'>
                  {component.component ? (
                    React.createElement(component.component)
                  ) : (
                    <pre className="w-full">{component.code}</pre>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="code" className="mt-0">
                <div className="w-full p-4 bg-muted rounded-lg overflow-x-auto">
                  <pre className="text-sm">{component.code}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateDetailPage