import { Button } from "./ui/button";
import React from "react";
import { Link } from "next-view-transitions";
import { Session } from "next-auth";
import SectionHeader from "./SectionHeader";
const CTA = ({ session }: { session: Session | null }) => {
  return (
    <section className="bg-gradient-to-r px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <SectionHeader
          label="Ready to Get Started"
          title="Ready to Get Started"
          description="Join thousands of users who are already creating amazing templates with our platform."
          gradientText="START NOW"
          mdTextHeight={180}
        />
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full shadow-lg transition-all hover:shadow-xl"
            asChild
          >
            <Link href={session ? "/templates" : "/register"}>
              {session ? "Browse Templates" : "Start Creating for Free"}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white"
            asChild
          >
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
