"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
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
            <div className="flex h-full flex-col">
              <nav className="flex-1 px-6 py-4 pb-32">
                {(() => {
                  const sections = siteConfig.footerLinks.filter(
                    (s) => s.title !== "Social"
                  );
                  const social = siteConfig.footerLinks.find(
                    (s) => s.title === "Social"
                  );
                  return (
                    <>
                      <Accordion
                        defaultValue={[0]}
                        className="w-full"
                      >
                        {sections.map((section, index) => (
                          <motion.div
                            key={section.title}
                            initial={{
                              opacity: 0,
                              y: -30,
                              filter: "blur(10px)",
                              clipPath: "inset(100% 0% 0% 0%)",
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              filter: "blur(0px)",
                              clipPath: "inset(0% 0% 0% 0%)",
                            }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <AccordionItem
                              value={index}
                              className="border-b border-border"
                            >
                              <AccordionTrigger className="text-sm font-semibold uppercase hover:no-underline">
                                {section.title}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="flex flex-col gap-3">
                                  {section.links.map((link) => (
                                    <li key={link.id}>
                                      {link.disabled ? (
                                        <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                                          {link.title}
                                        </span>
                                      ) : link.external ? (
                                        <a
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={onClose}
                                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                          {link.title}
                                        </a>
                                      ) : (
                                        <Link
                                          href={link.url}
                                          onClick={onClose}
                                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                          {link.title}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>

                      {social && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -30,
                            filter: "blur(10px)",
                            clipPath: "inset(100% 0% 0% 0%)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            clipPath: "inset(0% 0% 0% 0%)",
                          }}
                          transition={{
                            delay: sections.length * 0.1,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="py-4"
                        >
                          <p className="text-sm font-semibold uppercase mb-3">
                            {social.title}
                          </p>
                          <ul className="flex flex-col gap-3">
                            {social.links.map((link) => (
                              <li key={link.id}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={onClose}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                                >
                                  {link.icon}
                                  {link.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </>
                  );
                })()}
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-0">
        <Button
          variant="ghost"
          render={<Link href="/" />}
          className="flex items-center gap-2.5 px-0 py-0 h-auto has-[>svg]:px-0"
          onContextMenu={handleLogoContextMenu}
        >
          <Icons.logo className="w-28 h-6" />
        </Button>

        {showContextMenu && (
          <div
            ref={contextMenuRef}
            role="menu"
            aria-label="Logo options"
            className="fixed z-[100] border border-border bg-popover shadow-md py-1 w-fit"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          >
            <button
              type="button"
              role="menuitem"
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
              onClick={() => {
                window.open("/", "_blank");
                setShowContextMenu(false);
              }}
            >
              Open Link in New Tab
            </button>
            <button
              type="button"
              role="menuitem"
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
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
              Copy Logo as SVG
            </button>
            <button
              type="button"
              role="menuitem"
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
              onClick={() => {
                router.push("/brand");
                setShowContextMenu(false);
              }}
            >
              Go to Brand Kit
            </button>
          </div>
        )}

        <DesktopNav />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden md:flex px-5 text-sm font-medium">
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
    </motion.header>
  );
}
