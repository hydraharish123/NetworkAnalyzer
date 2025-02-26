import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import FileUpload from "./pages/FileUpload";
import { SelectedNodeProvider } from "./contexts/SelectedNode";
function App() {
  return (
    <SelectedNodeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/main" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </SelectedNodeProvider>
  );
}

export default App;
