/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("About", () => {
  test("Render About page", async () => {
    const { render } = await getPage({
      route: "/",
    });
    render();
    expect(render).toMatchSnapshot();
  });
});
