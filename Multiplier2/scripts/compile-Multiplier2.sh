#!/bin/bash

cd contracts/circuits

mkdir Multiplier2

if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

echo "Compiling Multiplier2.circom..."

# compile circuit

circom Multiplier2.circom --r1cs --wasm --sym -o Multiplier2
snarkjs r1cs info Multiplier2/Multiplier2.r1cs

# Start a new zkey and make a contribution

snarkjs groth16 setup Multiplier2/Multiplier2.r1cs powersOfTau28_hez_final_10.ptau Multiplier2/circuit_0000.zkey
snarkjs zkey contribute Multiplier2/circuit_0000.zkey Multiplier2/circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
snarkjs zkey export verificationkey Multiplier2/circuit_final.zkey Multiplier2/verification_key.json

# generate solidity contract
snarkjs zkey export solidityverifier Multiplier2/circuit_final.zkey ../Multiplier2Verifier.sol

cd ../..