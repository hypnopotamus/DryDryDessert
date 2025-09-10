import { asCurrency } from "./asCurrency";

describe("asCurrent", () => {
    it("returns the USD currency representation in the default locale", () => {
        const amount = 1234567.8901234;

        const currency = asCurrency(amount);

        expect(amount.toLocaleString(navigator.language, { style: 'currency', currency: 'USD' })).toEqual(currency);
    });

    describe("when the amount is undefined", () => {
        it("returns 0 as currency", () => {
            const amount: number | undefined = undefined;

            const currency = asCurrency(amount);

            expect(asCurrency(0)).toEqual(currency);
        });
    })
});