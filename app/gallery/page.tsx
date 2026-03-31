import { PhotoGallery } from "@/components/photo-gallery";
import { SectionHeading } from "@/components/section-heading";
import { getHomeData } from "@/lib/content";

export default async function GalleryPage() {
  const data = await getHomeData();

  return (
    <main className="content-shell section-space pt-20 md:pt-28">
      <SectionHeading
        eyebrow="Gallery"
        title="A page devoted to atmosphere and image"
        description="Built for photography first: big frames, soft motion, and a lightbox that lets each image stay present a little longer."
      />
      <div className="mt-10">
        <PhotoGallery photos={data.photography} />
      </div>
    </main>
  );
}
