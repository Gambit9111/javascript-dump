function AllAccounts({trading_accounts}) {
  return (
    <>
    {trading_accounts.map(trading_account => (
        <div key={trading_accounts.label}>
        <p className='text-white'>{trading_accounts.label}</p>
        </div>
    ))}
    </>
  );
}

export default AllAccounts;