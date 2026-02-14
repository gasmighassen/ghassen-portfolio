/**
 * Home Page
 * Main landing page with Hero, Projects, and Services sections
 */

import { Hero, Projects, Services } from '@/components';

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
    </>
  );
}
