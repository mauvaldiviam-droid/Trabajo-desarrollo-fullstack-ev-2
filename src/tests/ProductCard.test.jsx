import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    nombre: "Brocha",
    precio: 5990,
    imagen: "/img/descarga.png"
  };

  it("debe mostrar el nombre y el precio del producto correctamente", () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText("Brocha")).toBeInTheDocument();
    expect(screen.getByText(/5.990/i)).toBeInTheDocument();
  });

  it("debe ejecutar la función onAddToCart al hacer clic en el botón de comprar/agregar", () => {
    const handleAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const addButton = screen.getByRole("button", { name: /agregar/i });
    fireEvent.click(addButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});