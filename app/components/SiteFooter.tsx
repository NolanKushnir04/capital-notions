import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand">Capital Notions</p>
            <p className="site-footer__text">
              Independent equity research and market commentary, grounded in
              disciplined valuation.
            </p>
          </div>

          <div>
            <p className="site-footer__heading">Explore</p>
            <ul className="site-footer__list">
              <li><Link href="/reports">Research Reports</Link></li>
              <li><Link href="/track-record">Track Record</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/subscribe">Subscribe</Link></li>
              <li><a href="/feed.xml">RSS feed</a></li>
            </ul>
          </div>

          <div>
            <p className="site-footer__heading">Contact</p>
            <ul className="site-footer__list">
              <li>
                <a href="mailto:nolansnotions@gmail.com">nolansnotions@gmail.com</a>
              </li>
              <li>
                <a href="tel:+16479669851">+1 (647) 966-9851</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer__disclaimer">
          Capital Notions publishes research for informational and educational
          purposes only. Nothing on this site is investment advice or a
          recommendation to buy or sell any security. Investing involves risk,
          including loss of principal. Do your own due diligence and consult a
          licensed advisor before making investment decisions.
        </p>

        <p className="site-footer__copy">© {year} Capital Notions</p>
      </div>
    </footer>
  );
}
