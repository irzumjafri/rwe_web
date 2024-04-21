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
        0,
        d3.max(sessionData.data, (d) =>
          Math.max(d["x-coordinates"], d["real_x-coordinates"])
        ),
      ])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(sessionData.data, (d) =>
          Math.max(d["y-coordinates"], d["real_y-coordinates"])
        ),
      ])
      .nice()
      .range([height, 0]);

    const color = "blue";
    const realColor = "red";

    const line = d3
      .line()
      .x((d) => x(d["x-coordinates"]))
      .y((d) => y(d["y-coordinates"]));

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
      .y((d) => y(d["real_y-coordinates"]));

    svg
      .append("path")
      .datum(sessionData.data)
      .attr("fill", "none")
      .attr("stroke", realColor)
      .attr("stroke-width", 2)
      .attr("d", realLine);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Add labels
    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
      .style("text-anchor", "middle")
      .text("X Coordinates");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Y Coordinates");
  }, [sessionData]); // <-- Include sessionData in the dependency array

  return (
    <Box>
      <svg ref={svgRef}></svg>
    </Box>
  );
};

export default CoordinateGrid;
