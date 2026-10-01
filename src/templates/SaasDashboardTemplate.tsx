import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

const SaasDashboardTemplate = () => {
  const stats = [
    { label: 'Total Users', value: '24,593', change: '+12%', icon: Users, accent: 'primary' as const },
    { label: 'Revenue', value: '$84,230', change: '+8.4%', icon: Wallet, accent: 'secondary' as const },
    { label: 'Active Projects', value: '38', change: '+3', icon: LayoutDashboard, accent: 'accent' as const },
    { label: 'Conversion', value: '4.8%', change: '+1.2%', icon: TrendingUp, accent: 'primary' as const },
  ];

  const transactions = [
    { id: 'TX-4821', customer: 'Acme Corp', date: '2024-05-12', amount: '+$2,400', status: 'Completed' },
    { id: 'TX-4822', customer: 'Bright Labs', date: '2024-05-11', amount: '+$1,150', status: 'Pending' },
    { id: 'TX-4823', customer: 'Designly', date: '2024-05-10', amount: '+$3,200', status: 'Completed' },
    { id: 'TX-4824', customer: 'Nexus Inc', date: '2024-05-09', amount: '+$890', status: 'Failed' },
    { id: 'TX-4825', customer: 'Pixelware', date: '2024-05-08', amount: '+$1,675', status: 'Completed' },
  ];

  const projects = [
    { name: 'Website Redesign', progress: 78, team: 'Design' },
    { name: 'Mobile App v2', progress: 45, team: 'Engineering' },
    { name: 'Marketing Q3', progress: 92, team: 'Growth' },
    { name: 'Internal Tools', progress: 34, team: 'Product' },
  ];

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Users, label: 'Customers' },
    { icon: CreditCard, label: 'Billing' },
    { icon: Settings, label: 'Settings' },
  ];

  const accentClass = (accent: 'primary' | 'secondary' | 'accent') => {
    if (accent === 'primary') return 'bg-custom-primary/10 text-custom-primary';
    if (accent === 'secondary') return 'bg-custom-secondary/10 text-custom-secondary';
    return 'bg-custom-accent/10 text-custom-accent';
  };

  const statusBadge = (status: string) => {
    if (status === 'Completed') return 'bg-custom-accent/15 text-custom-accent';
    if (status === 'Pending') return 'bg-custom-secondary/15 text-custom-secondary';
    return 'bg-destructive/15 text-destructive';
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-custom-border bg-custom-bg/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-custom-primary to-custom-secondary">
              <BarChart3 className="h-5 w-5 text-custom-gradient-contrast" />
            </div>
            <span className="text-lg font-bold text-custom-text">SaasDash</span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" className="text-custom-text/80 hover:bg-custom-primary/10 hover:text-custom-primary">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-custom-text/70 hover:text-custom-text">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="border border-custom-border">
              <AvatarFallback className="bg-custom-primary text-custom-primary-contrast">JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="md:hidden text-custom-text">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-custom-text md:text-3xl">Dashboard Overview</h1>
            <p className="text-custom-text/60">Bienvenido de nuevo, aquí está el resumen de tu cuenta.</p>
          </div>
          <Button className="bg-custom-primary text-custom-primary-contrast hover:opacity-90">
            Download Report <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-custom-border bg-custom-bg/60">
              <CardHeader className="pb-2">
                <CardDescription className="text-custom-text/60">{stat.label}</CardDescription>
                <div className="flex items-end justify-between">
                  <CardTitle className="text-2xl text-custom-text">{stat.value}</CardTitle>
                  <Badge variant="outline" className={`border-0 ${accentClass(stat.accent)}`}>
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`flex h-9 w-9 items-center justify-center rounded-md ${accentClass(stat.accent)}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Projects progress */}
          <Card className="border-custom-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-custom-text">Project Performance</CardTitle>
              <CardDescription className="text-custom-text/60">
                Progreso de los proyectos activos este mes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-custom-text">{project.name}</span>
                      <span className="text-custom-text/60">{project.team}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-custom-border/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-custom-primary to-custom-secondary transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-custom-border" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-custom-border p-4 text-center">
                  <p className="text-2xl font-bold text-custom-text">68%</p>
                  <p className="text-xs text-custom-text/60">Avg. completion</p>
                </div>
                <div className="rounded-lg border border-custom-border p-4 text-center">
                  <p className="text-2xl font-bold text-custom-text">12</p>
                  <p className="text-xs text-custom-text/60">Tasks done</p>
                </div>
                <div className="rounded-lg border border-custom-border p-4 text-center">
                  <p className="text-2xl font-bold text-custom-text">4</p>
                  <p className="text-xs text-custom-text/60">Sprints left</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side summary */}
          <Card className="border-custom-border">
            <CardHeader>
              <CardTitle className="text-custom-text">Quick Stats</CardTitle>
              <CardDescription className="text-custom-text/60">Resumen visual del día.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-custom-text/70">Daily goal</span>
                  <span className="font-medium text-custom-text">84%</span>
                </div>
                <Progress value={84} className="bg-custom-border/40" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-custom-text/70">New signups</span>
                  <span className="font-medium text-custom-text">62%</span>
                </div>
                <Progress value={62} className="bg-custom-border/40" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-custom-text/70">Server load</span>
                  <span className="font-medium text-custom-text">34%</span>
                </div>
                <Progress value={34} className="bg-custom-border/40" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions table */}
        <Card className="mt-6 border-custom-border">
          <CardHeader>
            <CardTitle className="text-custom-text">Recent Transactions</CardTitle>
            <CardDescription className="text-custom-text/60">
              Últimos movimientos registrados en la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-custom-border hover:bg-transparent">
                  <TableHead className="text-custom-text/60">Transaction</TableHead>
                  <TableHead className="text-custom-text/60">Customer</TableHead>
                  <TableHead className="text-custom-text/60">Date</TableHead>
                  <TableHead className="text-custom-text/60">Amount</TableHead>
                  <TableHead className="text-custom-text/60">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-custom-border">
                    <TableCell className="font-medium text-custom-text">{tx.id}</TableCell>
                    <TableCell className="text-custom-text/80">{tx.customer}</TableCell>
                    <TableCell className="text-custom-text/60">{tx.date}</TableCell>
                    <TableCell className="font-medium text-custom-text">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border-0 ${statusBadge(tx.status)}`}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-custom-border py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-sm text-custom-text/60 sm:flex-row">
          <span>© 2024 SaasDash. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-custom-primary cursor-pointer">Privacy</span>
            <span className="hover:text-custom-primary cursor-pointer">Terms</span>
            <LogOut className="h-4 w-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaasDashboardTemplate;
