const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/;

const verifierRegex = /contract Verifier/;

function replaceInFile(contractName) {
  let path = "./contracts/" + contractName + ".sol";
  let content = fs.readFileSync(path, { encoding: "utf-8" });
  let bumped = content.replace(solidityRegex, "pragma solidity ^0.8.0");
  bumped = bumped.replace(verifierRegex, "contract " + contractName);
  fs.writeFileSync(path, bumped);
}

replaceInFile("LessThan10Verifier");
replaceInFile("RangeProofVerifier");
