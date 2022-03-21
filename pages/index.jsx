import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { vmContract, account, web3 } = props;
  const [inventory, setInventory] = useState(0);
  const [balance, setBalance] = useState(null);
  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods.getRemainingDonuts().call();
    setInventory(inventory);
  };
  const getDountBalalnce = async () => {
    const _balance = await vmContract.methods.donutsBalance(account).call();
    console.log(_balance);
    setBalance(_balance);
  };
  useEffect(() => {
    if (vmContract) {
      getInventoryHandler();
      if (account) {
        getDountBalalnce(account);
      }
    }
  }, [vmContract, account]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vmContract.methods
        .purchase(parseInt(event.target.donuts.value))
        .send({
          from: account,
          value: web3.utils.toWei("0.0002", "ether"),
        });
    } catch (error) {
      console.log(error);
    }
  };
  const restock = async () => {
    try {
      await vmContract.methods.reStock(100).call();
      setInventory((s) => s + 100);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <main className={styles.container}>
      <div>
        <h2>Vending machine inventory: {inventory}</h2>
      </div>
      <div>
        <h2>Your Balance: {balance}</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.donuts}>
            <p>Enter donuts to buy</p>
            <input type="text" placeholder="enter value" name="donuts" />
          </div>
          <button type="submit" className={styles.addBtn}>
            ADD
          </button>
        </form>
      </div>
      <button onClick={restock} className={styles.restock}>
        RESTOCK
      </button>
    </main>
  );
}
