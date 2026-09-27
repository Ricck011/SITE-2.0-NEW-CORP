import Layout from "@/components/layout";
import Features from "@/components/sections/home/features";
import Hero from "@/components/sections/home/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense } from "react";

// Lazy load below-the-fold components for code splitting
const Integrations = lazy(() => import("@/components/sections/home/integrations"));
const BusinessAccount = lazy(() => import("@/components/sections/home/business-account"));
const SecurityCompliance = lazy(() => import("@/components/sections/home/security-compliance"));
const Assistant = lazy(() => import("@/components/sections/home/assistant"));
const Quiz = lazy(() => import("@/components/sections/home/quiz"));

const Home = () => {
  const metaTitle = "NEW CORP — Arte que chama. Sistema que sustenta.";
  const metaDescription =
    "Identidade visual, landing page e sistema de gestão para pequenas empresas que ainda não existem no digital. Entrega em até 10 dias úteis. Cajamar, atendo SP.";
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
        <Hero />
        <Features />
        <Suspense fallback={null}>
          <Integrations />
        </Suspense>
        <Suspense fallback={null}>
          <BusinessAccount />
        </Suspense>
        <Suspense fallback={null}>
          <SecurityCompliance />
        </Suspense>
        <Suspense fallback={null}>
          <Assistant />
        </Suspense>
        <Suspense fallback={null}>
          <Quiz />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;
