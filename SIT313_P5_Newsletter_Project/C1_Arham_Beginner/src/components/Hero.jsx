function Hero() {
  return (
    <section className="relative">
      <img
        src="/assets/deakin-banner.jpg"
        alt="Deakin University"
        className="h-[300px] w-full object-cover md:h-[400px]"
      />

      <div className="absolute bottom-0 left-0 w-full bg-black/60 py-3 text-center text-xl text-white md:text-2xl">
        Hey, I am Arham
      </div>
    </section>
  );
}

export default Hero;