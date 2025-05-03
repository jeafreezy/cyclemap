import { MapLayout } from "@/components/layouts/map-layout";

export const AppLayout = ({
  mapLayer,
  sidebar,
}: {
  sidebar: React.ReactNode;
  mapLayer: React.ReactNode;
}) => {
  return (
    <div className="font-[family-name:var(--font-poppins)] w-screen h-screen bg-background">
      <main className="grid grid-cols-12 h-full w-full">
        {/* Sidebar */}
        <aside className="col-span-4 h-full">{sidebar}</aside>
        {/* Map */}
        <div className="col-span-8">
          <MapLayout>{mapLayer}</MapLayout>
        </div>
      </main>
    </div>
  );
};
