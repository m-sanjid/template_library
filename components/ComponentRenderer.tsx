import React, { useEffect, useState } from "react";
import axios from "axios";

interface DynamicComponentLoaderProps {
	codeUrl?: string | null;
}

const DynamicComponentLoader: React.FC<DynamicComponentLoaderProps> = ({
	codeUrl,
}) => {
	const [iframeSrc, setIframeSrc] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchComponent = async () => {
			if (!codeUrl) {
				setError("No code URL provided");
				return;
			}

			try {
				const normalizedUrl = codeUrl
					.replace("https://github.com", "https://raw.githubusercontent.com")
					.replace("/blob/", "/");
				const proxyUrl = `/api/github-proxy?url=${encodeURIComponent(normalizedUrl)}`;

				const response = await axios.get(proxyUrl);
				const code = response.data;

				// Create Blob URL for code
				const blob = new Blob([code], { type: "application/javascript" });
				const blobUrl = URL.createObjectURL(blob);

				// Generate HTML for iframe with Blob URL
				const previewHtml = `
          <!DOCTYPE html>
          <html lang='en'>
          <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css">
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script type="module">
              fetch('${blobUrl}')
                .then(response => response.text())
                .then(code => {
                  const module = new Function('exports', code);
                  const exports = {};
                  module(exports);
                  const Component = exports.default;
                  ReactDOM.render(React.createElement(Component), document.getElementById('root'));
                })
                .catch(error => console.error('Component loading failed:', error));
            </script>

          </head>
          <body>
            <div id='root'></div>
          </body>
          </html>
        `;

				// Convert HTML to Blob URL
				const htmlBlob = new Blob([previewHtml], { type: "text/html" });
				const htmlBlobUrl = URL.createObjectURL(htmlBlob);

				setIframeSrc(htmlBlobUrl);
			} catch (err) {
				console.error("Failed to load component:", err);
				setError(
					"Error loading the component. Please check the console for details.",
				);
			}
		};

		fetchComponent();
	}, [codeUrl]);

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<>
			{iframeSrc ? (
				<iframe
					title="Component Preview"
					src={iframeSrc}
					sandbox="allow-same-origin allow-scripts"
					width="100%"
					height="600px"
					frameBorder="0"
				/>
			) : (
				<div>Loading component...</div>
			)}
		</>
	);
};

export default DynamicComponentLoader;
