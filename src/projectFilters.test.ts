import { describe, expect, it } from "vitest";
import { filterProjects, type Project } from "./projectFilters";

const projects: Project[] = [
  {
    title: "Excel sales analysis",
    category: "Data Analytics",
    description: "Sales dashboard",
    problem: "Explore sales performance.",
    contribution: "Built an interactive Excel dashboard.",
    stack: ["Excel"],
    accent: "pipeline",
  },
  {
    title: "Tamil movie recommendation system",
    category: "Data Science",
    description: "Movie recommender",
    problem: "Recommend Tamil movies.",
    contribution: "Built and deployed an interactive application.",
    stack: ["Scikit-learn"],
    accent: "document",
  },
];

describe("filterProjects", () => {
  it("returns every resume project for the All filter", () => {
    expect(filterProjects(projects, "All")).toEqual(projects);
  });

  it("returns only projects matching the selected category", () => {
    expect(filterProjects(projects, "Data Science").map(({ title }) => title)).toEqual([
      "Tamil movie recommendation system",
    ]);
  });
});
