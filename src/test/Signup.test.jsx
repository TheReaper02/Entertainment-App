import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Signup from "../pages/SignUp.jsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("Signup", () => {
  test("shows errors when fields are empty", async () => {
    renderSignup();
    await userEvent.click(
      screen.getByRole("button", { name: /sign up for an account/i }),
    );
    expect(screen.getAllByText("Can't be empty")).toHaveLength(3);
  });
  test("shows error for bad email", async () => {
    renderSignup();
    await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
    await userEvent.click(
      screen.getByRole("button", { name: /sign up for an account/i }),
    );
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  });
  test("submits successfully with valid credentials", async () => {
    renderSignup();
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(
      screen.getByLabelText(/repeat password/i),
      "password123",
    );
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.click(
      screen.getByRole("button", { name: /sign up for an account/i }),
    );
    expect(screen.queryByText("Can't be empty")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please enter a valid email"),
    ).not.toBeInTheDocument();
  });
  test("shows error when passwords do not match", async () => {
    renderSignup();
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(
      screen.getByLabelText(/repeat password/i),
      "different123",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /sign up for an account/i }),
    );
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});

function renderSignup() {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>,
  );
}
