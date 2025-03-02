import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import FileUpload from "./pages/FileUpload";
import { SelectedNodeProvider } from "./contexts/SelectedNode";
import LayoutProvider from "./contexts/LayoutsContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <LayoutProvider>
      <SelectedNodeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/main" element={<AppLayout />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </SelectedNodeProvider>
    </LayoutProvider>
  );
}

export default App;
