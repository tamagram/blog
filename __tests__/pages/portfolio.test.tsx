/**
 * @jest-environment jsdom
 */
import { getPage } from "next-page-tester";

describe("Portfolio", () => {
  test("Render Portfolio page", async () => {
    const { serverRenderToString } = await getPage({
      route: "/portfolio",
    });
    expect(serverRenderToString().html).toMatchSnapshot();
  });
});
