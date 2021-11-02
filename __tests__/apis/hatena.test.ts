import getXmlDocument from "../../apis/hatena";

describe("test getXmlDocument", () => {
  test("fetch document", async () => {
    const want = "object";
    const got = await getXmlDocument();
    expect(typeof got === want).toBeTruthy();
  });
});

describe