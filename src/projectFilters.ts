export type ProjectCategory = "Data Analytics" | "Data Science";
export type ProjectFilter = "All" | ProjectCategory;

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  contribution: string;
  stack: string[];
  accent: "pipeline" | "document" | "analytics";
}

export function filterProjects(projects: Project[], filter: ProjectFilter): Project[] {
  return filter === "All" ? projects : projects.filter((project) => project.category === filter);
}
