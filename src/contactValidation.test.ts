import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactValidation";

describe("contact form validation", () => {
  it("accepts a valid enquiry without a service selection", () => {
    expect(contactSchema.safeParse({
      name: "Indhuraj",
      email: "hello@example.com",
      service: "",
      message: "I would like to discuss a data project.",
      website: "",
    }).success).toBe(true);
  });

  it("requires a valid email and a meaningful project description", () => {
    const result = contactSchema.safeParse({
      name: "Indhuraj",
      email: "not-an-email",
      service: "Analytics",
      message: "Short",
      website: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map(({ path }) => path[0])).toEqual(["email", "message"]);
    }
  });
});
