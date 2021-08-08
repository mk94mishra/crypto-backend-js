var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/ce173a80271f4429a9afd8bb97a93811')

// mnemonic
/*
const ethers = require('ethers');
const mnemonic = await ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
*/

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0xA1f9fd281262a56f40b764ccDAcd241e30dab8E5'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
const contract = new web3.eth.Contract(contractABI, contractAddress)

var err = ''
var txHash = ''

// transferToken 
function transferToken(sender_account, reciever_account, sender_private_key,token, callback){

  sender_private_key = Buffer.from(sender_private_key, 'hex')
  // Transfer some tokens
  web3.eth.getTransactionCount(sender_account, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      to: contractAddress,
      data: contract.methods.transfer(reciever_account, token).encodeABI()
    }


    const tx = new Tx(txObject, {chain:'ropsten'})
    tx.sign(sender_private_key)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
      // Use this txHash to find the contract on Etherscan!
      callback(err, txHash);
      return;
    })
  })
  /*
  // Check Token balance for account1

  // Check Token balance for account2
  contract.methods.balanceOf(reciever_account).call((err, balance) => {
    console.log({ err, balance })
  })*/
}
const balance = null
const eth_balance = null

function checkBalance(account,callback){
  contract.methods.balanceOf(account).call((err, balance) => {
    console.log({ err, balance })
    balance = balance
    web3.eth.getBalance(account,function(err, eth_balance) {
      console.log({ err, eth_balance })
      eth_balance = eth_balance

    callback(err,balance,eth_balance)
    return
    })
  })
}

function createWallet(){
  const web3_account = web3.eth.accounts.create()
  //web3_account.mnemonic('hello')
  return  web3_account
}

module.exports = { transferToken, checkBalance, createWallet };