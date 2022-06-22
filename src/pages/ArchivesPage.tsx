import "../Support.css";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CrArchive from "../components/CrArchive";
// TODO keyrune css

const ArchivesPage = () => (
  <Container fluid className="text-center offset">
    <h2>Old Diffs</h2>
    <p>
      Previous diffs of the various docs. These are mostly preserved for people
      who are interested in tracing the history of the tournament docs.
    </p>
    <Row>
      {/* TODO load these lists from db instead of hard-coding them */}
      <Col md={4}>
        <h3>CR</h3>
        <p>
          <a href="AFR-MID">Innistrad: Midnight Hunt</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/innistrad-midnight-hunt-update-bulletin-2021-09-15"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="MH2-AFR">Adventures in the Forgotten Realms</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/adventures-forgotten-realms-update-bulletin-2021-07-15"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="STX-MH2">Modern Horizons 2</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/modern-horizons-2-update-bulletin-2021-06-18"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="KHM-STX">Strixhaven</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/strixhaven-school-mages-update-bulletin-2021-04-20"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="cascade-changes">Cascade Change</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/february-15-2021-banned-and-restricted-announcement"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="CMR-KHM">Kaldheim</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/kaldheim-update-bulletin-2021-02-02"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="ZNR-CMR">Commander Legends</a>
        </p>
        <p>
          <a href="2XM-ZNR">Zendikar Rising</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/zendikar-rising-update-bulletin-2020-09-22"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="M21-2XM">Double Masters</a>
        </p>
        <p>
          <a href="IKO-M21">Core Set 2021</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/core-set-2021-update-bulletin-2020-06-23"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="companion-changes">Companion Change</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/june-1-2020-banned-and-restricted-announcement"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="THB-IKO">Ikoria</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/ikoria-lair-behemoths-update-bulletin-2020-04-10"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="ELD-THB">Theros Beyond Death</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/theros-beyond-death-update-bulletin-2020-01-10"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>

        <p>
          <a href="C19-ELD">Throne of Eldraine</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/throne-eldraine-update-bulletin-2019-09-27"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="M20-C19">Commander 2019</a>
        </p>
        <p>
          <a href="MH1-M20">Core Set 2020</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/core-set-2020-update-bulletin-2019-07-03"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/WAR-MH1">
            Modern Horizons {/* TODO unite relative and absolute links */}
          </a>
        </p>
        <p>
          <a href="/RNA-WAR">War of the Spark</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/war-spark-update-bulletin-2019-04-25"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/GRN-RNA">Ravnica Allegiance</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/ravnica-allegiance-update-bulletin-2019-01-22"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/M19-GRN">Guilds of Ravnica</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/guilds-ravnica-update-bulletin-2018-09-28"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/BBD-M19">Magic Core 2019</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/core-set-2019-update-bulletin-2018-07-06"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/DOM-BBD">Battlebond</a>
        </p>
        <p>
          <a href="/RIX-DOM">Dominaria</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/dominaria-update-bulletin-2018-04-13"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
        <p>
          <a href="/XLN-RIX">Rivals of Ixalan</a>[
          <a
            href="https://magic.wizards.com/en/articles/archive/news/rivals-ixalan-update-bulletin-2018-01-11"
            title="update bulletin"
          >
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </a>
          ]
        </p>
      </Col>

      <Col md={4}>
        <h3>IPG</h3>
        <p>
          <a href="/archives/ipg_5feb21">Kaldheim</a>
        </p>
        <p>
          <a href="/archives/ipg_28sep20">Zendikar Rising</a>
        </p>
        <p>
          <a href="/archives/ipg_3jul20">Core Set 2021</a>
        </p>
        <p>
          <a href="/archives/ipg_17apr20">Ikoria</a>
        </p>
        <p>
          <a href="/archives/ipg_24jan20">Theros Beyond Death</a>
        </p>
        <p>
          <a href="/archives/ipg_4oct19">Throne of Eldraine</a>
        </p>
        <p>
          <a href="/archives/ipg_12jul19">Core Set 2020</a>
        </p>
        <p>
          <a href="/archives/ipg_3may19">War of the Spark</a>
        </p>
        <p>
          <a href="/archives/ipg_21jan19">Ravnica Allegiance</a>
        </p>
        <p>
          <a href="/archives/ipg_5oct18">Guilds of Ravnica</a>
        </p>
      </Col>

      <Col md={4}>
        <h3>MTR</h3>
        <p>
          <a href="/archives/mtr_23jul21">Adventures in the Forgotten Realms</a>
        </p>
        <p>
          <a href="/archives/mtr_23apr21">Strixhaven</a>
        </p>
        <p>
          <a href="/archives/mtr_5feb21">Kaldheim</a>
        </p>
        <p>
          <a href="/archives/mtr_28sep20">Zendikar Rising</a>
        </p>
        <p>
          <a href="/archives/mtr_3jul20">Core Set 2021</a>
        </p>
        <p>
          <a href="/archives/mtr_17apr20">Ikoria</a>
        </p>
        <p>
          <a href="/archives/mtr_24jan20">Theros Beyond Death</a>
        </p>
        <p>
          <a href="/archives/mtr_4oct19">Throne of Eldraine</a>
        </p>
        <p>
          <a href="/archives/mtr_12jul19">Core Set 2020</a>
        </p>
        <p>
          <a href="/archives/mtr_3may19">War of the Spark</a>
        </p>
        <p>
          <a href="/archives/mtr_21jan19">Ravnica Allegiance</a>
        </p>
        <p>
          <a href="/archives/mtr_5oct18">Guilds of Ravnica</a>
        </p>
      </Col>
    </Row>

    <hr />

    <h2>Raw Documents</h2>
    <p>
      Not interested in the changes and just want the docs in their pure,
      unadulterated forms? Look no further.
    </p>

    <Tabs
      defaultActiveKey="cr"
      variant="tabs"
      className="nav-justified bg-dark"
    >
      <Tab eventKey="cr" title="CR">
        <CrArchive />
      </Tab>
      <Tab eventKey="mtr" title="MTR"></Tab>
      <Tab eventKey="ipg" title="IPG"></Tab>
    </Tabs>
  </Container>
);

export default ArchivesPage;
