import data from "./data/data.json";

import "./App.css";

function App() {
  const getIdForSesstion = (inputString: string) => {
    return inputString.replace(/\s/g, "");
  };

  const formatLine = (jsonString: string) => {
    const regex = /\[(.*?)]\((\/en)?(.*?)\)/;
    // [(.*?)] : lấy phần trong của dấu [ ]
    // (.*?) : lấy phần trong của dấu ()
    // (\/en)?: tùy chọn (?: có hoặc không) nếu có sẽ bỏ chữ "en" đi.
    // 
    const match = jsonString.match(regex);

    if (match) {
      const title = match[1];

      let title_1; // đoạn nội dung hiển thị
      let title_2; // phần trong dấu ngoặc ( có thể có hoặc không, vì 1 số line k có)

      if (title) {
        const regex = /(.*?)\((.*?)\)/; // lấy ra phần ngoài và trong dấu ngoặc
        const match = title.match(regex);

        if (match) {
          title_1 = match[1]; // lấy phần ngoài
          title_2 = match[2]; // lấy phần trong
        } else {
          title_1 = title;
        }
      }

      const link = match[3];
      const formatElement = (
        <li key={link}>
          <a href={`https://igx.biz${link}`}>{title_1}</a>
          {title_2 ? `(${title_2})` : ""}
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
