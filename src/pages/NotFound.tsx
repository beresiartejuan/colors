import { useLocation, Link } from "wouter";
import { useEffect } from "react";

const NotFound = () => {
  const [location] = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg text-custom-text font-custom">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-custom-text/70 mb-4">
          ¡Vaya! Página no encontrada
        </p>
        <Link href="/">
          <span className="text-custom-primary hover:text-custom-secondary hover:underline cursor-pointer">
            Volver al inicio
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
