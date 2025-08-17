import { COMPONENTS } from "@/data/components";

export const getPreviewRoutes = (id: string) => {
  const component = COMPONENTS.find((c) => c.id === id);

  if (!component) return [];

  // If component has multiple types
  if (component?.type) {
    const types = component.type;
    return Object.keys(types).map((typeKey) => ({
      route: `/components/${id}/${typeKey}/preview`,
      title: types[typeKey].title,
      description: types[typeKey].description,
    }));
  }

  // For simple components
  return [
    {
      route: `/components/${id}/preview`,
      title: component.title,
      description: component.description,
    },
  ];
};

export const findComponent = (id: string, type?: string) => {
  const component = COMPONENTS.find((c) => c.id === id);

  if (!component) return null;

  // If type is specified and component has types
  if (type && component.type) {
    return component.type[type];
  }

  // Return the main component
  return component;
};
