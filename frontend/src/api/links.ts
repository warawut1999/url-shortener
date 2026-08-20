import { apiClient } from "./client";
import type { Link } from "../types/link";
import type { CreateLinkRequest } from "../components/CreateLinkModal";

export async function getLinks(): Promise<Link[]> {
  const response = await apiClient.get("/api/Links");

  return response.data.data;
}

export async function createLink(data: CreateLinkRequest) {
  const response = await apiClient.post("/api/Links", data);

  return response.data;
}

export async function enableLink(shortCode: string) {
  const response = await apiClient.patch(
    `/api/Links/${encodeURIComponent(shortCode)}/enable`
  );

  return response.data;
}

export async function disableLink(shortCode: string) {
  const response = await apiClient.patch(
    `/api/Links/${encodeURIComponent(shortCode)}/disable`
  );

  return response.data;
}