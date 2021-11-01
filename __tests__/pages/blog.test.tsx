/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("Blog", () => {
  test("Render Blog page", async () => {
    const { serverRenderToString } = await getPage({
      route: "/blog",
    });
    expect(serverRenderToString().html).toMatchSnapshot();
  });
});
