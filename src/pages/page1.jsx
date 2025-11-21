import TokenTile from '../elements/TokenTile'

export default function Page1() {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ color: '#e5e7eb', marginBottom: 16 }}>Marmiton Communautaire</h1>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <TokenTile symbol="BTC" />
        <TokenTile symbol="ETH" />
        <TokenTile symbol="SOL" />
        <TokenTile symbol="BNB" />
        <TokenTile symbol="MATIC" />
        <TokenTile symbol="kPEPE" />
        <TokenTile symbol="AVAX" />
        <TokenTile symbol="ATOM" />
        <TokenTile symbol="APT" />
        <TokenTile symbol="ARB" />
      </div>
    </div>
  )
}
