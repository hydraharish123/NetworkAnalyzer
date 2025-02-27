// import { useEffect, useRef } from "react";
// import cytoscape from "cytoscape";
// import panzoom from "cytoscape-panzoom";
// import "cytoscape-panzoom/cytoscape.js-panzoom.css";
// import $ from "jquery";
// import dagre from "cytoscape-dagre";

// // Correct order for plugins
// panzoom(cytoscape, $);
// cytoscape.use(dagre);

// function CytoscapeLayout({ elements }) {
//   const cyRef = useRef(null);

//   useEffect(() => {
//     if (!cyRef.current) return; // Prevent null reference

//     console.log("Elements:", elements); // Debug: Check if elements are valid

//     const cy = cytoscape({
//       container: cyRef.current,
//       elements: elements || [], // Fallback to empty array
//       style: [
//         {
//           selector: "node",
//           style: {
//             "background-color": "#0074D9",
//             label: "data(id)",
//             color: "#fff",
//             "font-size": "12px",
//             "text-valign": "center",
//           },
//         },
//         {
//           selector: "edge",
//           style: {
//             width: 2,
//             "line-color": "#ccc",
//             "target-arrow-color": "#ccc",
//             "target-arrow-shape": "triangle",
//             "curve-style": "bezier",
//           },
//         },
//       ],
//       layout: { name: "grid" },
//     });

//     cy.panzoom();

//     return () => cy.destroy(); // Cleanup
//   }, [elements]);

//   useEffect(() => {
//     console.log("Elements:", elements); // Check if elements are valid
//   }, [elements]);

//   return (
//     <div
//       ref={cyRef}
//       style={{ width: "100%", height: "600px", border: "1px solid #ddd" }}
//     ></div>
//   );
// }

// export default CytoscapeLayout;
import { useEffect } from "react";
import cytoscape from "cytoscape";
import panzoom from "cytoscape-panzoom";
import "cytoscape-panzoom/cytoscape.js-panzoom.css";
import $ from "jquery";
import { useSelectedNode } from "../../contexts/SelectedNode";
import { useLayoutContext } from "../../contexts/LayoutsContext";
panzoom(cytoscape, $);

const CytoscapeLayout = ({ elements }) => {
  const { setSelectedNode } = useSelectedNode();
  const { cyRef } = useLayoutContext();

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current, // Reference to the div element
      elements: elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#0074D9",
            label: "data(id)",
            "text-valign": "center",
            color: "#fff",
            "font-size": "6px",
          },
        },
        {
          selector: "edge",
          style: {
            width: 1.5,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
          },
        },
      ],
      layout: { name: "grid" },
    });
    cy.panzoom();

    cyRef.current.cy = cy;

    cy.on("tap", "node", (event) => {
      const node = event.target;
      const nodeData = node.data();

      // Update state with clicked node details
      setSelectedNode(nodeData);

      // Reset color of all nodes
      cy.nodes().style("background-color", "#0074D9");

      // Change the clicked node's color
      node.style("background-color", "#ff6347"); // Tomato color
    });

    return () => cy.destroy(); // Cleanup on unmount
  }, [elements, setSelectedNode, cyRef]);

  return <div ref={cyRef} style={{ width: "100%", height: "550px" }} />;
};

export default CytoscapeLayout;
// {
//     nodes: [
//       {
//         data: {
//           id: "723",
//           name: "YDL075W",
//           annotation_Taxon: "Saccharomyces cerevisiae",
//         },
//         position: { x: 693.05, y: -49.47 },
//       },
//       {
//         data: { id: "726", name: "YNL069C" },
//         position: { x: 627.31, y: -205.99 },
//       },
//       {
//         data: { id: "658", name: "YGR085C" },
//         position: { x: 804.31, y: -245.62 },
//       },
//       {
//         data: { id: "660", name: "YDR395W" },
//         position: { x: 730.87, y: -157.51 },
//       },
//       {
//         data: { id: "579", name: "YPR102C" },
//         position: { x: 841.14, y: -130.78 },
//       },
//       {
//         data: { id: "578", name: "YLR075W" },
//         position: { x: 910.38, y: -217.06 },
//       },
//     ],
//     edges: [
//       { data: { id: "659", source: "658", target: "578" } },
//       { data: { id: "661", source: "658", target: "660" } },
//       { data: { id: "724", source: "660", target: "723" } },
//       { data: { id: "733", source: "660", target: "579" } },
//       { data: { id: "727", source: "660", target: "726" } },
//       { data: { id: "580", source: "578", target: "579" } },
//     ],
//   },
