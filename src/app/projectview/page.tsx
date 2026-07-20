import React from "react";
import DemoDashboard from "@/components/projectview/DemoDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjectView Demo | TEGAKARA",
  description: "Demo interaktif portal klien TEGAKARA ProjectView",
};

export default function ProjectViewPage() {
  return <DemoDashboard />;
}
