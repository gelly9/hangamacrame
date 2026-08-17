/**
 * `/` always lands on English, the default language. Visitors switch to
 * Romanian or Hungarian from the language nav. The inline script makes the
 * hop instant; the meta refresh covers no-JS and is the path crawlers follow.
 */
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <script
        dangerouslySetInnerHTML={{ __html: `location.replace("/en/");` }}
      />
      <a href="/en/" style={{ color: "#ede6da" }}>
        Continue to hangamacrame.com
      </a>
    </>
  );
}
