import { useEffect, useState } from "react";

function App() {
  const property = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"]
  const xProperty = "petalLength";
  const yProperty = "petalWidth";

  const [js, setJs] = useState([]);
  const [selected, setSelected] = useState("sepalLength")

  const url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setJs(response)});
  }, []);

  

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
      writingMode: 'vertical-rl',
      textOrientation: 'upright',
      whiteSpace: 'nowrap',
    };

  const selectChange = (event) => {
    setSelected(event.target.value)
  }


  return (
    <svg width={800} height={800}>
      <text x="70" y="70" fontWeight="bold" fontSize="27">
        Scatter Plot of Iris Flower Dataset
      </text>

      <g>
        <foreignObject x="100" y="100" width="200" height="50">
          <select value={selected} onChange={selectChange}>
            {property.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </foreignObject>

        <foreignObject x="100" y="200" width="200" height="50">
          <select value={selected} onChange={selectChange}>
            {property.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </foreignObject>
      </g>


      <g>
        <g transform="translate(100, 0)" >
          {
            x0.ticks().map((item, i) => {
              return(
              <g key={i}>
              <line x1={x0(item)} y1="700" x2={x0(item)} y2="705" stroke="black"/>
              <text x={x0(item)} y="720" textAnchor="middle">{item}</text>
              </g>
            )
            }
          )}
        </g>
        <g transform="translate(0, 700) scale(1, -1)">
          {
            y0.ticks().map((item, i) => {
              return(
                <g key={i}>
                  <line x1="90" y1={y0(item)} x2="100" y2={y0(item)} stroke="black"/>
                  <text x="85" y={-y0(item)+5} textAnchor="end" transform="scale(1, -1)">{item}</text>
                </g>
              )
            }
          )}
        </g>

        <g>
          <text x="250" y="750">{xProperty}</text>
          <text x="40" y="400" style={labelStyle}>{yProperty}</text>
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

          <text x="610" y="410">
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

          {js.map((value, i) => {
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
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}

export default App;
