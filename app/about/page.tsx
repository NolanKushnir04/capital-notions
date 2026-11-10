import type { Metadata } from "next";
import { alternatesFor } from "@/app/lib/site";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Capital Notions is an independent research platform covering equities, investing topics and market news.",
  alternates: alternatesFor("/about"),
};

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string; // file in /public/team
};

/*
 * To add someone: add a line to the right group below and put their photo
 * in /public/team. Portrait photos work best (they're cropped to 4:5).
 */
const TEAM: { group: string; members: Member[] }[] = [
  {
    group: "Research",
    members: [
      {
        name: "Nolan Kushnir",
        role: "Founder & Head of Investment Research",
        bio: "Nolan is the Head of all Equity Research, Financial Modelling, Valuations and Risk Analyses.",
        photo: "nolan_kushnir6.jpeg",
      },
      {
        name: "Nicolas Liang",
        role: "Research Analyst Lead",
        bio: "Nicolas is the Analyst Lead and specializes in Equity Research, Valuations and Market Commentary.",
        photo: "nicolas-liang.jpeg",
      },
      {
        name: "Tim Sorochkin",
        role: "Equity Research Analyst",
        bio: "Tim is an Equity Analyst who specializes in Quantitative Research and Risk Analyses.",
        photo: "Tim_Sorochkin.jpeg",
      },
      {
        name: "Charlie Cao",
        role: "Equity Research Analyst",
        bio: "Charlie is an Equity Analyst who specializes in Quantitative Research and Market Research.",
        photo: "Charlie.jpeg",
      },
    ],
  },
];

const FOCUS = [
  {
    title: "Equity Research",
    text: "Formal initiation reports with a rating, price target and full model.",
  },
  {
    title: "Valuation",
    text: "DCF, rNPV and comparables work, with the assumptions laid out.",
  },
  {
    title: "Market Commentary",
    text: "Timely takes on news, macro and the companies we follow.",
  },
];

export default function AboutPage() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">About</p>
        <h1 className="page-title">About Capital Notions</h1>
        <p className="page-intro">
          Capital Notions was founded in January 2025 by Nolan Kushnir as a
          finance-themed blog. Since then, it has grown into an independent,
          formal research platform supported by writers and analysts focusing
          on equities, investing topics and market news.
        </p>
      </header>

      <section className="about-focus" aria-label="What we do">
        {FOCUS.map((f) => (
          <div key={f.title} className="principle">
            <h2 className="principle__title">{f.title}</h2>
            <p className="principle__text">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="home-section" aria-labelledby="team-heading">
        <h2 id="team-heading" className="about-team-title">
          Our Team
        </h2>

        {TEAM.map(({ group, members }) => (
          <div key={group} className="team-group">
            {/* Group labels only appear once there's more than one group */}
            {TEAM.length > 1 && (
              <div className="section-head">
                <h3 className="section-head__title">{group}</h3>
              </div>
            )}
            <ul className="team-grid">
              {members.map((m, i) => (
                <li key={m.name} className="member">
                  <div className="member__photo">
                    <Image
                      src={`/team/${m.photo}`}
                      alt={`Portrait of ${m.name}`}
                      fill
                      sizes="(max-width: 680px) 50vw, (max-width: 960px) 33vw, 300px"
                      priority={group === "Research" && i < 3}
                    />
                  </div>
                  <h4 className="member__name">{m.name}</h4>
                  <p className="member__role">{m.role}</p>
                  <p className="member__bio">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="home-subscribe about-contact" aria-labelledby="contact-heading">
        <div>
          <h2 id="contact-heading" className="home-subscribe__title">
            Get in touch
          </h2>
          <p className="home-subscribe__text">
            Questions about our research, or interested in joining the team?
            We&apos;d like to hear from you.
          </p>
        </div>
        <div className="about-contact__actions">
          <a href="mailto:nolansnotions@gmail.com" className="button">
            Email us
          </a>
          <Link href="/subscribe" className="button button--ghost">
            Subscribe
          </Link>
        </div>
      </section>
    </main>
  );
}
