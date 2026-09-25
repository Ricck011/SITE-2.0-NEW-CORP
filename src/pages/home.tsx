import Layout from "@/components/layout";
import Features from "@/components/sections/home/features";
import Hero from "@/components/sections/home/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense, useRef } from "react";

// Lazy load below-the-fold components for code splitting
const BusinessAccount = lazy(() => import("@/components/sections/home/business-account"));
const CoreFeatures = lazy(() => import("@/components/sections/home/core-features"));
const Integrations = lazy(() => import("@/components/sections/home/integrations"));
const MobileApp = lazy(() => import("@/components/sections/home/mobile-app"));
const SecurityCompliance = lazy(() => import("@/components/sections/home/security-compliance"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const metaTitle = "NEW CORP — Built for the way you work";
  const metaDescription = "NEW CORP is a modern platform that helps you get work done — product overview, pricing, blog, and more.";
  // JSON-LD provisório: nome/descrição em inglês e endereço saem na etapa 7 (SEO).
  // Retirado agora, por regra da marca: preço (offers) e as afirmações de fintech
  // que não são verdade sobre a NEW CORP (PCI DSS, contas de comerciante etc.).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": appConfig.name,
    "description": appConfig.description,
    "url": appConfig.url,
    "logo": appConfig.logo,
    "image": appConfig.ogImage,
    "areaServed": "São Paulo, BR",
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />
      <Layout>
        <Hero heroRef={heroRef} />
        <Features heroRef={heroRef} />
        <Suspense fallback={null}>
          <CoreFeatures />
        </Suspense>
        <Suspense fallback={null}>
          <MobileApp />
        </Suspense>
        <Suspense fallback={null}>
          <BusinessAccount />
        </Suspense>
        <Suspense fallback={null}>
          <Integrations />
        </Suspense>
        <Suspense fallback={null}>
          <SecurityCompliance />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;
