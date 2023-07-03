import data from "./data/data.json";

import "./App.css";

function App() {
  const getIdForSesstion = (inputString: string) => {
    return inputString.replace(/\s/g, "");
  };

  const formatLine = (jsonString: string) => {
    const regex = /\[(.*?)]\((\/en)?(.*?)\)/;
    const match = jsonString.match(regex);

    if (match) {
      const title = match[1];
      const link = match[3];
      const formatElement = (
        <li key={link}>
          <a href={`https://igx.biz${link}`}>{title}</a>
        </li>
      );

      return formatElement;
    }

    return null;
  };

  return (
    <div className="container">
      <h3>reports</h3>
      <div>
        <ul>
          {data.reports.map((report) => {
            return (
              <li>
                <span>
                  <a
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    href={`#${getIdForSesstion(report.section)}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    {report.section}
                  </a>
                </span>

                <div className="collapse" id={getIdForSesstion(report.section)}>
                  <div className="card card-body">
                    <ol>
                      {report.lines.map((line) => {
                        return formatLine(line);
                      })}
                    </ol>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
