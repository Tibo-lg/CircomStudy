Install the required node modules by running:
```shell
npm install
```

Compiling and testing:

```shell
scripts/compile-Multiplier3-groth16.sh
scripts/compile-Multiplier3-plonk.sh
node scripts/bump-solidity.js && npx hardhat test
```
