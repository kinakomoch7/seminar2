import "./App.css"
import { useEffect, useState } from "react";

function App() {
  const properties = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];

  const [js, setJs] = useState([]);
  const [xProperty, setXProperty] = useState("sepalLength");
  const [yProperty, setYProperty] = useState("sepalWidth");
  const [visibilty, setVisibilty] = useState([]);

  const url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setJs(response);
        const array = response.map((item) => item.species)
        const set = new Set(array)
        const data = Array.from(set)
        setVisibilty(data);
      });
  }, []);

  const mouseEvent = (event) => {
    if(event === true){
      console.log(event)
    }
  }


  const handleChangeXProperty = (event) => {
    setXProperty(event.target.value);
  };

  const handleChangeYProperty = (event) => {
    setYProperty(event.target.value);
  };


  const x0 = d3
    .scaleLinear()
    .domain(d3.extent(js, (value) => value[xProperty]))
    .range([0, 400])
    .nice();

  const y0 = d3
    .scaleLinear()
    .domain(d3.extent(js, (value) => value[yProperty]))
    .range([0, 400])
    .nice();

  const labelStyle = {
    writingMode: "vertical-rl",
    textOrientation: "upright",
    whiteSpace: "nowrap",
  };

  const circleStyle = {
    transitionProperty: "cx, cy",
    transitionDuration: "1s"
  };


 

  return (
    <div id="main">
      <h1 className="title is-1">Scatter Plot of Iris Flower Dataset</h1>

      <div>
        <h2 className="title is-2">Horizontal Axis</h2>
        <select value={xProperty} onChange={handleChangeXProperty}>
          {properties.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <h2 className="title is-2">Vertical Axis</h2>
        <select value={yProperty} onChange={handleChangeYProperty}>
          {properties.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <svg width={800} height={800}>
          <g>
            <g transform="translate(100, 0)">
              {x0.ticks().map((item, i) => {
                return (
                  <g key={i}>
                    <line
                      x1={x0(item)}
                      y1="700"
                      x2={x0(item)}
                      y2="705"
                      stroke="black"
                    />
                    <text x={x0(item)} y="720" textAnchor="middle">
                      {item}
                    </text>
                  </g>
                );
              })}
            </g>
            <g transform="translate(0, 700) scale(1, -1)">
              {y0.ticks().map((item, i) => {
                return (
                  <g key={i}>
                    <line
                      x1="90"
                      y1={y0(item)}
                      x2="100"
                      y2={y0(item)}
                      stroke="black"
                    />
                    <text
                      x="85"
                      y={-y0(item) + 5}
                      textAnchor="end"
                      transform="scale(1, -1)"
                    >
                      {item}
                    </text>
                  </g>
                );
              })}
            </g>

            <g>
              <text x="250" y="750">
                {xProperty}
              </text>
              <text x="40" y="400" style={labelStyle}>
                {yProperty}
              </text>
            </g>

            <g>

              
              <rect
                x="600"
                y="400"
                width="10"
                height="10"
                fill={d3.schemePastel1[0]}
              />
              <rect
                x="600"
                y="350"
                width="10"
                height="10"
                fill={d3.schemePastel1[1]}
              />
              <rect
                x="600"
                y="300"
                width="10"
                height="10"
                fill={d3.schemePastel1[2]}
              />

              <text x="610" y="410" onClick={mouseEvent()}>
                setosa
              </text>
              <text x="610" y="360">
                versicolor
              </text>
              <text x="610" y="310">
                virginica
              </text>
            </g>

            <g transform="translate(100, 700) scale(1, -1)">
              <g stroke="black">
                {/*枠線 */}
                <line x1="0" y1="0" x2="0" y2="400" />
                <line x1="0" y1="0" x2="400" y2="0" />
              </g>

              {js.filter(item => visibilty.includes(item.species)
              ).map((value, i) => {
                let color;

                if (value.species === "setosa") {
                  color = d3.schemePastel1[0];
                } else if (value.species === "versicolor") {
                  color = d3.schemePastel1[1];
                } else if (value.species === "virginica") {
                  color = d3.schemePastel1[2];
                }

                return (
                  <circle
                    cx={x0(value[xProperty])}
                    cy={y0(value[yProperty])}
                    r="5"
                    fill={color}
                    key={i}
                    style={circleStyle}
                  />
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
