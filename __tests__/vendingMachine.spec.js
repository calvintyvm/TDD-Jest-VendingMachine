const vendingMachine = require("../lib/vendingMachine");
const products = require("../__mocks__/inventory-data");
const coins = require("../__mocks__/coins-data");

let Machine = new vendingMachine(products, coins);

describe("vendingMachine", () => {
  describe("when getProducts is called", () => {
    it("should return all products", () => {
      const result = Machine.getProducts();
      expect(result).toEqual(products);
    });
  });
  describe("when stockUpProducts is called with a stock of 3", () => {
    it("should return stock up according to the name and amount of stock up", () => {
      const result = Machine.stockUpProducts(products.Coke.name, 10);
      expect(result).toEqual(13);
    });
  });
  describe("when stockUpProducts is called with a stock of 10", () => {
    it("should return There is x left and it does not need to be restocked", () => {
      const result = Machine.stockUpProducts(products.Redbull.name, 10);
      expect(result).toBe(
        `There is 10 left and it does not need to be restocked.`
      );
    });
  });
  //   describe("when stockUpAllProducts is called ", () => {
  //     it("should return addition to all stockup of inventory for products according to amount inputted (20)", () => {
  //       const result = Machine.stockUpAllProducts(20);
  //       expect(result).toBe(products);
  //     });
  //   });
  describe("when getCoins is called", () => {
    it("should return all coins", () => {
      const result = Machine.getCoins();
      expect(result).toEqual(coins);
    });
  });
  describe("when stockUpCoins is called with a stock of 10", () => {
    it("should return stockup according tot he name and amount of stockup", () => {
      const result = Machine.stockUpCoins(coins.Toonie.name, 20);
      expect(result).toEqual(30);
    });
  });
  describe("when stockUpCoins is called with a stock of 30", () => {
    it("should return There is x left and it does not need to be restocked", () => {
      const result = Machine.stockUpCoins(coins.Loonie.name, 20);
      expect(result).toBe(
        `There is 30 left and it does not need to be restocked.`
      );
    });
  });
  describe("when stockUpAllCoins is called ", () => {
    it("should return addition to all stockup of inventory for coins according to amount inputted (20)", () => {
      const result = Machine.stockUpAllCoins(20);
      expect(result).toBe(coins);
    });
  });
  describe("when chooseProduct is called for product with stock with exact amountInsterted to price", () => {
    it("should return Product", () => {
      const result = Machine.chooseProduct(products.Redbull.name, 2.0);
      expect(result).toBe(`Here is your Redbull.`);
    });
  });
  describe("when chooseProduct is called for product with stock with more amountInsterted to price", () => {
    it("should return Product", () => {
      const result = Machine.chooseProduct(products.Orange.name, 2.5);
      expect(result).toBe(`Here is your Orange.`);
    });
  });
  describe("when chooseProduct is called for product without stock with exact amountInsterted to price", () => {
    it("should return There is no more stock left, please pick another product", () => {
      const result = Machine.chooseProduct(products.Vodka.name, 2.5);
      expect(result).toBe(
        "There is no more stock left, please pick another product"
      );
    });
  });
  describe("when chooseProduct is called for product with stock without enough amountInsterted to price", () => {
    it("should return You do not have enough money, please put in amount needed", () => {
      const result = Machine.chooseProduct(products.Coke.name, 1.5);
      expect(result).toBe("You do not have enough money, please put in 0.25");
    });
  });
  describe("when chooseProduct is called for product with stock without $0 amountInsterted to price", () => {
    it("should return  You do not have enough money, please put in amount needed", () => {
      const result = Machine.chooseProduct(products.Coke.name, 0);
      expect(result).toBe("You do not have enough money, please put in 1.75");
    });
  });
  describe("when stock all stock coins are available and return change is called", () => {
    it("should return change according to totalpaid - itemprice", () => {
      const result = Machine.returnChange(1.8, 1.5);
      expect(result).toBe("Your change is Quarter:1 Nickel:1. Thank you.");
    });
  });
  //need to run this inunstocked data
  //   describe("when stock quarter && dimes are not stocked (quarter:0,dime:1) return change is called", () => {
  //     it("should return change according to totalpaid - itemprice and not use any stock that is less then 1", () => {
  //       const result = Machine.returnChange(2.0, 1.5);
  //       expect(result).toBe("Nickel:10");
  //     });
  //   });
});
