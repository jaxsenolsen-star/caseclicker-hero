import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameButton } from "../components/game-button";

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

const inventory = [
  { price: "$50.00", tone: "cyan" },
  { price: "$50.00", tone: "green" },
  { price: "$50.00", tone: "red" },
  { price: "$100.00", tone: "orange" },
  { price: "$50.00", tone: "peach" },
  { price: "$50.00", tone: "sunset" },
  { price: "$50.00", tone: "spectrum" },
  { price: "$50.00", tone: "nebula" },
] as const;

const cases = [
  { name: "Basic Case", tone: "case-basic" },
  { name: "Chroma Case", tone: "case-chroma" },
  { name: "Nebula Case", tone: "case-nebula" },
  { name: "Quantum Case", tone: "case-quantum" },
] as const;

function Index() {
  const [tab, setTab] = useState<Tab>("inventory");
  const [wallet, setWallet] = useState(999999999);
  const [clicks, setClicks] = useState(0);

  return (
    <main className="game-shell">
      <header className="topbar">
        <div className="username">USERNAME</div>
        <div className="index-label">INDEX</div>
        <div className="wallet">Your Wallet: ${wallet.toFixed(2)}</div>
      </header>

      <section className="playfield">
        <GameButton
          aria-label="Click to earn money"
          className="click-zone"
          onClick={() => {
            setClicks((value) => value + 1);
            setWallet((value) => value + 1);
          }}
        >
          {clicks > 0 && <span className="click-count">+${clicks}</span>}
        </GameButton>

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
                    <div className={`inventory-item item-${item.tone}`} key={`${item.tone}-${index}`}>
                      <strong>{item.price}</strong>
                    </div>
                  ))}
                </div>
                <strong className="capacity">8/50</strong>
              </div>
            )}

            {tab === "cases" && (
              <div className="cases-view">
                {cases.map((caseItem) => (
                  <GameButton className={`case-row ${caseItem.tone}`} key={caseItem.name}>
                    <strong>{caseItem.name}</strong>
                    <span>Key Price: $1.20 | Case Price: $4.00</span>
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
    </main>
  );
}
