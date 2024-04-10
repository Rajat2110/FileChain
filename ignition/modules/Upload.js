const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Upload", (m) => {
  const upload = m.contract("Upload");

  return { upload };
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3