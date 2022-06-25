/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("About", () => {
  test("Render About page", async () => {
    const { serverRenderToString } = await getPage({
      route: "/about",
    });
    expect(serverRenderToString().html).toMatchSnapshot();
  });
});
