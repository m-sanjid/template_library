import React from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "next-view-transitions";
import Logo from "./Logo";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Components", href: "/components" },
      { name: "Templates", href: "/templates" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Cookies", href: "#cookies" },
    ],
  };

  return (
    <footer className="to-secondary/5 relative w-full overflow-hidden border-t bg-gradient-to-b from-neutral-300 text-black dark:from-black dark:text-white">
      {/* Background watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-5">
        <span className="text-[50px] font-extrabold md:text-[240px]">S UI</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        {/* Main footer content */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Product Links */}
          <div>
            <h3 className="mb-6 font-medium">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 font-medium">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-6 font-medium">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 font-medium">Contact</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li className="text-muted-foreground flex items-center gap-3">
                <IconMail className="h-4 w-4" />
                <span>contact@example.com</span>
              </li>
              <li className="text-muted-foreground flex items-center gap-3">
                <IconPhone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-muted-foreground flex items-center gap-3">
                <IconMapPin className="h-4 w-4" />
                <span>123 Design Street, UI City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="bg-accent mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-xl border px-4 py-2 backdrop-blur-md md:flex-row">
          <div>
            <Logo label="S UI" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/5 shadow-inner shadow-black/20 transition-colors hover:bg-white/10 hover:shadow-2xl hover:shadow-white dark:bg-white/5 dark:shadow-white/20"
              >
                <IconBrandGithub className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/5 shadow-inner shadow-black/20 transition-colors hover:bg-white/10 hover:shadow-2xl hover:shadow-white dark:bg-white/5 dark:shadow-white/20"
              >
                <IconBrandX className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/5 shadow-inner shadow-black/20 transition-colors hover:bg-white/10 hover:shadow-2xl hover:shadow-white dark:bg-white/5 dark:shadow-white/20"
              >
                <IconBrandLinkedin className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 S UI. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-[10%] left-0 h-px w-full bg-black opacity-10 dark:bg-white">
        <div className="absolute -top-1 left-[10%] h-2 w-2 rounded-full bg-black opacity-50 dark:bg-white"></div>
        <div className="absolute -top-1 right-[10%] h-2 w-2 rounded-full bg-black opacity-50 dark:bg-white"></div>
      </div>
    </footer>
  );
};

export default Footer;
