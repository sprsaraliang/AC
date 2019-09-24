// variables
let priceOfCoffee = 30
let numberOfCups = 8
let priceTotal = priceOfCoffee * numberOfCups
let discount = 0.08

// write your answer here. Add calculation to discount 8% of total

/*你正在營運咖啡外送服務，每杯咖啡定價 30 元，客人決定他們要買的數量，兩者相乘就是總金額。
最近你推出了 8% 的折扣，因此需要重新設計收銀機程式的浮點數運算，但如果計算的結果不是整數，
就需要無條件進位。

現在有一張訂單，客人買了 8 杯咖啡，請修正你的收銀機程式，將回傳值放在 priceTotal 裡。*/


priceTotal=priceTotal*(1-discount);

if (String(priceTotal).indexOf(".") > -1)
{
    priceTotal=Math.round(priceTotal);   
}

console.log("priceTotal:$ "+priceTotal);
/// /////// System code; don't change //////////
priceTotal