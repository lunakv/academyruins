import "../Support.css";
import { Container } from "react-bootstrap";

const AboutPage = () => (
  <Container fluid="lg" className="offset">
    <h2 className="text-center">About</h2>
    <p>
      Academy Ruins is a Magic: the Gathering knowledge portal. Its primary purpose is hosting diffs of the various
      Magic rules documents, specifically the Comprehensive Rules, the Magic Tournament Rules, and the Infraction
      Procedure Guide. It also houses an API allowing programmatic access to those documents, as well as an archive
      containing many of their old versions.
    </p>
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
      Otherwise—for suggestions, more general feedback, etc.—feel free to reach out on Twitter{" "}
      <a href="https://twitter.com/just_vaasa">@just_vaasa</a>, IRC (vaasa on Libera.Chat), or through the Judge Academy
      Discord.
    </p>
    <hr />
    <p className="text-center text-secondary">
      Set symbol images are provided by Keyrune and copyright Wizards of the Coast. This site is in no way affiliated
      with or endorsed by Hasbro, Inc., Wizards of the Coast, or any of their properties.
    </p>
  </Container>
);

export default AboutPage;
