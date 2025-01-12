import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/page";
import { EXAMPLE_TRANSCRIPT, EXAMPLE_OUTLINE } from "../app/constants";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Page", () => {
  it("renders 'CSV Transcript to Markdown' heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("CSV Transcript to Markdown");
  });

  it("renders transcript and outline textareas", () => {
    render(<Page />);

    const transcriptTextarea = screen.getByLabelText(/transcript csv/i);
    const outlineTextarea = screen.getByLabelText(/outline text/i);

    expect(transcriptTextarea).toBeInTheDocument();
    expect(outlineTextarea).toBeInTheDocument();
  });

  it("renders load example buttons", () => {
    render(<Page />);

    const exampleButtons = screen.getAllByRole("button", {
      name: /load example/i,
    });

    expect(exampleButtons).toHaveLength(2);
    expect(exampleButtons[0]).toBeInTheDocument();
    expect(exampleButtons[1]).toBeInTheDocument();
  });

  it("renders file upload labels", () => {
    render(<Page />);

    const transcriptUploadLabel = screen.getByLabelText(/upload csv/i);
    const outlineUploadLabel = screen.getByLabelText(/upload txt/i);

    expect(transcriptUploadLabel).toBeInTheDocument();
    expect(outlineUploadLabel).toBeInTheDocument();
  });

  it("loads example transcript when clicking load example", () => {
    render(<Page />);

    const transcriptTextarea = screen.getByLabelText(/transcript csv/i);
    const loadExampleButton = screen.getAllByRole("button", {
      name: /load example/i,
    })[0];

    fireEvent.click(loadExampleButton);

    expect(transcriptTextarea).toHaveValue(EXAMPLE_TRANSCRIPT);
  });

  it("loads example outline when clicking load example", () => {
    render(<Page />);

    const outlineTextarea = screen.getByLabelText(/outline text/i);
    const loadExampleButton = screen.getAllByRole("button", {
      name: /load example/i,
    })[1];

    fireEvent.click(loadExampleButton);

    expect(outlineTextarea).toHaveValue(EXAMPLE_OUTLINE);
  });

  it("renders the download button", () => {
    render(<Page />);

    const downloadButton = screen.getByRole("button", {
      name: /download markdown/i,
    });

    expect(downloadButton).toBeInTheDocument();
  });

  it("shows error message for invalid transcript", () => {
    render(<Page />);

    const transcriptTextarea = screen.getByLabelText(/transcript csv/i);

    fireEvent.change(transcriptTextarea, {
      target: { value: "invalid csv content" },
    });

    const errorMessage = screen.getByText(/invalid csv/i, {
      selector: ".text-red-500",
    });
    expect(errorMessage).toBeInTheDocument();
  });
});
