import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  Code2,
  Download,
  Figma,
  Github,
  Globe,
  Linkedin,
  Mail,
  Palette,
  PenTool,
  Send,
  Twitter,
} from 'lucide-react';

const PortfolioTemplate = () => {
  const skills = [
    { name: 'React', icon: Code2 },
    { name: 'TypeScript', icon: Code2 },
    { name: 'UI Design', icon: PenTool },
    { name: 'Figma', icon: Figma },
    { name: 'Tailwind', icon: Palette },
    { name: 'Web Apps', icon: Globe },
  ];

  const projects = [
    { title: 'Fintrack', category: 'Fintech', colorFrom: 'from-custom-primary', colorTo: 'to-custom-secondary' },
    { title: 'Wanderlust', category: 'Travel', colorFrom: 'from-custom-secondary', colorTo: 'to-custom-accent' },
    { title: 'Taskflow', category: 'Productivity', colorFrom: 'from-custom-accent', colorTo: 'to-custom-primary' },
    { title: 'Foodie', category: 'Food delivery', colorFrom: 'from-custom-primary', colorTo: 'to-custom-accent' },
    { title: 'Musicon', category: 'Music', colorFrom: 'from-custom-secondary', colorTo: 'to-custom-primary' },
    { title: 'Mediar', category: 'Healthcare', colorFrom: 'from-custom-accent', colorTo: 'to-custom-secondary' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Mail, label: 'Email' },
  ];

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-custom-border bg-custom-bg/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold text-custom-text">Alex Morgan</div>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#work" className="text-custom-text/80 hover:text-custom-primary">Work</a>
            <a href="#about" className="text-custom-text/80 hover:text-custom-primary">About</a>
            <a href="#contact" className="text-custom-text/80 hover:text-custom-primary">Contact</a>
          </nav>
          <Button variant="outline" className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-primary-contrast">
            <Download className="mr-2 h-4 w-4" /> Resume
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center py-16 text-center md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-custom-primary/5 to-custom-secondary/5" />

          <Avatar className="mb-6 h-28 w-28 border-4 border-custom-border shadow-xl">
            <AvatarImage src="" alt="Alex Morgan" />
            <AvatarFallback className="bg-gradient-to-br from-custom-primary to-custom-secondary text-2xl font-bold text-custom-gradient-contrast">AM</AvatarFallback>
          </Avatar>

          <Badge className="mb-4 bg-custom-secondary/15 text-custom-secondary hover:bg-custom-secondary/15">
            Available for freelance
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Diseñador & desarrollador{' '}
            <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
              digital creativo
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-custom-text/70">
            Construyo experiencias web modernas, accesibles y con atención al detalle.
            Me encanta transformar ideas en productos que la gente disfruta usar.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-custom-primary text-custom-primary-contrast hover:opacity-90">
              Ver proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-custom-border text-custom-text hover:bg-custom-border/30">
              Contactarme
            </Button>
          </div>
        </section>

        <Separator className="bg-custom-border" />

        {/* Projects grid */}
        <section id="work" className="py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-custom-text md:text-4xl">Proyectos destacados</h2>
            <p className="mt-3 text-custom-text/60">Una selección de trabajos recientes.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="group overflow-hidden border-custom-border bg-custom-bg/60 transition-transform hover:-translate-y-1">
                <div className={`h-40 bg-gradient-to-br ${project.colorFrom} ${project.colorTo} transition-opacity group-hover:opacity-90`} />
                <CardContent className="p-5">
                  <p className="text-xs font-medium text-custom-primary uppercase tracking-wide">{project.category}</p>
                  <h3 className="mt-1 text-xl font-semibold text-custom-text">{project.title}</h3>
                  <p className="mt-2 text-sm text-custom-text/60">
                    Proyecto personal construido con React, TypeScript y Tailwind CSS.
                  </p>
                  <Button variant="link" className="mt-3 h-auto p-0 text-custom-primary">
                    Ver caso de estudio <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-custom-border" />

        {/* About */}
        <section id="about" className="py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-custom-primary/20 to-custom-secondary/20 p-8 md:p-12">
              <div className="flex h-64 items-center justify-center rounded-xl bg-custom-bg/60 shadow-lg">
                <PenTool className="h-24 w-24 text-custom-primary" />
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-custom-primary/10 text-custom-primary hover:bg-custom-primary/10">
                Sobre mí
              </Badge>
              <h2 className="text-3xl font-bold text-custom-text md:text-4xl">Mezclo diseño y código.</h2>
              <p className="mt-4 text-custom-text/70">
                Llevo más de 5 años creando productos digitales. Disfruto cada parte del proceso:
                desde la exploración visual hasta la implementación final. Creo en los sistemas de diseño,
                la accesibilidad y el rendimiento.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 rounded-lg border border-custom-border p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-custom-secondary/15">
                      <skill.icon className="h-4 w-4 text-custom-secondary-contrast" />
                    </div>
                    <span className="text-sm font-medium text-custom-text">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="bg-custom-border" />

        {/* Contact */}
        <section id="contact" className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-custom-text md:text-4xl">Hablemos</h2>
            <p className="mt-3 text-custom-text/60">
              ¿Tienes un proyecto en mente? Envíame un mensaje y lo conversamos.
            </p>
          </div>

          <Card className="mx-auto mt-10 max-w-xl border-custom-border">
            <CardContent className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-custom-text">Nombre</label>
                  <Input placeholder="Tu nombre" className="border-custom-border bg-custom-bg text-custom-text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-custom-text">Email</label>
                  <Input type="email" placeholder="hola@email.com" className="border-custom-border bg-custom-bg text-custom-text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-custom-text">Mensaje</label>
                <Textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  className="border-custom-border bg-custom-bg text-custom-text"
                />
              </div>
              <Button className="w-full bg-custom-primary text-custom-primary-contrast hover:opacity-90">
                Enviar mensaje <Send className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-custom-border py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <span className="text-sm text-custom-text/60">© {new Date().getFullYear()} Alex Morgan. Hecho con pasión.</span>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="text-custom-text/60 hover:bg-custom-primary/10 hover:text-custom-primary"
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;
