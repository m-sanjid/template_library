// Define paths relative to project root
export const INVOICE_DIR = "./data/invoices";

// Company Information
export const COMPANY_INFO = {
	name: "Template Library",
	address: "123 Business Street, Suite 100, San Francisco, CA 94105",
	email: "support@templatelibrary.com",
	phone: "+1 (555) 123-4567",
	website: "https://templatelibrary.com",
	social: {
		twitter: "https://twitter.com/templatelibrary",
		github: "https://github.com/templatelibrary",
		linkedin: "https://linkedin.com/company/templatelibrary",
	},
};

// Email Configuration
export const EMAIL_CONFIG = {
	from: '"Template Library" <support@templatelibrary.com>',
	subject: "Your Invoice from Template Library",
	text: `Thank you for your purchase from Template Library!

Please find your invoice attached to this email.

Best regards,
The Template Library Team`,
};

// Hero Features for Landing Page
export const HERO_FEATURES = [
	{
		title: "Professional Templates",
		description:
			"Access thousands of professionally designed templates for any purpose",
		icon: "Template",
	},
	{
		title: "Easy Customization",
		description: "Customize templates with our intuitive drag-and-drop editor",
		icon: "Paintbrush",
	},
	{
		title: "Instant Download",
		description:
			"Download your customized templates instantly in multiple formats",
		icon: "Download",
	},
];

// Main Features
export const MAIN_FEATURES = [
	{
		title: "AI-Powered Templates",
		description: "Let AI help you create the perfect template for your needs",
		icon: "Brain",
	},
	{
		title: "Team Collaboration",
		description: "Work together with your team in real-time",
		icon: "Users",
	},
	{
		title: "Version Control",
		description:
			"Track changes and maintain multiple versions of your templates",
		icon: "Git",
	},
	{
		title: "Cloud Storage",
		description: "Access your templates from anywhere, anytime",
		icon: "Cloud",
	},
	{
		title: "Export Options",
		description: "Export in multiple formats including PDF, Word, and HTML",
		icon: "FileOutput",
	},
	{
		title: "Template Analytics",
		description: "Get insights into how your templates are performing",
		icon: "BarChart",
	},
];

export const PRICING = {
	FREE: {
		name: "Free",
		price: 0,
		description: "Best for starting out",
		features: [
			"Access to basic templates",
			"Limited downloads",
			"Community support",
			"Basic customization",
			"1GB storage",
		],
	},
	PRO: {
		name: "Pro",
		price: 29,
		description: "Best for professional devolopers",
		features: [
			"Access to all templates",
			"Unlimited downloads",
			"Priority support",
			"Custom branding",
			"API access",
			"Advanced customization",
			"10GB storage",
			"Team collaboration",
			"Version control",
		],
	},
	ENTERPRISE: {
		name: "Enterprise",
		price: 99,
		description: "Best for large organizations",
		features: [
			"Everything in Pro",
			"Custom templates",
			"Dedicated support",
			"Team collaboration",
			"Advanced analytics",
			"SLA guarantees",
			"Unlimited storage",
			"Custom integrations",
			"Enterprise security",
			"Training sessions",
		],
	},
};

// Template Categories
export const TEMPLATE_CATEGORIES = [
	{
		name: "Business",
		description: "Professional templates for business documents",
		icon: "Briefcase",
		subcategories: ["Proposals", "Invoices", "Reports", "Presentations"],
	},
	{
		name: "Marketing",
		description: "Templates for marketing materials",
		icon: "Megaphone",
		subcategories: ["Social Media", "Email", "Brochures", "Flyers"],
		price:"49",
	},
	{
		name: "Education",
		description: "Templates for educational materials",
		icon: "GraduationCap",
		subcategories: [
			"Lesson Plans",
			"Worksheets",
			"Certificates",
			"Presentations",
		],
		price:"49",
	},
	{
		name: "Personal",
		description: "Templates for personal use",
		icon: "User",
		subcategories: ["Resumes", "Letters", "Cards", "Planners"],
		price:"49",
	},
];

export type TemplateType = {
	name: string;
	description: string;
	icon: string;
	subcategories: string[];
	price?: string|undefined;
}

