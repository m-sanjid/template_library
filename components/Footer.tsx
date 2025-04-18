import React from "react";
import { IconBrandGithub, IconBrandX, IconBrandLinkedin, IconMapPin, IconPhone, IconMail } from "@tabler/icons-react";
import Link from "next/link";
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
			{ name: "Community", href: "#community" },
			{ name: "Support", href: "#support" },
		],
		legal: [
			{ name: "Privacy", href: "#privacy" },
			{ name: "Terms", href: "#terms" },
			{ name: "Security", href: "#security" },
			{ name: "Cookies", href: "#cookies" },
		],
	};

	return (
		<footer className="bg-black text-white w-full relative overflow-hidden">
			{/* Background watermark */}
			<div className="absolute inset-0 flex justify-center items-center z-0 opacity-5 overflow-hidden">
				<span className="text-[50px] md:text-[240px] font-extrabold">S UI</span>
			</div>

			<div className="container mx-auto px-4 py-20 z-10 relative">
				{/* Main footer content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Product Links */}
					<div>
						<h3 className="text-lg font-semibold mb-6">Product</h3>
						<ul className="space-y-4">
							{footerLinks.product.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="text-lg font-semibold mb-6">Company</h3>
						<ul className="space-y-4">
							{footerLinks.company.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="text-lg font-semibold mb-6">Resources</h3>
						<ul className="space-y-4">
							{footerLinks.resources.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold mb-6">Contact</h3>
						<ul className="space-y-4">
							<li className="flex items-center gap-3 text-muted-foreground">
								<IconMail className="w-4 h-4" />
								<span>contact@example.com</span>
							</li>
							<li className="flex items-center gap-3 text-muted-foreground">
								<IconPhone className="w-4 h-4" />
								<span>+1 (555) 123-4567</span>
							</li>
							<li className="flex items-center gap-3 text-muted-foreground">
								<IconMapPin className="w-4 h-4" />
								<span>123 Design Street, UI City</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Social Links & Copyright */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border rounded-xl max-w-6xl px-4 mx-auto border-white/10 bg-white/5 backdrop-blur-md">
				<div>
					<Logo label="S UI"/>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-4">
						<Link
							href="#"
							className="w-10 h-10 rounded-md bg-white/5 shadow-inner shadow-white/20 flex items-center justify-center hover:bg-white/10 hover:shadow-2xl hover:shadow-white transition-colors"
						>
							<IconBrandGithub className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							className="w-10 h-10 rounded-md bg-white/5 shadow-inner shadow-white/20 flex items-center justify-center hover:bg-white/10 hover:shadow-2xl hover:shadow-white transition-colors"
						>
							<IconBrandX className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							className="w-10 h-10 rounded-md bg-white/5 shadow-inner shadow-white/20 flex items-center justify-center hover:bg-white/10 hover:shadow-2xl hover:shadow-white transition-colors"
						>
							<IconBrandLinkedin className="w-5 h-5" />
						</Link>
					</div>
					<div className="text-muted-foreground text-sm">
						© 2024 S UI. All rights reserved.
					</div>
				</div>
				</div>
			</div>

			{/* Decorative line */}
			<div className="absolute bottom-[10%] left-0 w-full h-px bg-white opacity-10">
				<div className="absolute left-[10%] -top-1 w-2 h-2 rounded-full bg-white opacity-50"></div>
				<div className="absolute right-[10%] -top-1 w-2 h-2 rounded-full bg-white opacity-50"></div>
			</div>
		</footer>
	);
};

export default Footer;
