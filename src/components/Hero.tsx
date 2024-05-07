import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="title">
          <h1>Discover your bookshelf</h1>
          <p>
            It's time to update your reading list with some of the latest and
            greatest releases in the literary world. From heart-pumping
            thrillers to captivating memoirs, this week's new releases offer
            something for everyone
          </p>
          <Link to={"/login"}>Log In</Link>
        </div>
        <div className="images">
          <img src="/images/animation.png" alt="hero" />
        </div>
      </div>
    </section>
  );
}
