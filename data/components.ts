import ButtonComponent from "@/components/Button";
import Navbar from "@/components/Navbar";
import Pricing from "./components/pricing/Pricing1";
import Navbar2 from "./components/Navbar1";
import NavbarPreview from "./components/NavbarPreview";
import Pricing2 from "./components/pricing/Pricing2";
import Pricing3 from "./components/pricing/Pricing3";
import Pricing4 from "./components/pricing/Pricing4";
import FAQ1 from "./components/faq/FAQ1";
import FAQ2 from "./components/faq/FAQ2";
import Navbar1 from "./components/Navbar1";
import Navbar3 from "./components/navbar/Navbar3";
import AuthPage1 from "./components/auth/AuthPage1";
import FAQ3 from "./components/faq/FAQ3";
import FAQ4 from "./components/faq/FAQ4";

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
  },{
    id:"faq",
    title: "FAQ",
    description: "A custom FAQ component with variants and states",
    type: {
      "faq1": {
        title: "FAQ 1",
        description: "A custom FAQ component with variants and states",
        component: FAQ1,
        code: `<FAQ1 />`
      },
      "faq2": {
        title: "FAQ 2",
        description: "A custom FAQ component with variants and states",
        component: FAQ2,
        code: `<FAQ2 />`
      },"faq3": {
        title: "FAQ 3",
        description: "A custom FAQ component with variants and states",
        component: FAQ3,
        code: `<FAQ2 />`
      },"faq4": {
        title: "FAQ 4",
        description: "A custom FAQ component with variants and states",
        component: FAQ4,
        code: `<FAQ4 />`
      }
    }
  },{
    id:"navbar",
    title: "Navbar",
    description: "A custom navbar component with variants and states",
    type: {
      "navbar1": {
        title: "Navbar 1",
        description: "A custom navbar component with variants and states",
        component: Navbar1,
        code: `<Navbar1 />`
      },
      "navbar2": {
        title: "Navbar 2",
        description: "A custom navbar component with variants and states",
        component: Navbar2,
        code: `<Navbar2 />`
      },
      "navbar3": {
        title: "Navbar 3",
        description:"",
        component:Navbar3,
        code:`<NAVBAR/>`
      }  
    }
  },{
    id:"authpage",
    title:"Auth Page",
    description:"Authpage component",
    type: {
      "auth1": {
        title: "AuthPage",
        description: "A custom Auth component with variants and states",
        component: AuthPage1,
        code: `<Navbar1 />`
      },},
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
