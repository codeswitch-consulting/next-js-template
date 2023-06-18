import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./index";

describe("App", () => {
    it("renders correctly", () => {
        render(<App />);
        expect(screen.getByText(/Welcome to NativeBase/i)).toBeDefined();
    });
});
