import './Footer.css';
import {Link} from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
        <p className='footer_copyright'>© O'clock 2025 / <a className="footer_mail" href="mailto:mail@oclock.io">mail@oclock.io</a></p>
        <nav>
          <Link className="footer_mentions" to="/mentions">Mentions Légales</Link>
          <Link className='footer_plan' to="/plan_du_site">Plan du site</Link>
        </nav>
    </footer>
  );
}