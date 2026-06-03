import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import userEvent from "@testing-library/user-event";

describe("Card component", () => {
  test("renders title and description", () => {
    render(
      <Card
        variant='recommended'
        imageSmall=''
        imageMedium=''
        imageLarge=''
        title='Dark Side of the Moon'
        description='This is a test show.'
        year={2021}
        category='Movie'
        rating='PG'
        isBookmarked={false}
        dispatch={() => {}}
      />,
    );
    expect(screen.getByText("Dark Side of the Moon")).toBeInTheDocument();
  });
  test("renders bookmark", async () => {
    const mockDispatch = vi.fn();
    render(
      <Card
        variant='recommended'
        imageSmall=''
        imageMedium=''
        imageLarge=''
        title='Dark Side of the Moon'
        description='This is a test show.'
        year={2021}
        category='Movie'
        rating='PG'
        isBookmarked={true}
        dispatch={mockDispatch}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /toggle bookmark/i }),
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_BOOKMARK",
      payload: "Dark Side of the Moon",
    });
  });
});
