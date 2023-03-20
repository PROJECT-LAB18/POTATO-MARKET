export default function moneyUnit(number) {
  let inputNumber = number < 0 ? false : number;
  if(number<10000){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  let unitWords = ["", "만", "억", "조", "경"];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = "";

  for (let i = 0; i < splitCount; i++) {
    let unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + `${resultString%10000===0?'':' '}` + resultString;
  }
  return resultString;
}