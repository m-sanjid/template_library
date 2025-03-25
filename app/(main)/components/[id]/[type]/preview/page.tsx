"use client";

import { useParams } from 'next/navigation'
import React from 'react'
import { COMPONENTS } from '@/data/components'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ComponentPreviewPage = () => {
  const params = useParams()
  const { id, type } = params
  const component = COMPONENTS.find((item) => item.id === id)

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

  const renderComponent = () => {
    if (type && component.type) {
      // For components with multiple types
      const typeComponent = component.type[type as string]
      return typeComponent?.component ? React.createElement(typeComponent.component) : null
    } else {
      // For simple components
      return component.component ? React.createElement(component.component) : null
    }
  }

  return (
    <div className="min-h-screen bg-background relative flex justify-center items-center">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/components/${id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Component Preview */}
      <div className="pt-16">
        {renderComponent()}
      </div>
    </div>
  )
}

export default ComponentPreviewPage 