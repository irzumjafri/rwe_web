import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import * as d3 from "d3";

const CoordinateGridMapper = ({ sessionData }) => {
  const svgRef = useRef();
  console.log(sessionData);

  useEffect(() => {
    if (!sessionData || sessionData.length === 0) {
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
        d3.min(sessionData, (d) =>
          Math.min(d["x_coordinate"], d["real_x_coordinate"])
        ),
        d3.max(sessionData, (d) =>
          Math.max(d["x_coordinate"], d["real_x_coordinate"])
        ),
      ])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(sessionData, (d) =>
          Math.min(d["z_coordinate"], d["real_z_coordinate"])
        ),
        d3.max(sessionData, (d) =>
          Math.max(d["z_coordinate"], d["real_z_coordinate"])
        ),
      ])
      .nice()
      .range([height, 0]);

    const color = "blue";
    const realColor = "red";

    const line = d3
      .line()
      .x((d) => x(d["x_coordinate"]))
      .y((d) => y(d["z_coordinate"]));

    svg
      .append("path")
      .datum(sessionData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);

    const realLine = d3
      .line()
      .x((d) => x(d["real_x_coordinate"]))
      .y((d) => y(d["real_z_coordinate"]));

    svg
      .append("path")
      .datum(sessionData)
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

export default CoordinateGridMapper;
