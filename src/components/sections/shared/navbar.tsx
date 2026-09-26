import { Menu } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ScrollProgress from "@/components/ui/scroll-progress";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/site";
import Container from "../../container";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const scrollRafRef = React.useRef<number | null>(null);

  const handleScroll = React.useCallback(() => {
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      setIsScrolled(window.scrollY > 24);
    });
  }, []);

  React.useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [handleScroll]);

  const closeSheet = React.useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-[padding,background-color,border-color] duration-300",
        isScrolled
          ? "border-b border-border bg-background py-4"
          : "border-b border-transparent pt-6 md:pt-10"
      )}
    >
      <ScrollProgress />
      <Container className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 xl:w-[35%] md:w-[30%] w-fit">
          <img src="/images/marca/newcorp-nc-mark.png" alt="NEW CORP" className="h-8 w-auto" />
        </Link>

        {/* Celular */}
        <div className="flex items-center gap-2 lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className="cursor-pointer lg:hidden text-foreground h-11 w-11 flex items-center justify-center"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-background border-border">
              <div className="h-full flex flex-col">
                <SheetHeader className="flex flex-row items-center border-b border-border pb-4">
                  <Link to="/" onClick={closeSheet} className="flex items-center">
                    <img src="/images/marca/newcorp-nc-mark.png" alt="NEW CORP" className="h-7 w-auto" />
                  </Link>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Links de navegação da NEW CORP</SheetDescription>
                </SheetHeader>
                <div className="px-1 py-6 flex flex-col h-full justify-between flex-1 overflow-y-auto">
                  <nav className="flex flex-col gap-2" aria-label="Navegação principal">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={closeSheet}
                        className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button asChild variant="outline-accent" size="default" className="mt-4 w-full">
                      <Link to="/#contato" onClick={closeSheet}>
                        Começar meu projeto
                      </Link>
                    </Button>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Computador */}
        <NavigationMenu className="hidden lg:block mx-auto">
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link to={link.href} className="px-4 py-2 text-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex gap-2 items-center xl:w-[35%] md:w-[30%] w-fit justify-end">
          <Button asChild variant="outline-accent" size="default">
            <Link to="/#contato">Começar meu projeto</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
