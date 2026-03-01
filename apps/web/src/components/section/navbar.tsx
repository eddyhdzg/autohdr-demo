"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";
import { ArrowUpRight, ExternalLink, Copy, Palette } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Icons } from "../icons";
import { copySvgToClipboard } from "@/lib/brand-utils";

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="md:hidden relative z-50 size-8"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="relative size-5 flex items-center justify-center">
        <motion.span
          className="absolute h-0.5 w-4 bg-foreground"
          initial={false}
          animate={
            isOpen
              ? { rotate: 45, y: 0 }
              : { rotate: 0, y: -4 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute h-0.5 w-4 bg-foreground"
          initial={false}
          animate={
            isOpen
              ? { rotate: -45, y: 0 }
              : { rotate: 0, y: 4 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
      </div>
    </Button>
  );
}

function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {siteConfig.nav.links.map((link) => (
          <NavigationMenuItem key={link.id}>
            {link.disabled ? (
              <span className="border border-transparent text-muted-foreground/50 cursor-not-allowed rounded-none h-8 w-fit inline-flex items-center justify-center px-4 py-2 text-sm font-medium">
                {link.name}
              </span>
            ) : (
              <NavigationMenuLink
                render={<Link href={link.href} />}
                className="border border-transparent hover:border-border text-foreground rounded-none h-8 w-fit px-2 bg-transparent group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              >
                {link.name}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = (url: string) => {
    if (url.includes("#")) return false;
    return pathname === url;
  };

  const sections = siteConfig.footerLinks.filter(
    (s) => s.title !== "Social"
  );
  const social = siteConfig.footerLinks.find(
    (s) => s.title === "Social"
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            style={{ top: "64px" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bottom-0 z-50 w-full bg-background md:hidden overflow-y-auto"
          >
            <div className="flex min-h-full flex-col">
              <nav className="flex-1 px-6 py-4 pb-32">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{
                      opacity: 0,
                      y: -30,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-border py-4"
                  >
                    <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider px-2 mb-2">
                      {section.title}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {section.links.map((link) => (
                        <li key={link.id}>
                          {link.disabled ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled
                              className="w-full justify-start gap-2 rounded-md"
                            >
                              {link.icon}
                              {link.title}
                            </Button>
                          ) : link.external ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              render={
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={onClose}
                                />
                              }
                              className="w-full justify-start gap-2 rounded-md text-foreground"
                            >
                              {link.icon}
                              {link.title}
                              <ArrowUpRight className="size-3 ml-auto" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              render={
                                <Link
                                  href={link.url}
                                  onClick={onClose}
                                />
                              }
                              className={cn(
                                "w-full justify-start gap-2 rounded-md",
                                isActive(link.url)
                                  ? "bg-accent text-accent-foreground ring-1 ring-border"
                                  : "text-foreground"
                              )}
                            >
                              {link.icon}
                              {link.title}
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {social && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -30,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay: sections.length * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="py-4"
                  >
                    <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider px-2 mb-2">
                      {social.title}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {social.links.map((link) => (
                        <li key={link.id}>
                          <Button
                            variant="ghost"
                            size="sm"
                            render={
                              <Link
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                              />
                            }
                            className="w-full justify-start gap-2 rounded-md text-foreground"
                          >
                            {link.icon}
                            {link.title}
                            <ArrowUpRight className="size-3 ml-auto" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </nav>
              <div className="sticky bottom-0 w-full p-6 bg-background border-t border-border">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Button
                    onClick={onClose}
                    className="w-full px-5 py-3 text-sm font-medium"
                  >
                    {siteConfig.cta}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");

    function handleChange(e: MediaQueryListEvent) {
      if (e.matches) setIsMobileMenuOpen(false);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  function handleLogoContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  }

  useEffect(() => {
    if (!showContextMenu) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        setShowContextMenu(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowContextMenu(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showContextMenu]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 xl:px-0">
        <Button
          variant="ghost"
          render={<Link href="/" />}
          className="flex items-center gap-2.5 px-0 py-0 h-auto has-[>svg]:px-0"
          onContextMenu={handleLogoContextMenu}
        >
          <Icons.logo className="w-28 h-6" />
        </Button>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden md:flex px-5 text-sm font-medium">
            {siteConfig.cta}
          </Button>
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {showContextMenu && (
        <div
          ref={contextMenuRef}
          role="menu"
          aria-label="Logo options"
          className="fixed z-[100] border border-border bg-popover shadow-md py-1"
          style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
        >
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 text-left px-3 py-2 text-sm whitespace-nowrap hover:bg-accent transition-colors cursor-pointer"
            onClick={() => {
              window.open("/", "_blank");
              setShowContextMenu(false);
            }}
          >
            <ExternalLink className="size-4 text-muted-foreground" />
            Open Link in New Tab
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 text-left px-3 py-2 text-sm whitespace-nowrap hover:bg-accent transition-colors cursor-pointer"
            onClick={async () => {
              try {
                await copySvgToClipboard("/brand/logo-black.svg");
              } catch {
                // Clipboard API may fail silently
              } finally {
                setShowContextMenu(false);
              }
            }}
          >
            <Copy className="size-4 text-muted-foreground" />
            Copy Logo as SVG
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 text-left px-3 py-2 text-sm whitespace-nowrap hover:bg-accent transition-colors cursor-pointer"
            onClick={() => {
              router.push("/brand");
              setShowContextMenu(false);
            }}
          >
            <Palette className="size-4 text-muted-foreground" />
            Go to Brand Kit
          </button>
        </div>
      )}
    </motion.header>
  );
}
