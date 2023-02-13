const calcButton = document.querySelector("#calcButton");
const octFields = document.querySelectorAll(".oct-fields");
const prefix = document.querySelector("#prefix");

calcButton.addEventListener("click", function () {
  try {
    let ipAdd = basicValidator();
    let ipAddData = new calcFunc(ipAdd);
    ipAddData.execute();
  } catch (e) {
    alert(e);
  }
});

const basicValidator = () => {
  let octVal = [];
  let temp;
  let prefixVal;
  for (field of octFields) {
    temp = Number(field.value);
    if (temp >= 0 && temp <= 255) {
      octVal.push(temp);
    } else {
      throw "Please input a number between 0 and 255";
    }
  }
  temp = Number(prefix.value);
  if (temp >= 1 && temp <= 32) {
    prefixVal = temp;
  } else {
    throw "Please input a prefix that is between 1 and 32";
  }
  return { octVal, prefixVal };
};

class calcFunc {
  constructor(ipAdd) {
    this.octVal = ipAdd.octVal;
    this.prefixVal = ipAdd.prefixVal;
    this.binaryOctets = this.convertBinary();
    this.hostNum = this.numOfHosts();
    this.subnetBinary = this.subnetFromPrefix();
    this.subnetDecimal = this.decimalMaker(this.subnetBinary);
    this.networkAddBinary = this.netAddCalc();
  }
  printData() {
    const { octVal, prefixVal, binaryOctets } = this;
    console.log(octVal);
    console.log(prefixVal);
    console.log(binaryOctets);
    console.log(this.subnetBinary);
    console.log(this.subnetDecimal);
    console.log(this.numOfHosts());
    console.log(this.networkAddBinary);
  }
  convertBinary() {
    const { octVal } = this;
    let binaryOctets = [];
    for (let i = 0; i < octVal.length; i++) {
      binaryOctets.push(octVal[i].toString(2));
    }
    return binaryOctets;
  }
  numOfHosts() {
    return 2 ** (32 - this.prefixVal) - 2;
  }
  subnetFromPrefix() {
    let subnetBinary = [];
    let temp = "";
    let count = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        if (count < this.prefixVal) {
          temp += "1";
          count++;
        } else {
          temp += "0";
        }
      }
      subnetBinary.push(temp);
      temp = "";
    }
    return subnetBinary;
  }
  decimalMaker(binary) {
    let decimal = [];
    for (let x = 0; x < 4; x++) {
      decimal.push(parseInt(binary[x], 2));
    }
    return decimal;
  }
  netAddCalc() {
    let networkAdd = [];
    const { binaryOctets, subnetBinary } = this;
    for (let i = 0; i < 4; i++) {
      networkAdd.push(binaryOctets[i] && subnetBinary[i]);
    }
    return networkAdd;
  }
  execute() {
    this.printData();
    // this.subnetFromPrefix();
  }
}
