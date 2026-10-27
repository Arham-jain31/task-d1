function Project() {
  return (
    <section id="work" className="px-5 py-12">
      <h2 className="mb-2 text-center text-3xl font-bold">MY PROJECTS</h2>
      <h3 className="mb-8 text-center text-xl">BMI Calculator</h3>

      <div className="flex justify-center">
        <img
          src="/assets/bmi.png"
          alt="BMI Calculator project"
          className="w-full max-w-4xl rounded-lg border object-cover"
        />
      </div>
    </section>
  );
}

export default Project;