# Source list

Feasibility research: could Redbelly plug into Quant's Overledger? Research cut-off: 23 October 2026.

Part 1 lists every claim in the report that cites a source, with its label and links. Part 2 lists every source, what it supports, and the exact phrases `npm run audit -- --online` re-checks on the live page.

Labels: **Confirmed** is stated in the linked source. **Analysis** is reasoning built on the linked sources. **Unknown** names a gap; any link shows where the question was checked. **Context**, **Definition** and **Method** lines frame the report.

## Part 1: claims and their sources (132)

| # | Section | Label | Claim | Sources |
|---|---|---|---|---|
| C001 | read-first | Context | No partnership, talks or plans. Redbelly and Quant have no announced partnership or talks, and nothing in this report suggests otherwise. | [S38](https://taskboard.redbellydao.network/tasks/TASK-29) |
| C002 | read-first | Context | Redbelly has not published an official position on bridging, so anything that is not in a public source is treated here as unknown. | [S38](https://taskboard.redbellydao.network/tasks/TASK-29) |
| C003 | read-first | Context | Overledger's documentation says its list of supported networks can change and that the live list comes from its API, so parts of this picture can change quickly. | [S07](https://docs.overledger.dev/docs/connectors) |
| C004 | short-answer | Confirmed | Public, permissionless networks in six families, including EVM, can be added self-serve; permissioned and consortium networks need a managed engagement with Quant's team. | [S07](https://docs.overledger.dev/docs/connectors) |
| C005 | short-answer | Confirmed | Redbelly runs EVM smart contracts written in Solidity and its mainnet is chain ID 151. | [S24](https://vine.redbelly.network/sc-smart-contracts) [S22](https://vine.redbelly.network/environments/) |
| C006 | short-answer | Confirmed | On Redbelly, an account can only write to the network after it claims an access credential from an accredited issuer. | [S29](https://redbelly.network/blog/devnet) [S17](https://docs.redbelly.network/pages/modules/issuer/) [S28](https://access.redbelly.network/) |
| C007 | short-answer | Confirmed | Redbelly is not named in any of the Overledger documentation pages listed in this report, and it is not one of the networks Fusion Rollup connected at testnet launch. | [S05](https://docs.overledger.dev/docs/start-here) [S06](https://docs.overledger.dev/docs/overview) [S07](https://docs.overledger.dev/docs/connectors) [S10](https://docs.overledger.dev/docs/overledger-firewall) [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C008 | short-answer | Analysis | Read Redbelly data through Overledger / Reach / Possible on paper, untested / An account registering a Redbelly node through self-serve, and Quant accepting it | [S07](https://docs.overledger.dev/docs/connectors) |
| C009 | short-answer | Analysis | Pass signed Redbelly transactions through Overledger / Reach / Possible on paper, untested / The same, plus every sending address holding Redbelly write access | [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C010 | short-answer | Analysis | Redbelly listed for all Overledger users / Reach / Not available today / A public node from a whitelisted provider, or a Quant engagement | [S07](https://docs.overledger.dev/docs/connectors) |
| C011 | short-answer | Analysis | Quant-held keys signing on Redbelly / Orchestrate / Unknown / Quant support, and whose identity the signing address would be verified under | [S09](https://docs.overledger.dev/docs/signing) [S29](https://redbelly.network/blog/devnet) |
| C012 | short-answer | Analysis | Bridge flow in Quant Connect to Redbelly / Move / Not available today / Quant supporting Redbelly as a destination for the bridge flow | [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) |
| C013 | short-answer | Analysis | Redbelly as a Fusion Rollup base chain / Move / Not possible yet / A Quant project; no self-serve route is documented | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C014 | short-answer | Analysis | Reaching TCH's On-Chain Money network / Move / Unknown / TCH and its banks; the network's ledgers are not public | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C015 | why-now | Confirmed | On 24 September 2026, The Clearing House (TCH) announced that it had selected Quant to power its On-Chain Money Initiative, a network for clearing and settling tokenised deposits between financial institutions. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C016 | why-now | Confirmed | Quant says its technology will provide the network's interoperability, orchestration and transaction-management layer, with connections to existing fiat payment systems such as RTP and CHIPS. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/) [S03](https://quant.network/news/quant-powers-the-clearing-houses-on-chain-money-initiative-in-the-us/) |
| C017 | why-now | Confirmed | TCH expects the network to be available to participating institutions in the first half of 2027. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C018 | why-now | Confirmed | The initiative was first unveiled in June 2026 as a bank-led effort that TCH operates. | [S04](https://www.theclearinghouse.org/payment-systems/Articles/2026/06/Major-Financial-Institutions-Unveil-Bank-Led-On-Chain-Money-Initiative) |
| C019 | why-now | Confirmed | Quant also says it will offer a shared Tokenised Deposits-as-a-Service platform to US institutions that process through TCH but do not yet have tokenised deposit capability. | [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/) |
| C020 | why-now | Unknown | The announcements we reviewed do not say which blockchains the On-Chain Money network will run on, or whether it will connect to public chains at all. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S02](https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/) [S03](https://quant.network/news/quant-powers-the-clearing-houses-on-chain-money-initiative-in-the-us/) |
| C021 | overledger | Confirmed | It gives developers one set of credentials and one API across networks. | [S05](https://docs.overledger.dev/docs/start-here) |
| C022 | overledger | Confirmed | It checks who is calling, routes each request to a Connector or to the Fusion Rollup, applies rate limits and runs multi-step workflows called Flow Applications. | [S06](https://docs.overledger.dev/docs/overview) |
| C023 | overledger | Confirmed | Behind it, each family of blockchains has its own pool of nodes, made up of nodes Quant runs and nodes that customers register. | [S07](https://docs.overledger.dev/docs/connectors) |
| C024 | overledger | Confirmed | Overledger Firewall. Access control in two layers: an off-chain check of whether a user may reach a network, and an on-chain Fusion Firewall that allowlists addresses for contract calls, cross-chain messages and token bridging. | [S10](https://docs.overledger.dev/docs/overledger-firewall) |
| C025 | overledger | Confirmed | Fusion Rollup. A rollup built as a fork of the OP Stack that anchors to several base chains at once, giving one EVM-compatible environment across them. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C026 | overledger | Confirmed | The Gateway never sees private keys. | [S09](https://docs.overledger.dev/docs/signing) |
| C027 | overledger | Confirmed | Signing in gives the token used to create API keys, and Quant Connect hosts the bridge flow, which deploys a destination token contract and returns a Bridge ID. | [S08](https://docs.overledger.dev/docs/authentication) [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) |
| C028 | overledger | Confirmed | Overledger also documents webhooks for smart contract events and publishes a full API reference. | [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) [S13](https://docs.overledger.dev/reference) |
| C029 | overledger | Confirmed | Overledger's documentation describes two routes onto its Connectors: | [S07](https://docs.overledger.dev/docs/connectors) |
| C030 | overledger | Confirmed | Each node is either public, which is only allowed from whitelisted providers, or private, which can come from any domain. | [S07](https://docs.overledger.dev/docs/connectors) |
| C031 | overledger | Confirmed | The documentation says that a network exposing RPC over HTTPS with bearer or API-key authentication can normally be onboarded. | [S07](https://docs.overledger.dev/docs/connectors) |
| C032 | overledger | Confirmed | The Gateway blocks administrative RPC methods; for EVM networks the examples are personal_*, admin_* and txpool_*. | [S07](https://docs.overledger.dev/docs/connectors) |
| C033 | overledger | Confirmed | Each network has a visibility of public, permissioned or private, and the live list of networks comes from the API (GET /networks), not from a fixed page. | [S07](https://docs.overledger.dev/docs/connectors) |
| C034 | overledger | Confirmed | For permissioned networks, the Firewall only lets through users who are on that network's allowlist. | [S10](https://docs.overledger.dev/docs/overledger-firewall) |
| C035 | overledger | Confirmed | At testnet launch they were Ethereum Sepolia, Polygon Amoy and a Quant-run permissioned Besu testnet. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C036 | overledger | Confirmed | Fusion's building blocks are deposit, unify, trigger and withdraw or mint, which cover moving value and calling contracts across chains. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C037 | overledger | Confirmed | To send a cross-chain message, a sender on a connected chain must be allowlisted for the specific rollup contract it wants to reach, and the firewall is locked down on mainnet while being more permissive on testnet. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C038 | overledger | Confirmed | Quant's own documentation lists the known risks of bridges built as separate contracts: lock-and-mint mismatches, custodian compromise and oracle failure. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C039 | overledger | Unknown | The pages we reviewed describe which chains Fusion connected, not how a chain is added. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C040 | redbelly | Confirmed | Purpose. Redbelly describes itself as a layer 1 blockchain built for real world asset tokenisation. | [S15](https://docs.redbelly.network/) |
| C041 | redbelly | Confirmed | EVM base. Redbelly executes smart contracts written for the EVM in Solidity. | [S24](https://vine.redbelly.network/sc-smart-contracts) |
| C042 | redbelly | Confirmed | Mainnet is chain ID 151 and Testnet is chain ID 153, and Redbelly publishes a public RPC address for each. | [S22](https://vine.redbelly.network/environments/) |
| C043 | redbelly | Confirmed | Its developer portal credits these two for the network's security, finality and scalability. | [S23](https://vine.redbelly.network/consensus/) |
| C044 | redbelly | Confirmed | Fees. The unit price of gas is fixed in US dollar terms and converted to RBNT at execution through an on-chain price oracle. | [S25](https://vine.redbelly.network/network-fees/) |
| C045 | redbelly | Confirmed | Identity before writing. Receptor is Redbelly's identity and verifiable credential protocol, built on the W3C verifiable credential data model. | [S16](https://docs.redbelly.network/pages/receptor/) |
| C046 | redbelly | Confirmed | Only accredited issuers can issue the credentials that give network access. | [S16](https://docs.redbelly.network/pages/receptor/) [S17](https://docs.redbelly.network/pages/modules/issuer/) |
| C047 | redbelly | Confirmed | Users must claim an access credential from an accredited issuer before they can enable their accounts with write access. | [S29](https://redbelly.network/blog/devnet) |
| C048 | redbelly | Confirmed | The accredited issuer named in the Redbelly access app is Averer, which verifies identity before issuing the Redbelly Network Access Credential. | [S28](https://access.redbelly.network/) |
| C049 | redbelly | Confirmed | Users prove a photo identity document through biometric checks. | [S27](https://vine.redbelly.network/id-accessing-the-network) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C050 | redbelly | Confirmed | Community builders report that unverified wallets cannot send any transaction ("Sender not authorised to write transactions") and that Mainnet and Testnet approvals are separate. | [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C051 | redbelly | Confirmed | Institutions. Companies and trusts can register through Redbelly's Business verification process. | [S30](https://vine.redbelly.network/nodes/operator-guide/) |
| C052 | redbelly | Confirmed | Existing cross-chain routes. Redbelly's developer portal lists routes for RBNT to Base via LayerZero and to Ethereum mainnet via Polymer, and points to Lucid Labs Bridge for moving RBNT back to Redbelly. | [S26](https://vine.redbelly.network/native-currency/) |
| C053 | redbelly | Confirmed | Celer's cBridge connects Redbelly with Ethereum and BNB Chain using a pegged bridge model. | [S32](https://blog.celer.network/2025/08/01/celer-announces-cbridge-support-for-redbelly/) |
| C054 | redbelly | Confirmed | Redbelly announced Wrapped RBNT on Ethereum at contract 0xb45ffb51984d626ee758b336c61cf20990c6bf13. | [S33](https://x.com/RedbellyNetwork/status/1890340030197166112) |
| C055 | redbelly | Confirmed | LayerZero lists Redbelly Mainnet among its V2 deployments. | [S34](https://docs.layerzero.network/v2/deployments/deployed-contracts) |
| C056 | redbelly | Confirmed | Community bridges. A winning DAO Task Board entry is a reference bridge that moves ETH from Ethereum Sepolia to Redbelly Testnet using lock-and-mint with a 2-of-3 relayer set. | [S35](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-08-bridge-integration-guide) |
| C057 | redbelly | Confirmed | A DAO recovery playbook documents how bridged RBNT can get stuck, for example Polymer transfers to Ethereum that need to be relayed by hand. | [S37](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-16-cross-chain-recovery-playbook) |
| C058 | redbelly | Analysis | LayerZero, Polymer, Celer and Lucid Labs already do it. | [S26](https://vine.redbelly.network/native-currency/) [S32](https://blog.celer.network/2025/08/01/celer-announces-cbridge-support-for-redbelly/) [S34](https://docs.layerzero.network/v2/deployments/deployed-contracts) |
| C059 | redbelly | Analysis | Second, Redbelly is open to read through its public RPC but gated to write: every sending account must be identity-verified. | [S22](https://vine.redbelly.network/environments/) [S29](https://redbelly.network/blog/devnet) |
| C060 | redbelly | Analysis | Overledger sorts networks into public, permissionless ones (self-serve) and permissioned ones (engagement). | [S07](https://docs.overledger.dev/docs/connectors) |
| C061 | connect-now | Confirmed | Self-serve onboarding covers networks that Overledger does not list yet, if their family is supported, and EVM is a supported family. | [S07](https://docs.overledger.dev/docs/connectors) |
| C062 | connect-now | Confirmed | Redbelly runs EVM contracts. | [S24](https://vine.redbelly.network/sc-smart-contracts) |
| C063 | connect-now | Confirmed | A private node can be added from any domain; a public node only from a whitelisted provider. | [S07](https://docs.overledger.dev/docs/connectors) |
| C064 | connect-now | Analysis | Even a working thin link would not change Redbelly's rule that only verified accounts can write. | [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C065 | connect-now | Unknown | Whether Quant would accept an identity-gated chain on the self-serve route at all, since that route is described as being for public, permissionless networks. | [S07](https://docs.overledger.dev/docs/connectors) |
| C066 | connect-now | Unknown | Whether Overledger's EVM Connector works with Redbelly unchanged: its node health checks, its handling of Redbelly's dollar-fixed gas, and its handling of Redbelly blocks. | [S25](https://vine.redbelly.network/network-fees/) |
| C067 | connect-now | Unknown | That list is only available through the API with an account. | [S07](https://docs.overledger.dev/docs/connectors) |
| C068 | connect-now | Confirmed | Quant's documentation uses managed engagement for permissioned and consortium networks and for new families, and says a network with HTTPS RPC and bearer or API-key authentication can normally be onboarded. | [S07](https://docs.overledger.dev/docs/connectors) |
| C069 | connect-now | Analysis | Redbelly's public RPC fits the transport part of that description. | [S22](https://vine.redbelly.network/environments/) |
| C070 | connect-now | Confirmed | Fusion connected Ethereum Sepolia, Polygon Amoy and a Quant-run Besu testnet at launch. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C071 | connect-now | Confirmed | Fusion Firewall policies are mirrored inside the rollup and on each connected base chain. | [S06](https://docs.overledger.dev/docs/overview) |
| C072 | connect-now | Analysis | Those contracts, and every address that deposits or withdraws through them, would need Redbelly write access. | [S29](https://redbelly.network/blog/devnet) |
| C073 | the-work | Analysis | Pick the route / Choose between a thin self-serve link, a full listing through an engagement, or Fusion Rollup / An Overledger account holder, or Quant / How Quant classifies an identity-gated chain | [S07](https://docs.overledger.dev/docs/connectors) [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C074 | the-work | Analysis | Provide a node / Someone runs or supplies a Redbelly RPC endpoint that Overledger calls. A public listing needs a whitelisted provider / A node operator or provider, and Quant / Quant's provider whitelist | [S07](https://docs.overledger.dev/docs/connectors) |
| C075 | the-work | Analysis | Verify every sender / Every address that signs Redbelly transactions needs a Redbelly access credential; companies can use Business verification / The institution, an accredited issuer, and Quant if Quant holds keys / Redbelly's access process | [S29](https://redbelly.network/blog/devnet) [S30](https://vine.redbelly.network/nodes/operator-guide/) [S09](https://docs.overledger.dev/docs/signing) |
| C076 | the-work | Analysis | Test the fit / Run the Connector against Redbelly Testnet (chain ID 153): reads, signed writes, rejections for unverified senders, fees, contract event webhooks / Quant engineers, with Redbelly developers / An Overledger account and verified test accounts | [S22](https://vine.redbelly.network/environments/) [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) |
| C077 | the-work | Analysis | Decide how assets move / Keep assets on Redbelly and move instructions, or represent them on other chains through a bridge or Fusion / Asset issuers and Quant / The compliance design in the next section | [S11](https://docs.overledger.dev/docs/fusion-rollup) [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) |
| C078 | the-work | Analysis | Map compliance / Line up Overledger's allowlists with Redbelly eligibility, including what happens when someone stops being eligible / Issuers, Quant and Redbelly / Legal and product decisions | [S10](https://docs.overledger.dev/docs/overledger-firewall) [S16](https://docs.redbelly.network/pages/receptor/) [S21](https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/) |
| C079 | the-work | Analysis | Step 3 is specific to Redbelly: on most EVM chains any funded address can send transactions, but on Redbelly every signing address is an identity decision as well as a technical one. | [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C080 | offer | Analysis | One integration. Redbelly would sit behind the same credentials and API as their other networks, instead of needing its own integration. | [S05](https://docs.overledger.dev/docs/start-here) [S07](https://docs.overledger.dev/docs/connectors) |
| C081 | offer | Analysis | Workflows across chains. Overledger's Flow Applications and smart contract webhooks could tie a step on Redbelly to steps elsewhere, for example releasing a payment on one network when a Tokeniser asset changes hands on Redbelly. | [S06](https://docs.overledger.dev/docs/overview) [S14](https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1) |
| C082 | offer | Analysis | Custody choices. The Signer supports self-custody or Quant-held keys in a KMS or HSM, which suits institutions with different custody policies, as long as every signing address is Redbelly-verified. | [S09](https://docs.overledger.dev/docs/signing) [S29](https://redbelly.network/blog/devnet) |
| C083 | offer | Analysis | Today that condition is unknown. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C084 | offer | Analysis | Redbelly's own features would come along: identity-verified counterparties, fees fixed in dollar terms that make costs predictable, and leaderless BFT consensus. | [S16](https://docs.redbelly.network/pages/receptor/) [S29](https://redbelly.network/blog/devnet) [S25](https://vine.redbelly.network/network-fees/) [S23](https://vine.redbelly.network/consensus/) |
| C085 | offer | Analysis | Compliance does not travel automatically. Overledger's Firewall controls which users and addresses may act. | [S10](https://docs.overledger.dev/docs/overledger-firewall) |
| C086 | offer | Analysis | Redbelly's controls decide who may hold and move assets on Redbelly. | [S29](https://redbelly.network/blog/devnet) [S31](https://tokeniser.com/) |
| C087 | offer | Analysis | No access to TCH's network follows from it. That network's participants and ledgers are TCH's decision. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) [S04](https://www.theclearinghouse.org/payment-systems/Articles/2026/06/Major-Financial-Institutions-Unveil-Bank-Led-On-Chain-Money-Initiative) |
| C088 | compliance | Confirmed | An issuer issues them, the user (the holder) keeps them, and a verifier checks them. | [S16](https://docs.redbelly.network/pages/receptor/) |
| C089 | compliance | Confirmed | The user submits the proof to that contract, and the verifier never sees or stores the personal data. | [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C090 | compliance | Confirmed | Selective Disclosure reveals chosen facts off-chain instead. | [S19](https://docs.redbelly.network/pages/methods/selective-disclosure/) |
| C091 | compliance | Confirmed | On-chain checks currently support single queries, with multi-query planned. | [S21](https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/) |
| C092 | compliance | Confirmed | Developers build them with the Eligibility SDK. | [S20](https://docs.redbelly.network/pages/eligibility-sdk/getting-started/) |
| C093 | compliance | Confirmed | Every holder is verified and every transfer is checked against the asset's rules. | [S31](https://tokeniser.com/) |
| C094 | compliance | Confirmed | Overledger's Fusion Firewall allowlists on-chain addresses; Overledger maps users to their authorised addresses off-chain, and policies are mirrored on each connected base chain. | [S10](https://docs.overledger.dev/docs/overledger-firewall) [S06](https://docs.overledger.dev/docs/overview) |
| C095 | compliance | Analysis | A Receptor proof is checked by a contract on Redbelly, and a Tokeniser transfer is checked by the asset's rules on Redbelly. | [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) [S31](https://tokeniser.com/) |
| C096 | compliance | Analysis | Holding / Every holder is verified against the asset's rules / The other chain applies its own rules / A wrapped token contract without the same checks lets anyone hold it | [S31](https://tokeniser.com/) |
| C097 | compliance | Analysis | Transferring / Every transfer is checked / Transfers of a wrapped token happen out of Redbelly's sight / Secondary transfers skip eligibility entirely | [S31](https://tokeniser.com/) |
| C098 | compliance | Analysis | Proving identity / A zero-knowledge proof is checked by a contract on Redbelly / A contract elsewhere cannot read that result unless it is relayed / Eligibility status goes stale, or is relayed wrongly | [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C099 | compliance | Analysis | Who holds the key / One verified account per holder / The same asset may sit with a custodian, or behind a Quant-held key / It is unclear whose identity stands behind the address | [S29](https://redbelly.network/blog/devnet) [S09](https://docs.overledger.dev/docs/signing) |
| C100 | compliance | Analysis | Bridge mechanics / Not applicable / Lock-and-mint, custody and oracles come into play / Lock-and-mint mismatch, custodian compromise, oracle failure | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C101 | compliance | Analysis | Coming back / Only an eligible address can receive / Redeeming to Redbelly needs an eligible recipient / Funds get stuck when the recipient is not verified, a failure the DAO playbook already covers for RBNT | [S37](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-16-cross-chain-recovery-playbook) |
| C102 | compliance | Analysis | Keep the asset on Redbelly and move instructions. Overledger coordinates the workflow, but the asset never leaves Redbelly, so every transfer still passes Tokeniser's and Receptor's checks. | [S31](https://tokeniser.com/) [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C103 | compliance | Analysis | Overledger's address allowlists are one place such a mirror could live. | [S10](https://docs.overledger.dev/docs/overledger-firewall) |
| C104 | compliance | Analysis | Today Receptor's on-chain verification is documented on Redbelly; whether verifier contracts and accredited-issuer trust could run on another chain is unknown. | [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C105 | compliance | Unknown | Tokeniser's public material describes checks on Redbelly only. | [S31](https://tokeniser.com/) |
| C106 | compliance | Unknown | The documentation describes allowlists managed by Overledger and by contract deployers, not by external credential systems. | [S10](https://docs.overledger.dev/docs/overledger-firewall) [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C107 | unknowns | Confirmed | Redbelly is not named in Overledger's documentation. | [S05](https://docs.overledger.dev/docs/start-here) [S06](https://docs.overledger.dev/docs/overview) [S07](https://docs.overledger.dev/docs/connectors) |
| C108 | unknowns | Confirmed | The bridge flow deploys a destination token contract, and Redbelly is not named as a network in the documentation we reviewed. | [S12](https://docs.overledger.dev/docs/set-a-unilateral-bridge) [S07](https://docs.overledger.dev/docs/connectors) |
| C109 | unknowns | Confirmed | Redbelly is not among Fusion's connected networks, and no self-serve route is documented. | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C110 | unknowns | Confirmed | Sending a Redbelly transaction from an unverified address by any route, Overledger included. | [S29](https://redbelly.network/blog/devnet) [S36](https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md) |
| C111 | unknowns | Unknown | How Quant would classify Redbelly: self-serve or managed engagement. | [S07](https://docs.overledger.dev/docs/connectors) |
| C112 | unknowns | Unknown | Whether Quant-held signing keys could be Redbelly-verified, and under whose identity. | [S09](https://docs.overledger.dev/docs/signing) [S29](https://redbelly.network/blog/devnet) |
| C113 | unknowns | Unknown | Whether TCH's On-Chain Money network will connect to any public chain. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C114 | unknowns | Unknown | Redbelly's official position on bridging, which has not been published. | [S38](https://taskboard.redbellydao.network/tasks/TASK-29) |
| C115 | unknowns | Unknown | Checking needs an Overledger account. | [S07](https://docs.overledger.dev/docs/connectors) |
| C116 | signals | Analysis | Redbelly appearing in Overledger's documentation or in the GET /networks list. | [S07](https://docs.overledger.dev/docs/connectors) |
| C117 | signals | Analysis | A published test of an Overledger Connector against Redbelly Testnet, chain ID 153. | [S22](https://vine.redbelly.network/environments/) |
| C118 | signals | Analysis | Redbelly publishing an official position on bridging. | [S38](https://taskboard.redbellydao.network/tasks/TASK-29) |
| C119 | signals | Analysis | TCH publishing which ledgers the On-Chain Money network will use. | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C120 | signals | Analysis | Receptor documentation describing verification on chains other than Redbelly. | [S16](https://docs.redbelly.network/pages/receptor/) [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C121 | glossary | Definition | Overledger / Quant's platform for applications that span several blockchains | [S05](https://docs.overledger.dev/docs/start-here) |
| C122 | glossary | Definition | Gateway / Overledger's front door: authentication, routing, rate limits, workflows | [S06](https://docs.overledger.dev/docs/overview) |
| C123 | glossary | Definition | Connector / Overledger's adapter for one family of blockchains | [S07](https://docs.overledger.dev/docs/connectors) |
| C124 | glossary | Definition | Fusion Rollup / Quant's rollup that anchors to several base chains at once | [S11](https://docs.overledger.dev/docs/fusion-rollup) |
| C125 | glossary | Definition | EVM / Ethereum Virtual Machine, the smart contract environment Redbelly supports | [S24](https://vine.redbelly.network/sc-smart-contracts) |
| C126 | glossary | Definition | Receptor / Redbelly's identity and verifiable credential protocol | [S16](https://docs.redbelly.network/pages/receptor/) |
| C127 | glossary | Definition | Verifiable credential / A signed digital statement about a person or company, held by them | [S16](https://docs.redbelly.network/pages/receptor/) |
| C128 | glossary | Definition | Accredited issuer / An issuer that Redbelly allows to grant network access | [S17](https://docs.redbelly.network/pages/modules/issuer/) |
| C129 | glossary | Definition | Zero-knowledge proof / A way to prove a fact (for example, eligibility) without revealing the data behind it | [S18](https://docs.redbelly.network/pages/methods/proof-by-query/) |
| C130 | glossary | Definition | Lock-and-mint / A bridge pattern that locks an asset on one chain and creates a copy on another | [S35](https://github.com/Redbelly-DAO-Community-Taskboard/TASK-08-bridge-integration-guide) |
| C131 | glossary | Definition | Tokenised deposit / A bank deposit represented on a ledger, the subject of TCH's initiative | [S01](https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative) |
| C132 | glossary | Definition | KMS or HSM / Key management services and hardware security modules that protect signing keys | [S09](https://docs.overledger.dev/docs/signing) |

## Part 2: sources (38)

### S01. The Clearing House Partners with Quant to Advance the On-Chain Money Initiative

- Publisher: The Clearing House
- Date: 2026-09-24
- Link: <https://www.theclearinghouse.org/payment-systems/Articles/2026/09/The-Clearing-House-Partners-with-Quant-to-Advance-the--On-Chain-Money-Initiative>
- Supports: TCH selected Quant to power the On-Chain Money Initiative, a network for clearing and settling tokenised deposits, connected to RTP and CHIPS and expected to be available to participating institutions in the first half of 2027.
- Phrases checked: "On-Chain Money Initiative", "first half of 2027", "CHIPS"
- Cited in: The short answer; Why the question is being asked now; What it could offer institutions; Not possible yet, and unknown; What would change the answer; Glossary

### S02. The Clearing House Partners with Quant to Advance the On-Chain Money Initiative (Quant press release)

- Publisher: Quant
- Date: 2026-09-24
- Link: <https://quant.network/press-releases/the-clearing-house-partners-with-quant-to-advance-the-on-chain-money-initiative/>
- Supports: Quant's technology provides the network's interoperability, orchestration and transaction-management layer; Quant also offers Tokenised Deposits-as-a-Service to institutions that process through TCH but lack tokenised deposit capability.
- Phrases checked: "orchestration", "Tokenised Deposits-as-a-Service"
- Cited in: Why the question is being asked now

### S03. Quant powers The Clearing House's On-Chain Money Initiative in the US

- Publisher: Quant
- Date: 2026-09
- Link: <https://quant.network/news/quant-powers-the-clearing-houses-on-chain-money-initiative-in-the-us/>
- Supports: Quant describes its role as coordinating clearing and settlement of tokenised deposit transactions with connectivity to existing fiat payment systems.
- Phrases checked: "tokenised deposit", "fiat payment systems"
- Cited in: Why the question is being asked now

### S04. Major Financial Institutions Unveil Bank-Led On-Chain Money Initiative

- Publisher: The Clearing House
- Date: 2026-06
- Link: <https://www.theclearinghouse.org/payment-systems/Articles/2026/06/Major-Financial-Institutions-Unveil-Bank-Led-On-Chain-Money-Initiative>
- Supports: The initiative was unveiled in June 2026 as a bank-led effort, operated by TCH, for on-chain clearing and settlement of tokenised deposits between banks.
- Phrases checked: "On-Chain Money Initiative", "The Clearing House"
- Cited in: Why the question is being asked now; What it could offer institutions

### S05. Start Here (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/start-here>
- Supports: Overledger is Quant's multi-DLT platform for applications that span more than one blockchain, with one set of credentials and one API surface; client integrations start with the Gateway and Connectors chapters.
- Phrases checked: "multi-DLT platform", "single set of credentials"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; What it could offer institutions; Not possible yet, and unknown; Glossary

### S06. Overview (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/overview>
- Supports: The Gateway handles authentication, routing to Connectors or the Fusion Rollup, rate limiting, observability and orchestration of Flow Applications; a Cross Chain Messaging component moves data and contract calls between connected networks; Fusion Firewall policies are mirrored on each connected L1.
- Phrases checked: "Fusion Rollup", "Flow Applications"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; Can Redbelly connect now?; What it could offer institutions; Credentials and assets across chains; Not possible yet, and unknown; Glossary

### S07. Connectors (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/connectors>
- Supports: Connectors present a single multi-DLT RPC endpoint backed by per-family node pools; six self-serve families (EVM, Solana, Cosmos, SUI, Hedera, Aptos); permissioned and consortium networks need a managed engagement; a first POST /nodes call can register a new network in a supported family; public nodes only from whitelisted providers, private nodes from any domain; administrative RPC methods are blocked; live list via GET /networks.
- Phrases checked: "multi-DLT RPC endpoint", "whitelisted providers", "POST /nodes", "Hyperledger Fabric"; must not contain: "Redbelly"
- Cited in: Read this first; The short answer; Overledger in plain words; Redbelly, in the terms that matter here; Can Redbelly connect now?; What a connection would take; What it could offer institutions; Not possible yet, and unknown; What would change the answer; Glossary

### S08. Authentication (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/authentication>
- Supports: Users sign in to Quant Connect for a JWT, mint API keys through the REST API and send them with RPC calls; API keys authenticate access but transactions still need the caller's own wallet signature.
- Phrases checked: "Quant Connect", "API key"; must not contain: "Redbelly"
- Cited in: Overledger in plain words

### S09. Signing (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/signing>
- Supports: A Signer Flow App handles signing: either the client holds keys and signs, or Quant holds them (testnet hot wallet, or contracted mainnet KMS or HSM); the Gateway and calling Flow App never see private keys.
- Phrases checked: "Signer", "HSM"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; What a connection would take; What it could offer institutions; Credentials and assets across chains; Not possible yet, and unknown; Glossary

### S10. Overledger Firewall (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/overledger-firewall>
- Supports: An off-chain Connector layer decides whether an authenticated user may reach a network (permissioned networks need the user on an allowlist); an on-chain Fusion Firewall allowlists addresses for contract calls, cross-chain messages and token bridging.
- Phrases checked: "allowlist", "Fusion Firewall"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; What a connection would take; What it could offer institutions; Credentials and assets across chains

### S11. Fusion Rollup (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/fusion-rollup>
- Supports: Fusion is a multi-ledger optimistic rollup (an OP Stack fork) that anchors to several L1s at once; primitives cover deposit, unify, trigger and withdraw or mint; at testnet launch it connected Ethereum Sepolia, Polygon Amoy and a Quant permissioned Besu testnet; the firewall is locked down on mainnet and more permissive on testnet; a sender on a connected network must be allowlisted for the specific rollup recipient; it flags lock-and-mint mismatch, custodian compromise and oracle failure as bridge risks.
- Phrases checked: "OP Stack", "Polygon Amoy", "Sepolia"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; Can Redbelly connect now?; What a connection would take; Credentials and assets across chains; Not possible yet, and unknown; Glossary

### S12. How to create a bridge flow (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/set-a-unilateral-bridge>
- Supports: Bridges are created through a bridge flow in Quant Connect that deploys a destination token contract and returns a Bridge ID used for transfers.
- Phrases checked: "Bridge ID", "Quant Connect"; must not contain: "Redbelly"
- Cited in: The short answer; Overledger in plain words; What a connection would take; Not possible yet, and unknown

### S13. Overledger API reference

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/reference>
- Supports: Quant publishes a reference for the Overledger APIs, the interface any connection would be built against.
- Phrases checked: "Overledger"; must not contain: "Redbelly"
- Cited in: Overledger in plain words

### S14. Manage Webhooks for Smart Contract Events (Overledger documentation)

- Publisher: Quant Developer Hub
- Date: accessed 2026-10-23
- Link: <https://docs.overledger.dev/docs/manage-webhooks-for-smart-contract-events-1>
- Supports: Overledger documents webhooks that notify applications about smart contract events.
- Phrases checked: "Webhook"; must not contain: "Redbelly"
- Cited in: Overledger in plain words; What a connection would take; What it could offer institutions

### S15. Redbelly Network Technical Documentation

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/>
- Supports: Redbelly describes itself as a layer 1 blockchain built and optimised for real world asset tokenisation, with identity and eligibility tooling for developers.
- Phrases checked: "Redbelly"
- Cited in: Redbelly, in the terms that matter here

### S16. Receptor (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/receptor/>
- Supports: Receptor is Redbelly's native identity and verifiable credential protocol, built on the W3C verifiable credential data model, with Issuer, Holder and Verifier modules; anyone can issue credentials, but issuers that provide network access are accredited.
- Phrases checked: "W3C verifiable credential data model", "accredited"
- Cited in: Redbelly, in the terms that matter here; What a connection would take; What it could offer institutions; Credentials and assets across chains; What would change the answer; Glossary

### S17. Issuer module (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/modules/issuer/>
- Supports: Only accredited issuers can issue credentials that give users network access.
- Phrases checked: "accredited issuers"
- Cited in: The short answer; Redbelly, in the terms that matter here; Glossary

### S18. Proof by Query (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/methods/proof-by-query/>
- Supports: Proof by Query uses zero-knowledge proofs checked by a verifier smart contract that the verifier deploys on Redbelly Network (setZKPRequest), to which the holder submits a proof (submitZKPResponse); personal data is not seen or stored by the verifier.
- Phrases checked: "setZKPRequest", "submitZKPResponse"
- Cited in: Credentials and assets across chains; What would change the answer; Glossary

### S19. Selective Disclosure (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/methods/selective-disclosure/>
- Supports: Selective Disclosure verifies credentials that require users to reveal specified, verifiable information off-chain.
- Phrases checked: "off-chain"
- Cited in: Credentials and assets across chains

### S20. Eligibility SDK: Getting Started (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/eligibility-sdk/getting-started/>
- Supports: The Eligibility SDK is installed as @redbellynetwork/eligibility-sdk and needs a Redbelly API key and an allowed issuer DID.
- Phrases checked: "eligibility-sdk"
- Cited in: Credentials and assets across chains

### S21. Configure Eligibility Criteria (Redbelly documentation)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/>
- Supports: Eligibility criteria are Iden3-style queries over credential types such as passport, proof of address and AML/CTF credentials; on-chain checks use the credentialAtomicQuerySigV2OnChain circuit; on-chain single queries are supported, multi-query is planned.
- Phrases checked: "credentialAtomicQuerySigV2OnChain"
- Cited in: What a connection would take; Credentials and assets across chains

### S22. Redbelly Network environments (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/environments/>
- Supports: Mainnet is chain ID 151 with RBNT as currency and a public RPC URL; Testnet is chain ID 153.
- Phrases checked: "151", "153"
- Cited in: The short answer; Redbelly, in the terms that matter here; Can Redbelly connect now?; What a connection would take; What would change the answer

### S23. DBFT and super block: security, finality and scalability (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/consensus/>
- Supports: Security, finality and scalability come from DBFT, a leaderless consensus algorithm tolerating faults up to t < n/3, and the super block optimisation of the EVM.
- Phrases checked: "leaderless", "super block"
- Cited in: Redbelly, in the terms that matter here; What it could offer institutions

### S24. Smart contracts (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/sc-smart-contracts>
- Supports: Redbelly executes smart contracts written for the EVM in Solidity; testing should happen on Testnet.
- Phrases checked: "Solidity"
- Cited in: The short answer; Redbelly, in the terms that matter here; Can Redbelly connect now?; Glossary

### S25. Network fees (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/network-fees/>
- Supports: The unit price of gas is fixed in US dollar terms and converted to RBNT at execution using an on-chain price oracle.
- Phrases checked: "oracle"
- Cited in: Redbelly, in the terms that matter here; Can Redbelly connect now?; What it could offer institutions

### S26. Redbelly Network native currency (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/native-currency/>
- Supports: Lists routes for RBNT on other chains (Base via LayerZero, Ethereum mainnet via Polymer) and points to Lucid Labs Bridge for moving RBNT back to Redbelly.
- Phrases checked: "LayerZero", "Polymer", "Lucid Labs"
- Cited in: Redbelly, in the terms that matter here

### S27. Accessing the network (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/id-accessing-the-network>
- Supports: Users connect an EVM wallet to the Redbelly access dApp and prove a valid photo identity document through biometric checks before their account is enabled.
- Phrases checked: "access"
- Cited in: Redbelly, in the terms that matter here

### S28. Redbelly Access

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://access.redbelly.network/>
- Supports: Identity is verified by the accredited issuer Averer before it issues the Redbelly Network Access Credential to the account.
- Phrases checked: "Averer"
- Cited in: The short answer; Redbelly, in the terms that matter here

### S29. Redbelly DevNet blog post

- Publisher: Redbelly Network
- Date: older post, accessed 2026-10-23
- Link: <https://redbelly.network/blog/devnet>
- Supports: Before users can self-enable their accounts with write access to the network, they must claim an access credential from a network accredited issuer.
- Phrases checked: "write access"
- Cited in: The short answer; Redbelly, in the terms that matter here; Can Redbelly connect now?; What a connection would take; What it could offer institutions; Credentials and assets across chains; Not possible yet, and unknown

### S30. Node operator guide (Vine developer portal)

- Publisher: Redbelly Network
- Date: accessed 2026-10-23
- Link: <https://vine.redbelly.network/nodes/operator-guide/>
- Supports: Companies or trusts may register through Redbelly's Business verification process.
- Phrases checked: "Business verification"
- Cited in: Redbelly, in the terms that matter here; What a connection would take

### S31. Tokeniser

- Publisher: Tokeniser Pty Ltd
- Date: accessed 2026-10-23
- Link: <https://tokeniser.com/>
- Supports: Tokeniser operates on Redbelly Network with identity and eligibility built into the protocol; eligibility (identity, KYC, AML, CTF, wholesale and sophisticated investor tests, TMD) is programmed into every asset; every holder is verified and every transfer checked against the asset's rules; features include secondary transfer and collateral mobility.
- Phrases checked: "every transfer checked against the asset's rules", "Redbelly Network"
- Cited in: What it could offer institutions; Credentials and assets across chains

### S32. Celer Announces cBridge Support for Redbelly

- Publisher: Celer Network
- Date: 2025-08-01
- Link: <https://blog.celer.network/2025/08/01/celer-announces-cbridge-support-for-redbelly/>
- Supports: cBridge connects Ethereum, BNB Chain and Redbelly with a pegged bridge model; RBNT moves from Redbelly to Ethereum and BNB Chain.
- Phrases checked: "Redbelly", "BNB Chain"
- Cited in: Redbelly, in the terms that matter here

### S33. Redbelly Network on X: Wrapped RBNT live on Ethereum Mainnet

- Publisher: Redbelly Network
- Date: 2025-02-14
- Link: <https://x.com/RedbellyNetwork/status/1890340030197166112>
- Supports: Redbelly announced Wrapped RBNT on Ethereum Mainnet with the official contract 0xb45ffb51984d626ee758b336c61cf20990c6bf13.
- Phrases checked: "0xb45ffb51984d626ee758b336c61cf20990c6bf13"
- Note: x.com serves this post through JavaScript, so automated fetches often fail. Open it in a browser to confirm.
- Cited in: Redbelly, in the terms that matter here

### S34. Deployed Endpoints, Message Libraries, and Executors (LayerZero V2)

- Publisher: LayerZero
- Date: accessed 2026-10-23
- Link: <https://docs.layerzero.network/v2/deployments/deployed-contracts>
- Supports: Redbelly Mainnet is listed among LayerZero V2 deployments.
- Phrases checked: "Redbelly"
- Cited in: Redbelly, in the terms that matter here

### S35. TASK-08 Existing Bridge Integration Guide (winning entry archive)

- Publisher: Redbelly DAO Community Task Board
- Date: 2026-09
- Link: <https://github.com/Redbelly-DAO-Community-Taskboard/TASK-08-bridge-integration-guide>
- Supports: A working lock-and-mint bridge from Ethereum Sepolia to Redbelly Testnet (chain ID 153) secured by a 2-of-3 relayer set, plus research on which bridge protocols support Redbelly.
- Phrases checked: "lock-and-mint", "2-of-3"
- Cited in: Redbelly, in the terms that matter here; Glossary

### S36. redbelly-testnet-bridge (ARTICLE.md)

- Publisher: TASK-08 community entry
- Date: 2026-08
- Link: <https://github.com/tycayomide/redbelly-testnet-bridge/blob/main/ARTICLE.md>
- Supports: Every wallet needs identity verification before it can send any Testnet transaction; unverified deploys fail with 'Sender not authorised to write transactions'; Mainnet and Testnet approvals are separate.
- Phrases checked: "Sender not authorised to write transactions", "Mainnet and Testnet approvals are separate"
- Cited in: The short answer; Redbelly, in the terms that matter here; Can Redbelly connect now?; What a connection would take; Not possible yet, and unknown

### S37. TASK-16 Unstick Your RBNT: Cross-Chain Recovery Playbook (winning entry archive)

- Publisher: Redbelly DAO Community Task Board
- Date: 2026-09
- Link: <https://github.com/Redbelly-DAO-Community-Taskboard/TASK-16-cross-chain-recovery-playbook>
- Supports: Recovery steps for stuck cross-chain RBNT, including that transfers bridged to Ethereum via Polymer do not relay automatically, and that only the Ethereum wRBNT contract has been officially announced.
- Phrases checked: "Cross-Chain Recovery Playbook"
- Cited in: Redbelly, in the terms that matter here; Credentials and assets across chains

### S38. TASK-29 Quant Overledger and Redbelly Interoperability Research (task brief)

- Publisher: Redbelly DAO Community Task Board
- Date: 2026-10
- Link: <https://taskboard.redbellydao.network/tasks/TASK-29>
- Supports: Redbelly and Quant have no announced partnership or talks; Redbelly has not published an official position on bridging.
- Phrases checked: "no announced partnership or talks", "official position on bridging"
- Cited in: Read this first; Not possible yet, and unknown; What would change the answer
