import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { COMPONENTS } from '@/data/components';

const ComponentsPage = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Components</h1>
      <p className="text-xl text-muted-foreground">
        A collection of pre-built components for your next project
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {COMPONENTS.map((item, index) => (
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6" key={index}>
            <div>
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <p className="text-muted-foreground mb-6">{item.description}</p>
              <Link href={`/components/${item.id}`}>
                <Button>View Component</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentsPage

