import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
