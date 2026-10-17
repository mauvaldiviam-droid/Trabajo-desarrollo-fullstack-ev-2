import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Login from "../pages/Login";
import { TiendaContext } from "../context/TiendaContext";

describe("Login Page / Form", () => {
  it("debe renderizar los campos de correo y contraseña junto al botón de acceso", () => {
    render(
      <TiendaContext.Provider value={{ login: vi.fn() }}>
        <Login />
      </TiendaContext.Provider>
    );

    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it("debe mostrar alerta o prevenir envío si los campos están vacíos", async () => {
    const mockLogin = vi.fn();
    render(
      <TiendaContext.Provider value={{ login: mockLogin }}>
        <Login />
      </TiendaContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    // Validamos que el login no se ejecuta si hay campos vacíos
    expect(mockLogin).not.toHaveBeenCalled();
  });
});