// Testimonials
export const TESTIMONIALS = [
	{
		name: "Sarah Johnson",
		role: "Designer",
		content:
			"The templates are incredibly well-designed and easy to customize. Saved me hours of work!",
		avatar: "/avatars/sarah.jpg",
	},
	{
		name: "Michael Chen",
		role: "Developer",
		content:
			"The code quality is excellent, and the documentation is comprehensive. Highly recommended!",
		avatar: "/avatars/michael.jpg",
	},
	{
		name: "Emma Davis",
		role: "Content Creator",
		content:
			"Perfect for creating consistent content across all my platforms. Love the variety!",
		avatar: "/avatars/emma.jpg",
	},
];
// Features for comparison
export type FeaturesType = {
	title: string;
	description: string;
	icon: string;
};

export const FEATURES: FeaturesType[] = [
	{	
		title: "Professional Templates",
		description: "Access a wide range of professionally designed templates.",
		icon: "Template",
	},
	{
		title: "Easy Customization",
		description: "Customize templates to match your brand identity.",
		icon: "Paintbrush",
	},
	{
		title: "Fast Downloads",
		description: "Download templates instantly in multiple formats.",
		icon: "Download",
	},
	{
		title: "Regular Updates",
		description: "New templates added regularly to keep your content fresh.",
		icon: "RefreshCw",
	},
	{
		title: "Priority Support",
		description: "Get help when you need it with our priority support.",
		icon: "Headphones",
	},
	{
		title: "API Access",
		description: "Integrate templates directly into your workflow.",
		icon: "Code",
	},
];

// Blog Categories
export const BLOG_CATEGORIES = [
	{
		name: "Design Tips",
		slug: "design-tips",
		description: "Expert advice on creating beautiful templates",
	},
	{
		name: "Tutorials",
		slug: "tutorials",
		description: "Step-by-step guides for using our platform",
	},
	{
		name: "Product Updates",
		slug: "product-updates",
		description: "Latest features and improvements",
	},
	{
		name: "Case Studies",
		slug: "case-studies",
		description: "Success stories from our customers",
	},
];

// Template Preview Features
export const TEMPLATE_PREVIEW_FEATURES = {
	screenshots: [
		{
			title: "Desktop View",
			description: "How your template looks on desktop",
			type: "desktop",
		},
		{
			title: "Tablet View",
			description: "Responsive design for tablets",
			type: "tablet",
		},
		{
			title: "Mobile View",
			description: "Mobile-friendly version",
			type: "mobile",
		},
	],
	features: [
		{
			title: "Live Preview",
			description: "Test the template with your own content",
			icon: "Eye",
		},
		{
			title: "Download Options",
			description: "Multiple formats available",
			icon: "Download",
		},
		{
			title: "Customization",
			description: "Easy to modify and adapt",
			icon: "Settings",
		},
	],
};

// Additional Pages Content
export const ADDITIONAL_PAGES = {
	contact: {
		title: "Get in Touch",
		description:
			"We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
		locations: [
			{
				city: "San Francisco",
				address: "123 Business Street, Suite 100",
				phone: "+1 (555) 123-4567",
			},
			{
				city: "London",
				address: "456 Tech Lane, Floor 3",
				phone: "+44 20 7123 4567",
			},
		],
		supportHours: "Monday to Friday, 9am to 6pm PST",
	},
	about: {
		title: "Our Story",
		description: "Building the future of template creation and management.",
		stats: [
			{ label: "Active Users", value: "100K+" },
			{ label: "Templates Created", value: "1M+" },
			{ label: "Countries", value: "150+" },
			{ label: "Team Members", value: "50+" },
		],
		values: [
			{
				title: "Innovation",
				description: "Constantly pushing the boundaries of what's possible",
			},
			{
				title: "Quality",
				description: "Committed to delivering the highest quality templates",
			},
			{
				title: "Community",
				description: "Building a strong, supportive user community",
			},
		],
	},
	faq: {
		categories: [
			{
				name: "Getting Started",
				questions: [
					{
						question: "How do I create my first template?",
						answer: "Start by clicking the 'Create Template' button...",
					},
					{
						question: "What formats are supported?",
						answer: "We support PDF, DOCX, HTML, and more...",
					},
				],
			},
			{
				name: "Pricing & Plans",
				questions: [
					{
						question: "What's included in the free plan?",
						answer: "The free plan includes basic templates...",
					},
					{
						question: "Can I upgrade or downgrade anytime?",
						answer: "Yes, you can change your plan at any time...",
					},
				],
			},
		],
	},
};
