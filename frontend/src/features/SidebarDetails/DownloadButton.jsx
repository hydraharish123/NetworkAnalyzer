import { useLayoutContext } from "../../contexts/LayoutsContext";
import Button from "../../ui/Button";

function DownloadButton() {
  const { cyRef } = useLayoutContext();
  const downloadGraphAsPng = () => {
    if (!cyRef.current || !cyRef.current.cy) return;

    const pngData = cyRef.current.cy.png({ full: true });
    const link = document.createElement("a");
    link.href = pngData;
    link.download = "cytoscape-graph.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button size="medium" variation="primary" onClick={downloadGraphAsPng}>
      Download as PNG
    </Button>
  );
}

export default DownloadButton;
