import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Tech } from "@/components/sections/Tech";
import { Lab } from "@/components/sections/Lab";
import { Contact } from "@/components/sections/Contact";

/**
 * Homepage section orchestrator. Order = narrative arc:
 * identity → leadership proof → work proof → career → depth → range → contact.
 * (Mirrors the ConnectedNavigation dot order.)
 */
export function AllSections() {
  return (
    <>
      <About />
      <Leadership />
      <Work />
      <Experience />
      <Tech />
      <Lab />
      <Contact />
    </>
  );
}
