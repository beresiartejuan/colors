import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import SiteNav from "@/components/SiteNav";

const NotFound = () => (
  <div className="min-h-screen bg-custom-bg text-custom-text font-custom flex flex-col">
    <SiteNav />
    <main className="flex-1 grid place-items-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold tracking-tight bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-custom-text/70">La ruta que buscas no existe o fue movida.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-custom-primary px-5 py-2.5 text-sm font-medium text-custom-primary-contrast hover:opacity-90"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </main>
  </div>
);

export default NotFound;
