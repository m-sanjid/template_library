    import { COMPONENTS } from '@/data/components';

export const getPreviewRoutes = (id: string) => {
  const component = COMPONENTS.find(c => c.id === id);
  
  if (!component) return [];

  // If component has multiple types
  if (component.type) {
    return Object.keys(component.type).map(typeKey => ({
      route: `/components/${id}/${typeKey}/preview`,
      title: component.type[typeKey].title,
      description: component.type[typeKey].description
    }));
  }

  // For simple components
  return [{
    route: `/components/${id}/preview`,
    title: component.title,
    description: component.description
  }];
};

export const findComponent = (id: string, type?: string) => {
  const component = COMPONENTS.find(c => c.id === id);
  
  if (!component) return null;

  // If type is specified and component has types
  if (type && component.type) {
    return component.type[type];
  }

  // Return the main component
  return component;
};