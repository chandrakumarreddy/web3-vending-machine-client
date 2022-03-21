const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "donutsBalance",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingDonuts",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "amount", type: "uint8" }],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "amount", type: "uint8" }],
    name: "reStock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default (web3) => {
  return new web3.eth.Contract(
    abi,
    "0x85263B15942A6B30Eb95D70c84B3BAC1B997a115"
  );
};
