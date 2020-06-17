import { validBase64 } from "./faceRecApi";
const faceRecApi = require("./faceRecApi");

describe("faceRecApi", () => {
  it("should return false if base64 image is invalid", async () => {
    const mockValidBase64 = jest.spyOn(faceRecApi, "validBase64");
    const result = mockValidBase64("abc");

    expect(validBase64).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it("should return true if base64 image is valid", async () => {
    const mockValidBase64 = jest.spyOn(faceRecApi, "validBase64");
    const result = mockValidBase64(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
    );

    expect(validBase64).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
