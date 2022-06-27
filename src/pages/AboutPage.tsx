import "../Support.css";
import { Container } from "react-bootstrap";

const AboutPage = () => (
  <Container fluid="lg" className="offset">
    <h2 className="text-center">About</h2>
    <p>
      This site is maintained by <b>Václav Luňák</b>, a RA from EU–Central. The CR diffs were a project first created by{" "}
      <a href="https://yawgatog.com/">Yawgatog</a> and later continued by Venser’s Journal. <i>Academy Ruins</i> is a
      continuation of those efforts.
    </p>
    <p>
      If you find a bug, please open an issue on <a href="https://github.com/lunakv/AcademyRuins/issues">Github</a>. If
      you'd like to contribute to the project yourself, pull requests are always welcome.
    </p>

    <p>
      Otherwise—for suggestions, more general feedback, etc.—reach out on Twitter{" "}
      <a href="https://twitter.com/just_vaasa">@just_vaasa</a>, IRC (vaasa on Libera.Chat), or through the Judge Academy
      Discord.
    </p>

    <p>Special thanks:</p>
    <ul>
      <li>
        <b>Jorge Requesens</b> for providing a massive chunk of the archived tournament docs
      </li>
      <li>
        <b>Arttu Kaipiainen</b> for helping me track down bugs
      </li>
      <li>
        <b>Petr Hudeček</b> for having a <i>giant</i> block of CRs, IPGs, and MTRs available
      </li>
      <li>ALL the lovely folks who have donated to keep this site online. ♥</li>
    </ul>
    <hr />
    <p className="text-center text-secondary">
      Set symbol images are provided by Keyrune and copyright Wizards of the Coast. This site is in no way affiliated
      with or endorsed by Hasbro, Inc., Wizards of the Coast, or any of their properties.
    </p>
  </Container>
);

export default AboutPage;
