const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require('@solana/web3.js')

const newPair = new Keypair()
console.log(newPair)

const publicKey = new PublicKey(
  newPair.publicKey
).toString()

const secretKey = newPair._keypair.secretKey

const getWalletBalance = async () => {
  try {
    const connection = new Connection(
      clusterApiUrl('devnet'),
      'confirmed'
    )
    const myWallet = await Keypair.fromSecretKey(
      secretKey
    )

    const walletBalance =
      await connection.getBalance(
        new PublicKey(myWallet.publicKey)
      )

    console.log(`Wallet address: ${publicKey}`)

    console.log(
      `Wallet balance: ${walletBalance}`
    )
  } catch (err) {
    console.log(err)
  }
}

const airDropSol = async () => {
  try {
    const connection = new Connection(
      clusterApiUrl('devnet'),
      'confirmed'
    )
    const walletKeyPair =
      await Keypair.fromSecretKey(secretKey)

    console.log('Sending 2 SOL--')

    const fromAirDropSignature =
      await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey),
        2 * LAMPORTS_PER_SOL
      )

    await connection.confirmTransaction(
      fromAirDropSignature
    )
  } catch (err) {
    console.log(err)
  }
}

const driverFunction = async () => {
  await getWalletBalance() // checking balance
  await airDropSol() // airdropping 2 SOL
  await getWalletBalance() // checking balance again
}

driverFunction()
