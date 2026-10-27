function Gallery() {
  return (
    <section id="photos" className="px-5 py-12 text-center">
      <h2 className="mb-8 text-3xl font-bold text-teal-600">Photos Section</h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <img src="/assets/photo1.jpg" alt="Photo 1" className="h-48 w-full object-cover" />
        <img src="/assets/photo2.jpg" alt="Photo 2" className="h-48 w-full object-cover" />
        <img src="/assets/photo3.jpg" alt="Photo 3" className="h-48 w-full object-cover" />
        <img src="/assets/photo4.jpg" alt="Photo 4" className="h-48 w-full object-cover" />
        <img src="/assets/photo5.jpg" alt="Photo 5" className="h-48 w-full object-cover" />
        <img src="/assets/nature.jpg" alt="Nature" className="h-48 w-full object-cover" />
      </div>
    </section>
  );
}

export default Gallery;