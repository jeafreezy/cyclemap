"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
      <div className="flex max-w-sm flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for doesn&apos;t exist.
        </p>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
          <Link href="/" passHref>
            <Button>Take me home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
