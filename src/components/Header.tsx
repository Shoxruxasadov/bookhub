import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { RootState } from "../store/store";

export default function Header() {
  const user = useSelector((state: RootState) => state.root.user);

  const logout = () => {
    localStorage.setItem("auth", "{}");
    window.location.reload();
  };

  return (
    <header>
      <div className="container">
        <Scroll
          className="logo"
          activeClass="active"
          to="home"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <img src="/logo.png" alt="logo" />
          <h1>Bookshelf</h1>
        </Scroll>
        <nav>
          <ul>
            <li>
              <Scroll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                Home
              </Scroll>
            </li>
            <li>
              <Scroll
                activeClass="active"
                to="books"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                Books
              </Scroll>
            </li>
            <li>
              <Scroll
                activeClass="active"
                to="support"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                Support
              </Scroll>
            </li>
          </ul>
        </nav>
        <div className="auth">
          {user.key ? (
            <div className="user">
              <div className="title">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="image">
                <img src="/images/unknown.webp" alt="user" />
              </div>

              <div className="logout" onClick={logout}>
                <p>Log Out</p>
              </div>
            </div>
          ) : (
            <>
              <Link to={"/login"}>Log In</Link>
              <Link to={"/signup"}>
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="46"
                  viewBox="0 0 59 46"
                  fill="none"
                >
                  <path
                    d="M58.1213 25.1213C59.2929 23.9497 59.2929 22.0503 58.1213 20.8787L39.0294 1.7868C37.8579 0.615223 35.9584 0.615223 34.7868 1.7868C33.6152 2.95837 33.6152 4.85786 34.7868 6.02944L51.7574 23L34.7868 39.9706C33.6152 41.1421 33.6152 43.0416 34.7868 44.2132C35.9584 45.3848 37.8579 45.3848 39.0294 44.2132L58.1213 25.1213ZM0 26L56 26V20L0 20L0 26Z"
                    fill="#FDFDFD"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
