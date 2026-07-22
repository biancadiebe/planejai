import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { SimulationResultsPage } from "./pages/SimulationResultsPage";
import SimulationHistoryPage from "./pages/SimulationHistoryPage";

//caminhos
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: (
      <div className="p-6 text-center">Ops! Ocorreu um erro ao carregar esta página.</div>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <SimulationFormPage />
          </>
        ),
      },
      {
        path: "/resultado/:id",
        element: <SimulationResultsPage />,
      },
      {
        path: "/historico",
        element: <SimulationHistoryPage/>,
      },
    ],
  },
]);
