import Header from "./components/Header";
import FragranceExperience from "./components/FragranceExperience";
import ContactSection from "./components/ContactSection";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Notes from "./components/Notes";
import Craft from "./components/Craft";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="relative bg-[#050505] text-white">
      <Header />

      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center"
      >
        <Hero />
      </section>

      <Story />

      <FragranceExperience />
      <Notes />
      <Craft />
      <ContactSection />
      <Footer />
    </main>
  );
}
