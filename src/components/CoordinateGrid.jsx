import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import * as d3 from "d3";

const CoordinateGrid = ({ sessionData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!sessionData || !sessionData.data || sessionData.data.length === 0) {
      return;
    }

    // Remove previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([
        d3.min(sessionData.data, (d) =>
          Math.min(d["x-coordinates"], d["real_x-coordinates"])
        ),
        d3.max(sessionData.data, (d) =>
          Math.max(d["x-coordinates"], d["real_x-coordinates"])
        ),
      ])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(sessionData.data, (d) =>
          Math.min(d["z-coordinates"], d["real_z-coordinates"])
        ),
        d3.max(sessionData.data, (d) =>
          Math.max(d["z-coordinates"], d["real_z-coordinates"])
        ),
      ])
      .nice()
      .range([height, 0]);

    const color = "blue";
    const realColor = "red";

    const line = d3
      .line()
      .x((d) => x(d["x-coordinates"]))
      .y((d) => y(d["z-coordinates"]));

    svg
      .append("path")
      .datum(sessionData.data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);

    const realLine = d3
      .line()
      .x((d) => x(d["real_x-coordinates"]))
      .y((d) => y(d["real_z-coordinates"]));

    svg
      .append("path")
      .datum(sessionData.data)
      .attr("fill", "none")
      .attr("stroke", realColor)
      .attr("stroke-width", 2)
      .attr("d", realLine);

    // Add big dot at the starting point (0, 0)
    svg
      .append("circle")
      .attr("cx", x(0))
      .attr("cy", y(0))
      .attr("r", 6) // Adjust the radius as needed
      .attr("fill", "black");

    // Add starting point label
    svg
      .append("text")
      .attr("x", x(0) + 10) // Add a little padding to the right
      .attr("y", y(0) - 10) // Add a little padding above
      .attr("fill", "black");
  }, [sessionData]); // <-- Include sessionData in the dependency array

  return (
    <Box>
      <svg ref={svgRef}></svg>
    </Box>
  );
};

export default CoordinateGrid;
