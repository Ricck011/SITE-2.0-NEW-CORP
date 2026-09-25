import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("Erro 404: rota inexistente acessada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center max-w-[377px] mx-auto px-6">
        <h1 className="text-[90px] font-display font-semibold tracking-tighter text-foreground leading-[1.2] mb-2">
          404
        </h1>
        <p className="mb-[60px] text-xl text-muted-foreground">
          Essa página não existe ou mudou de lugar.
        </p>
        <Button asChild>
          <Link to="/">
            Voltar para o início
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
