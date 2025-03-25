import ButtonComponent from "@/components/Button";
import Navbar from "@/components/Navbar";
import Pricing from "./components/pricing/Pricing1";
import Navbar2 from "./components/Navbar1";
import NavbarPreview from "./components/NavbarPreview";
import Pricing2 from "./components/pricing/Pricing2";
import Pricing3 from "./components/pricing/Pricing3";
import Pricing4 from "./components/pricing/Pricing4";

type ComponentType = {
  title: string;
  description: string;
  component: React.ComponentType<any>;
  code: string;
}

type Component = {
  id: string;
  title?: string;
  description?: string;
  component?: React.ComponentType<any>;
  code?: string;
  type?: Record<string, ComponentType>;
}

export const COMPONENTS: Component[] = [
  {
    id: "button1",
    title: "Button 1",
    description: "A custom button component with variants and states",
    code: "<Button>Get Started</Button>",
  },
  {
    id: "button2",
    title: "Button 2",
    code: "<Button>Get Started</Button>",
    component: ButtonComponent,
    description: "A custom button component with variants and states",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "A custom pricing component with variants and states",   
    type: {
      "pricing1": {
        title: "Pricing 1",
        description: "A custom pricing component with variants and states",
        component: Pricing,
        code: `<Pricing />`
      },
      "pricing2": {
        title: "Pricing 2",
        description: "A custom pricing component with variants and states",
        component: Pricing2,
        code: `<Pricing2 />`
      },
      "pricing3": {
        title: "Pricing 3",
        description: "A custom pricing component with variants and states",
        component: Pricing3,
        code: `<Pricing3 />`
      },
      "pricing4": {
        title: "Pricing 4",
        description: "A custom pricing component with variants and states",
        component: Pricing4,
        code: `<Pricing4 />`
      }
    }
  },
  {
    id: "navbar",
    title: "Navbar",
    description: "A custom navbar component with variants and states",
    component: Navbar,
    code: `<Navbar />`
  },
  {
    id: "navbar2",
    title: "Navbar 2",
    description: "A custom navbar component with variants and states",
    component: Navbar2,
    code: `<Navbar2 />`
  },
  {
    id: "navbar3",
    title: "Navbar 3",
    description: "A custom navbar component with variants and states",
    code: `<Navbar3 />`,
    type: {
      "default": {
        title: "Navbar",
        description: "First navbar variant",
        component: Navbar,
        code: `<Navbar />`
      },
      "preview": {
        title: "Navbar Preview",
        description: "Navbar preview with multiple states",
        component: NavbarPreview,
        code: `<NavbarPreview />`
      }
    }
  },
];
