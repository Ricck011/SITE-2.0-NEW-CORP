import Layout from "@/components/layout";
import CompanyHero from "@/components/sections/company/hero";
import Story from "@/components/sections/company/story";
import SEO from "@/components/seo";
import { SOBRE_LEDE } from "@/content/sobre";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense } from "react";

const Principles = lazy(() => import("@/components/sections/company/principles"));

const Sobre = () => {
  const metaTitle = "Sobre — Quem faz a NEW CORP | Pedro Henrique";
  const metaDescription =
    "Vim de vendas, não de programação. Faço marca, página e sistema para pequenas empresas, sozinho, de Cajamar para toda São Paulo.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": `${appConfig.url}/sobre`,
    "mainEntity": {
      "@type": "Person",
      "name": "Pedro Henrique",
      "jobTitle": "Fundador",
      "worksFor": { "@type": "Organization", "name": appConfig.name },
      "description": SOBRE_LEDE,
    },
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonicalUrl="/sobre"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <CompanyHero />
        <Story />
        <Suspense fallback={null}>
          <Principles />
        </Suspense>
      </Layout>
    </>
  );
};

export default Sobre;
