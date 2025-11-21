import useBtc24h from '../hooks/useBtc24h'
import BtcTile from '../components/BtcTile'

export default function Page2() {
  const { price, deltaAbs, deltaPct, status, source, error } = useBtc24h()
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12, color: '#e5e7eb' }}>Ma cuisine</h2>
      <BtcTile price={price} deltaAbs={deltaAbs} deltaPct={deltaPct} status={status} source={source} error={error} />
    </div>
  )
}
