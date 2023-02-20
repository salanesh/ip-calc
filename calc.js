document.addEventListener("DOMContentLoaded",function(){
  const calcButton = document.querySelector("#calcButton");
  const octFields = document.querySelectorAll(".oct-fields");
  const prefix = document.querySelector("#prefix");
  const tbodyElement = document.querySelector("tbody");
  const resetButton = document.querySelector("#resetButton");
  
  
  
  
  const resetFields = ()=>{
    const octFields = document.querySelectorAll(".oct-fields");
    for(let i=0;i<5;i++){
    octFields[i].value="";
    }
    octFields[0].focus();
    octFields[0].select();
    // console.log("reset clicked");
  }  
  const basicValidator = () => {
    let octValDecimal = [];
    let temp;
    let prefixVal;
    for (field of octFields) {
      temp = Number(field.value);
      if (temp >= 0 && temp <= 255) {
        octValDecimal.push(temp);
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
    return { octValDecimal, prefixVal };
  };
  const displayThisShit = (data) => {
    console.log(data);
    let tableRowElement = document.createElement("tr");
    for (let i = 0; i < 6; i++) {
      let tableHeadElement = document.createElement("th");
      let tableStr = "";
      if (i < 5) {
        for (let x = 0; x < 4; x++) {
          if (x < 3) {
            tableStr += data[i][x] + ".";
          } else {
            tableStr += data[i][x];
          }
        }
      } else {
        tableStr = data[i];
      }
      tableHeadElement.innerText = tableStr;
      tableRowElement.appendChild(tableHeadElement);
    }
    tbodyElement.appendChild(tableRowElement);
  };
  
  class calcFunc {
    constructor(ipAdd) {
      this.octValDecimal = ipAdd.octValDecimal;
      this.prefixVal = ipAdd.prefixVal;
      this.octValBinary = this.convertBinary(this.octValDecimal);
      this.hostNum = this.numOfHosts();
      this.subnetBinary = this.subnetFromPrefix();
      this.subnetDecimal = this.decimalMaker(this.subnetBinary);
      this.networkAdd = this.netAddCalc();
      this.broadcastAdd = this.broadcastCalc();
    }
    printData() {
      console.log(this);
    }
    convertBinary(arrDecimal) {
      let arrBinary = [];
      for (let i = 0; i < arrDecimal.length; i++) {
        arrBinary.push(arrDecimal[i].toString(2));
      }
      return arrBinary;
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
      const { octValDecimal, subnetDecimal } = this;
      for (let i = 0; i < 4; i++) {
        networkAdd.push(octValDecimal[i] & subnetDecimal[i]);
      }
      return networkAdd;
    }
    broadcastCalc() {
      let broadcastAdd = [];
      let inverseSubnet = [];
      let temp = "";
      const { octValDecimal, subnetBinary } = this;
      for (let i = 0; i < 4; i++) {
        for (let x = 0; x < 8; x++) {
          if (subnetBinary[i][x] == "1") {
            temp += "0";
          } else {
            temp += "1";
          }
        }
        inverseSubnet.push(temp);
        temp = "";
      }
      inverseSubnet = this.decimalMaker(inverseSubnet);
      for (let y = 0; y < 4; y++) {
        broadcastAdd.push(octValDecimal[y] | inverseSubnet[y]);
      }
      return broadcastAdd;
    }
    relevantDataArrGen() {
      const ipAdd = this.octValDecimal;
      const networkAdd = this.networkAdd;
      const broadcastAdd = this.broadcastAdd;
      let firstHost = this.networkAdd.slice();
      firstHost[3] += 1;
      let lastHost = this.broadcastAdd.slice();
      lastHost[3] -= 1;
      const hostNum = this.hostNum;
      return [ipAdd, networkAdd, broadcastAdd, firstHost, lastHost, hostNum];
    }
  }
  calcButton.addEventListener("click", function () {
    try {
      let ipAdd = basicValidator();
      let ipAddData = new calcFunc(ipAdd);
      displayThisShit(ipAddData.relevantDataArrGen());
      resetFields();
    } catch (e) {
      alert(e);
    }
  });
  resetButton.addEventListener("click",resetFields);    
});
