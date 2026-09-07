import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteName = "PREP'D";
const defaultDescription =
  "PREP'D student essentials and curated boxes to help you start strong.";

const pageMetadata = {
  "/": {
    title: "PREP'D | Student essentials",
    description: defaultDescription,
  },
  "/shop": {
    title: "Shop student essentials | PREP'D",
    description:
      "Shop curated PREP'D boxes and everyday student essentials for a prepared semester.",
  },
  "/about": {
    title: "About PREP'D",
    description:
      "Learn how PREP'D helps students feel prepared, organized, and ready for what comes next.",
  },
};

function setMeta(name, content, attribute = "name") {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] || {
      title: `${siteName} | Student essentials`,
      description: defaultDescription,
    };
    const canonicalUrl = `${window.location.origin}${pathname}`;

    document.title = metadata.title;
    setMeta("description", metadata.description);
    setMeta("og:title", metadata.title, "property");
    setMeta("og:description", metadata.description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:title", metadata.title);
    setMeta("twitter:description", metadata.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  return null;
}