export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "44px auto",
        padding: "0 24px",
        fontFamily: "Roboto, system-ui, sans-serif",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          fontSize: "2.6rem",
          fontWeight: 500,
          marginBottom: "12px",
        }}
      >
        About Capital Notions
      </h1>

      {/* About / Mission */}
      <p
        style={{
          fontSize: "1.05rem",
          lineHeight: 1.7,
          maxWidth: "720px",
          marginBottom: "64px",
        }}
      >
        Capital Notions was originally founded in January 2025 by
        Nolan Kushnir as a finance-themed blog site. Since then, CN 
        has transformed into an independent, formal research platform 
        supported by writers and analysts focusing on equities, 
        investing topics, and market news.
      </p>

      {/* Team Section */}
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 500,
          marginBottom: "44px",
          marginTop: "-42px",
        }}
      >
        Our Team
      </h2>

      {/* Team Row */}
      <div
        style={{
          display: "flex",
          gap: "56px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Team Member 1 */}
        <div
          style={{
            width: "260px",
            textAlign: "center",
          }}
        >
          <img
            src="/team/nolan_kushnir4.jpeg"
            alt="Nolan Kushnir"
            style={{
              width: "260px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "14px",
              marginTop: "-8px",
            }}
          />

          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 500,
              marginBottom: "6px",
            }}
          >
            Nolan Kushnir
          </h3>

          <p
            style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                marginBottom: "6px",
            }}
            >
            Founder & Head of Research
            </p>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            Nolan is the head of all Equity Research, Financial Modelling, 
            Valuations and Risk Analyses. 
          </p>
        </div>

        {/* Team Member 2 */}
        <div
          style={{
            width: "260px",
            textAlign: "center",
          }}
        >
          <img
            src="/team/nicolas-liang.jpeg"
            alt="Nicolas Liang"
            style={{
              width: "260px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "14px",
              marginTop: "-8px",
            }}
          />

          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 500,
              marginBottom: "6px",
            }}
          >
            Nicolas Liang
          </h3>

          <p
            style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                marginBottom: "6px",
            }}
            >
            Research Analyst Lead
            </p>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            Nicolas is the analyst lead and specializes in 
            Equity Research, Valuations and Market Commentary.
          </p>
        </div>

        {/* Team Member 3 */}
        <div
          style={{
            width: "260px",
            textAlign: "center",
          }}
        >
          <img
            src="/team/Tim_Sorochkin.jpeg"
            alt="Tim Sorochkin"
            style={{
              width: "260px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "14px",
              marginTop: "-8px",
            }}
          />

          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 500,
              marginBottom: "6px",
            }}
          >
            Tim Sorochkin
          </h3>

          <p
            style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                marginBottom: "6px",
            }}
            >
            Equity Research Analyst
            </p>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            Tim is a quantatative equity analyst, he specializes in 
            Quantatative Research and Risk Analyses.
          </p>
        </div>

        {/* Add more team members by duplicating the block above */}

      </div>
    </main>
  );
}
