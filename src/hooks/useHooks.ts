const address = 'vce1ya8tqvnckpscx7tr7ru95aj3565f2xkqv2r2xy';
const { data: coin } = useBalanceStaked(address);

<div>
Staked Balance:
{isLoading ? (
  'Fetching staked balances...'
) : (
  <span>
    {coin?.amount / 1000000000000000000} {coin?.denom.slice(1, 6)}
  </span>
)}
</div>