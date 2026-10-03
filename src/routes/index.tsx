import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameButton } from "../components/game-button";
import { GunPreview } from "../components/gun-preview";
import basicCase from "../assets/basic-case.png";
import chromaCase from "../assets/chroma-case.png";
import nebulaCase from "../assets/nebula-case.png";
import quantumCase from "../assets/quantum-case.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Case Clicker | Inventory" },
      { name: "description", content: "Open cases, collect skins, and upgrade your case clicker inventory." },
      { property: "og:title", content: "Case Clicker" },
      { property: "og:description", content: "Open cases, collect skins, and upgrade your inventory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Tab = "inventory" | "cases" | "upgrades";

type Reward = {
  name: string;
  price: number;
  rarity: "Mil-Spec" | "Restricted" | "Classified" | "Covert";
};

type InventoryItem = Reward & { id: number };

const rewards: Reward[] = [
  { name: "M4A1-S | Night Circuit", price: 18.42, rarity: "Mil-Spec" },
  { name: "AK-47 | Heatwave", price: 52.8, rarity: "Restricted" },
  { name: "AWP | Nebula Rift", price: 147.35, rarity: "Classified" },
  { name: "Desert Eagle | Crimson Core", price: 389.99, rarity: "Covert" },
];

const cases = [
  { name: "Basic Case", tone: "case-basic", image: basicCase, payout: 50, price: 5.2 },
  { name: "Chroma Case", tone: "case-chroma", image: chromaCase, payout: 75, price: 8.75 },
  { name: "Nebula Case", tone: "case-nebula", image: nebulaCase, payout: 100, price: 14.5 },
  { name: "Quantum Case", tone: "case-quantum", image: quantumCase, payout: 150, price: 25 },
] as const;

function Index() {
  const [tab, setTab] = useState<Tab>("inventory");
  const [wallet, setWallet] = useState(0);
  const [equippedCase, setEquippedCase] = useState(0);
  const [reward, setReward] = useState<Reward | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const activeCase = cases[equippedCase] ?? cases[0];

  const openCase = () => {
    const roll = Math.random();
    const rewardIndex = roll < 0.5 ? 0 : roll < 0.78 ? 1 : roll < 0.95 ? 2 : 3;
    const selectedReward = rewards[rewardIndex];
    if (!selectedReward) return;
    setReward(selectedReward);
  };

  return (
    <main className="game-shell">
      <header className="topbar">
        <div className="username">USERNAME</div>
        <div className="index-label">INDEX</div>
        <div className="wallet">Your Wallet: ${wallet.toFixed(2)}</div>
      </header>

      <section className="playfield">
        <div className="click-zone">
          <div className="equipped-case">
            <GameButton className="case-open-button" onClick={openCase} aria-label={`Open ${activeCase.name}`}>
            <img src={activeCase.image} alt={activeCase.name} width={816} height={816} />
            </GameButton>
            <strong>{activeCase.name}</strong>
            <span className="equipped-case-price">Case price: ${activeCase.price.toFixed(2)}</span>
            <GameButton
              className="accept-button"
              onClick={() => setWallet((value) => value + activeCase.payout)}
            >
              ACCEPT +${activeCase.payout.toFixed(2)}
            </GameButton>
          </div>
        </div>

        <aside className="panel">
          <nav className="tabs" aria-label="Game menu">
            {(["inventory", "cases", "upgrades"] as const).map((item) => (
              <GameButton
                key={item}
                className={`tab ${tab === item ? "tab-active" : ""}`}
                onClick={() => setTab(item)}
              >
                {item}
              </GameButton>
            ))}
          </nav>

          <div className="panel-content">
            {tab === "inventory" && (
              <div className="inventory-view">
                <div className="inventory-grid">
                  {inventory.map((item, index) => (
                    <GameButton
                      className={`inventory-item rarity-${item.rarity.toLowerCase()}`}
                      key={item.id}
                      title={`Sell ${item.name} for $${item.price.toFixed(2)}`}
                      onClick={() => {
                        setWallet((value) => value + item.price);
                        setInventory((items) => items.filter((ownedItem) => ownedItem.id !== item.id));
                      }}
                    >
                      <GunPreview className="inventory-gun" />
                      <small>{item.name}</small>
                      <strong>${item.price.toFixed(2)}</strong>
                    </GameButton>
                  ))}
                </div>
                <strong className="capacity">{inventory.length}/50</strong>
              </div>
            )}

            {tab === "cases" && (
              <div className="cases-view">
                {cases.map((caseItem, index) => (
                  <GameButton
                    className={`case-row ${caseItem.tone} ${equippedCase === index ? "case-equipped" : ""}`}
                    key={caseItem.name}
                    onClick={() => setEquippedCase(index)}
                  >
                    <img src={caseItem.image} alt="" width={816} height={816} loading="lazy" />
                    <strong>{caseItem.name}</strong>
                    <span>Case Price: ${caseItem.price.toFixed(2)}</span>
                  </GameButton>
                ))}
              </div>
            )}

            {tab === "upgrades" && (
              <div className="upgrades-view">
                <GameButton className="upgrade-card" onClick={() => setWallet((value) => Math.max(0, value - 500))}>
                  <strong>Key Discount</strong>
                  <span>Price: $500.00</span>
                </GameButton>
              </div>
            )}
          </div>
        </aside>
      </section>

      {reward && (
        <div className="reward-backdrop" role="presentation" onClick={() => setReward(null)}>
          <section
            className={`reward-popup rarity-${reward.rarity.toLowerCase()}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reward-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="reward-label">ITEM UNBOXED</span>
            <GunPreview className="reward-gun" />
            <h2 id="reward-title">{reward.name}</h2>
            <div className="reward-stats">
              <span><small>RARITY</small>{reward.rarity}</span>
              <span><small>VALUE</small>${reward.price.toFixed(2)}</span>
            </div>
            <GameButton
              className="collect-button"
              onClick={() => {
                if (inventory.length < 50) {
                  setInventory((items) => [...items, { ...reward, id: Date.now() + Math.random() }]);
                }
                setReward(null);
                setTab("inventory");
              }}
            >
              ADD TO INVENTORY
            </GameButton>
          </section>
        </div>
      )}
    </main>
  );
}
