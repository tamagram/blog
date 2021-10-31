/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("Blog", () => {
  test("Render Blog page", async () => {
    const { render } = await getPage({
      route: "/blog",
    });
    render();
    expect(render).toMatchSnapshot();
  });
});
