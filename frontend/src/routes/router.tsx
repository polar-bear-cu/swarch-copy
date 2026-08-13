import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import TestPage from "@/pages/test/TestPage";
import TestEndpointPage from "@/pages/test/[id]/TestDetailPage";
import StatusPage from "@/pages/status/StatusPage";
import RoomPage from "@/pages/room/RoomPage";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.TEST,
    element: (
      <MainLayout>
        <TestPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.TEST_ENDPOINT,
    element: (
      <MainLayout>
        <TestEndpointPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.STATUS,
    element: (
      <MainLayout>
        <StatusPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.ROOM,
    element: (
      <MainLayout>
        <RoomPage />
      </MainLayout>
    ),
  },
]);
