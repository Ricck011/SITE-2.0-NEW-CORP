import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

// Barra fina no topo do header, acompanha o quanto da página já rolou.
// Some com movimento reduzido — sem mola, direto no valor bruto.
const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary"
      style={{ scaleX: smoothProgress }}
    />
  );
};

export default ScrollProgress;
