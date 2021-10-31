/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("Portfolio", () => {
  test("Render Portfolio page", async () => {
    const { render } = await getPage({
      route: "/portfolio",
    });
    render();
    expect(render).toMatchSnapshot();
  });
});
