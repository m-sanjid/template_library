
import { ReactNode, ComponentType } from 'react';

export type ComponentPreviewProps = 
  | { 
      isAnnual?: boolean; 
      setIsAnnual?: (value: boolean) => void; 
      isLoading?: string | null; 
      handleSubscribe?: (plan: string) => void;
    } 
  | { 
      isAuthenticated?: boolean; 
      scrolled?: boolean;
    } 
  | Record<string, any>;

export type FlexibleComponent = ComponentType<ComponentPreviewProps> | 
  ((props: ComponentPreviewProps) => ReactNode);

export interface ComponentDefinition {
  id: string;
  title: string;
  description?: string;
  component?: FlexibleComponent;
  code?: string;
  type?: {
    [key: string]: {
      title: string;
      description?: string;
      component?: FlexibleComponent;
      code?: string;
    }
  };
}