import { siteConfig } from "@/config/site";

// 하단 푸터
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
