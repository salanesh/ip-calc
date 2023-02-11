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
  }
  printData() {
    const { octVal, prefixVal } = this;
    console.log(octVal);
    console.log(prefixVal);
    console.log(this.numOfHosts());
  }
  numOfHosts() {
    return 2 ** (32 - this.prefixVal) - 2;
  }
  execute() {
    this.printData();
  }
}
