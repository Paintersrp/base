import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AccordionQA from "./AccordionQA";

describe("AccordionQA", () => {
  it("renders the question and answer", () => {
    const faq = { id: 1, question: "What is this?", answer: "This is an FAQ." };
    const { getByText } = render(<AccordionQA faq={faq} />);

    expect(getByText(faq.question)).toBeInTheDocument();
    expect(getByText(faq.answer)).toBeInTheDocument();
  });

  it("expands the accordion when the question is clicked", () => {
    const faq = { id: 1, question: "What is this?", answer: "This is an FAQ." };
    const { getByText } = render(<AccordionQA faq={faq} />);

    fireEvent.click(getByText(faq.question));

    expect(getByText(faq.answer)).toBeVisible();
  });

  it("collapses the accordion when the question is clicked again", () => {
    const faq = { id: 1, question: "What is this?", answer: "This is an FAQ." };
    const { getByText } = render(<AccordionQA faq={faq} />);

    fireEvent.click(getByText(faq.question));
    fireEvent.click(getByText(faq.question));

    expect(getByText(faq.answer)).not.toBeVisible();
  });
});
