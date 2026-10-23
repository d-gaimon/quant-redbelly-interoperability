## Community summary

Plain-language summary of the feasibility report "Could Redbelly plug into Quant's Overledger?" for the Redbelly community. Every fact links to its source. Research cut-off: 23 October 2026.

### X thread

<!-- thread:start -->
1/9 Could Redbelly plug into Quant's Overledger? Research, not guesswork. Short answer: not connected today. A basic link looks possible on paper. Anything deeper needs Quant. Redbelly and Quant have announced no partnership, talks or plans. {S38}

2/9 Why now: on 24 Sep 2026 The Clearing House picked Quant to power its On-Chain Money Initiative, a tokenised deposit network for financial institutions expected in the first half of 2027. The ledgers it will use are not public. {S01}

3/9 How chains join Overledger: public, permissionless networks in six families (EVM included) can be added self-serve by registering a node. Permissioned and consortium networks go through an engagement with Quant's team. {S07}

4/9 Redbelly runs EVM contracts, so it fits the EVM family. But only identity-verified accounts can write to Redbelly. Open to read, gated to write. Overledger's self-serve route is described for permissionless networks. {S24} {S29}

5/9 So, on paper: an Overledger user could register a Redbelly node and pass through transactions signed by verified accounts. Nobody has published a test of this, and Quant decides how an identity-gated chain is classified. {S07}

6/9 Not possible yet: Redbelly is not a listed Overledger network, is not one of Fusion Rollup's connected chains, and is not a destination in the Quant Connect bridge flow. {S07} {S11} {S12}

7/9 Compliance: Receptor proofs and Tokeniser transfer checks run on Redbelly. Another chain applies its own rules. A connection would need to mirror eligibility or keep assets on Redbelly and move instructions only. {S18} {S31}

8/9 Still unknown: how Quant would classify Redbelly, whether Overledger's EVM Connector works with Redbelly unchanged, whether the TCH network will reach public chains, and Redbelly's official position on bridging. {S38}

9/9 The full report that accompanies this thread links a source for every claim and splits findings into Confirmed, Analysis and Unknown. Feasibility research only: no price talk, no investment advice.
<!-- thread:end -->

### In a few paragraphs

The Clearing House, a US payments company that operates core payment networks {S04}, chose Quant in September 2026 to power its On-Chain Money Initiative, a network for clearing and settling tokenised bank deposits that is expected to open to participating institutions in the first half of 2027 {S01}. Overledger is Quant's platform for applications that span several blockchains {S05}, so the community asked whether Redbelly could connect to it. Redbelly and Quant have no announced partnership or talks {S38}, and this research does not suggest one.

Today Redbelly is not connected to Overledger. Overledger lets accounts add public, permissionless networks in six families, EVM among them, by registering a node {S07}. Redbelly is EVM-compatible {S24}, so a basic link where Overledger carries transactions already signed by verified Redbelly accounts looks possible on paper. It has not been tested, and Redbelly only lets identity-verified accounts write to the network {S29}, which does not fit neatly into Overledger's permissionless category. Quant would decide how to treat that. Deeper options, such as joining Quant's Fusion Rollup or using Quant's bridge flow, are not available unless Quant chooses to support Redbelly {S11,S12}.

The biggest open question is compliance. Redbelly's identity checks (Receptor) and Tokeniser's per-transfer checks run on Redbelly itself {S18,S31}. Once an asset is represented on another chain, that chain's rules apply instead. Any future connection would need to carry eligibility across, or keep assets on Redbelly and only move instructions. The full report sets out what is confirmed, what is our analysis, and what is still unknown, with a source link for every factual claim.
