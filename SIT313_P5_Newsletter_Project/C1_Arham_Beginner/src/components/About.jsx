function About() {
  return (
    <section id="about" className="px-5 py-12 text-center">
      <h2 className="mb-6 text-3xl font-bold">About Me</h2>

      <img
        src="/assets/profile.jpeg"
        alt="Arham profile"
        className="mx-auto h-40 w-40 rounded-full object-cover"
      />

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8">
        I am an AI and ML student currently studying at Chitkara University.
        I am interested in entrepreneurship, travelling and exploring nature.
      </p>
    </section>
  );
}

export default About;