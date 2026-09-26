import Layout from "@/components/layout";
import Features from "@/components/sections/home/features";
import Hero from "@/components/sections/home/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { useEmblemTravel } from "@/hooks/use-emblem-travel";
import { useScroll } from "framer-motion";
import { lazy, Suspense, useRef } from "react";

// Lazy load below-the-fold components for code splitting
const CoreFeatures = lazy(() => import("@/components/sections/home/core-features"));
const Integrations = lazy(() => import("@/components/sections/home/integrations"));
const BusinessAccount = lazy(() => import("@/components/sections/home/business-account"));
const MobileApp = lazy(() => import("@/components/sections/home/mobile-app"));
const SecurityCompliance = lazy(() => import("@/components/sections/home/security-compliance"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));

const Home = () => {
  const travelSectionRef = useRef<HTMLDivElement>(null);
  const heroEmblemRef = useRef<HTMLImageElement>(null);
  const cardSlotRef = useRef<HTMLDivElement>(null);

  const emblemTravelActive = false;

  const { scrollYProgress } = useScroll({
    target: travelSectionRef,
    offset: ["start start", "end start"],
  });

  const { originOpacity, cardX, cardY, cardScale, cardOpacity } = useEmblemTravel({
    originRef: heroEmblemRef,
    targetRef: cardSlotRef,
    scrollYProgress,
    active: emblemTravelActive,
  });

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
        <div ref={travelSectionRef}>
          <Hero emblemRef={heroEmblemRef} originOpacity={originOpacity} active={emblemTravelActive} />
          <Features
            cardSlotRef={cardSlotRef}
            cardX={cardX}
            cardY={cardY}
            cardScale={cardScale}
            cardOpacity={cardOpacity}
            active={emblemTravelActive}
          />
        </div>
        <Suspense fallback={null}>
          <Integrations />
        </Suspense>
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
