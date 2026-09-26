import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Servicos from "./pages/servicos";
import Sobre from "./pages/sobre";
import NotFound from "./pages/not-found";
import ScrollManager from "./components/scroll-manager";
import { AssistantChatProvider } from "./hooks/use-assistant-chat";

const App = () => (
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AssistantChatProvider>
            <ScrollManager />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AssistantChatProvider>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
