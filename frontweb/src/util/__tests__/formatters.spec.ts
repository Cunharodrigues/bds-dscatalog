import { formatPrice } from "util/formatters";

test('formatPrice should format umber pt-BR when give 10.1', () => {
    
   const result = formatPrice(10.1);
    expect(result).toEqual("10,10");
});