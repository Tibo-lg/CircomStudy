const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { groth16, plonk } = require("snarkjs");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

(async () => {
  let Verifier = await ethers.getContractFactory("LessThan10Verifier");
  let verifier = await Verifier.deploy();
  await verifier.deployed();

  const circuit = await wasm_tester("contracts/circuits/LessThan10.circom");

  const INPUT = {
    in: 10,
  };

  const witness = await circuit.calculateWitness(INPUT, true);
  console.log(witness);
  let a = witness.map((x) => Fr.e(x));

  console.log(a);
})().catch((e) => {
  console.log(e);
});
