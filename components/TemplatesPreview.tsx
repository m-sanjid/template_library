
import React from 'react'
import Link from 'next/link'
import { TEMPLATE_CATEGORIES, TemplateType } from '@/lib/config'
import { Button } from './ui/button'
import SectionHeader from './SectionHeader'
import { motion } from 'motion/react'
import { Star, Download, Eye, Heart, Share2 } from 'lucide-react'
import { Badge } from './ui/badge'


export const TemplateCard = ({ template, index }: { template: TemplateType, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
                <div className="relative h-[10rem] w-full grid grid-cols-1 md:grid-cols-4 gap-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                    <div className="col-span-1 p-4 z-20">
                        <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{template.description}</p>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-1 p-1">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg" />
                        <div className="bg-gray-400 dark:bg-gray-600 rounded-lg" />
                    </div>
                </div>
            
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            4.8
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            1.2k
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                        </Button>
                    </div>
                    <Button size="sm" className="gap-2">
                        {template.price ? `$${template.price}` : "Download"}
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

const TemplatesPreview = () => {
    return (
        <div className="relative my-20">
            <SectionHeader 
                label='Templates' 
                title='Preview Templates' 
                description='Choose from a variety of templates to get started' 
                gradientText='TEMPLATES' 
                textHeight={70} 
                mdTextHeight={120}
            />
            
            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 gap-6">
                    {TEMPLATE_CATEGORIES.map((template, idx) => (
                        <Link href={`/templates/`} key={idx}>
                            <TemplateCard key={idx} template={template} index={idx} />
                        </Link>
                    ))}
                </div>
                
                <div className="w-full flex justify-center items-center mt-12">
                    <Link href="/templates">
                        <Button
                            size="lg"
                            className="group rounded-full relative overflow-hidden"
                        >
                            <span className="relative z-10">Show More Templates</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TemplatesPreview