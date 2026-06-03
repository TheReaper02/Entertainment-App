import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";

describe("Login", () => {
  test("shows errors when fields are empty", async () => {
    renderLogin();
    await userEvent.click(
      screen.getByRole("button", { name: /login to your account/i }),
    );
    expect(screen.getAllByText("Can't be empty")).toHaveLength(2);
  });
  test("shows error for bad email", async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
    await userEvent.click(
      screen.getByRole("button", { name: /login to your account/i }),
    );
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  });
  test("submits successfully with valid credentials", async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(
      screen.getByRole("button", { name: /login to your account/i }),
    );
    expect(screen.queryByText("Can't be empty")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please enter a valid email"),
    ).not.toBeInTheDocument();
  });
});

function renderLogin() {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>,
  );
}
