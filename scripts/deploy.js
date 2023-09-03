require("dotenv").config();
const hre = require("hardhat");
const fs = require("fs");
async function deploy() {
    console.log(
        "Deploy Start ======================================================"
    );
    const ethers = hre.ethers;

    const [deployer] = await ethers.getSigners();
    // const balance = await deployer.getBalance();
    // const gasPriceData = await ethers.provider.getGasPrice();
    console.log("Deployer :", deployer.address);
    // console.log("Balance :", formatSingleNumber(balance));
    // console.log("Gas Price :", ethers.utils.formatUnits(gasPriceData, "gwei"));

    const contractName1 = "CardSBT";
    const contractName2 = "CardSocialToken";
    let Contract = await ethers.getContractFactory(contractName1);
    let contract = await Contract.deploy();
    let result1 = await contract.waitForDeployment();

    Contract = await ethers.getContractFactory(contractName2);
    contract = await Contract.deploy();
    let result2 = await contract.waitForDeployment();

    console.log(
        "Deploy Success ===================================================="
    );
    console.log("Address1 :", await result1.getAddress());
    console.log("Address2 :", await result2.getAddress());

    const deployedJson = {};
    deployedJson[contractName1] = await result1.getAddress();
    deployedJson[contractName2] = await result2.getAddress();

    fs.writeFileSync("deployed-address.json", JSON.stringify(deployedJson));

    // const usedData = await deployer.getBalance();
    // console.log("Gas Used:", ethers.formatEther(`${balance - usedData}`));
    // console.log("Balance :", formatSingleNumber(usedData));
    console.log(
        "Deploy Over ======================================================="
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
