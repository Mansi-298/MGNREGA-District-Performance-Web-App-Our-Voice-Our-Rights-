import { LanguageToggle } from './LanguageToggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-card-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-foreground">MGNREGA Dashboard</h2>
              <p className="text-xs text-muted-foreground">Government of India</p>
            </div>
          </div>
          
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
