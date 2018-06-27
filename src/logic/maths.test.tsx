import { formatCentigradeFromKelvin, formatFahrenheitFromKelvin, formatKMHFromMS, formatMPHFromMS, formatDegToCard } from "./maths";

describe("format", () => {
    it("formatCentigradeFromKelvin", () => {
        const result = formatCentigradeFromKelvin(300);
        expect(result).toEqual("27");
    });

    it("formatFahrenheitFromKelvin", () => {
        const result = formatFahrenheitFromKelvin(300);
        expect(result).toEqual("80");
    });

    it("formatKMHFromMS", () => {
        const result = formatKMHFromMS(10);
        expect(result).toEqual("36");
    });

    it("formatMPHFromMS", () => {
        const result = formatMPHFromMS(10);
        expect(result).toEqual("22");
    });

    it("formatDegToCard", () => {
        const result = formatDegToCard(180);
        expect(result).toEqual("S");
    });
});