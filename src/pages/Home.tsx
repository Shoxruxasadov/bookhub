import Header from "../components/Header";
import Hero from "../components/Hero";
import Books from "../components/Books";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="home">
      <Header />
      <main>
        <Hero />
        <Books />
      </main>
      <Footer/>
    </div>
  );
}
