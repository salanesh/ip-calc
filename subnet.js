document.addEventListener("DOMContentLoaded", function () {
  const octFields = document.querySelectorAll(".oct-fields");
  const cidrFields = document.querySelectorAll(".cidr-fields");
  const subnetButton = document.querySelector("#subnetButton");
  const resetButton = document.querySelector("#resetButton");

  const validator = () => {
    let num = 0;
    let octetVals = [];
    let cidrVals = [];
    for (let i = 0; i < 4; i++) {
      num = Number.parseInt(octFields[i].value);
      if (num >= 0 && num <= 255) {
        octetVals.push(num);
      } else {
        throw new Error("Octets must be a number from 0 to 255");
      }
    }
    for (let i = 0; i < 2; i++) {
      num = Number.parseInt(cidrFields[i].value);
      if (num >= 1 && num <= 32) {
        cidrVals.push(num);
      } else {
        throw new Error("CIDR value must be a number from 1 to 32");
      }
    }
    return { octetVals, cidrVals };
  };
  subnetButton.addEventListener("click", function () {
    try {
      let shit = validator();
      console.log(shit);
    } catch (e) {
      alert(e);
    }
  });
});
