import "../Support.css";
import { Container } from "react-bootstrap";

const AboutPage = () => (
  <Container fluid className="offset">
    <h2 className="text-center">About</h2>
    <p>
      This site is maintained by <b>Andrew Villarrubia</b>, an L2 Judge from
      US-South. The CR diffs used to be{" "}
      <a href="src/pages/AboutPage.tsx">Yawgatog's</a> project, but they stopped
      with Ixalan; I've picked it up with their blessing.
    </p>
    <p>
      If you find a bug, I would <b>strongly</b> prefer you open an issue on{" "}
      <a href="https://github.com/Villawhatever/VensersJournal/issues">
        Github
      </a>
      .
    </p>

    <p>
      Otherwise -- for suggestions, more general feedback, etc -- reach out on
      Twitter <a href="https://twitter.com/villawhatever">@villawhatever</a>,
      IRC (Volo on Libera.Chat), or e-mail me through JudgeApps.
    </p>

    <p>Special thanks:</p>
    <ul>
      <li>
        <b>Jorge Requesens</b> for providing a massive chunk of the archived
        tournament docs
      </li>
      <li>
        <b>Arttu Kaipiainen</b> for helping me track down bugs
      </li>
      <li>
        <b>Petr Hudeček</b> for having a <i>giant</i> block of CRs, IPGs, and
        MTRs available
      </li>
      <li>
        ALL the lovely folx who have donated to keep this site online. {"<3"}
      </li>
    </ul>
    <hr />
    <p className="text-center">
      This site is in no way affiliated with Hasbro, Inc., Wizards of the Coast,
      or any of its properties.
    </p>
  </Container>
);

export default AboutPage;
