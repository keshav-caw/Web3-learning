const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction

const web3 = new Web3('https://ropsten.infura.io/v3/cd1ce69e12144ee495d8830bf1f96db4')

// to create new account
// const account1 = web3.eth.accounts.create()

const account1 = '0x70d6ac888Aa6f065a29552b3DfBd019d2FcF8AeE'
const account2 = '0x34C78282c0f0554c7aF5453005B4c2fa481822c4'
const privateKey1 = process.env.PRIVATE_KEY_1
const privateKey2 = process.env.PRIVATE_KEY_2

// To get balance from account1
// web3.eth.getBalance(account1,(err,bal)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(bal); // in ether
//     console.log(web3.utils.fromWei(bal,'ether')); // in wei
// })



// creating the transaction object
//  On the txObject, you don't need to use toHex() anymore. Everything can be passed as "string". Also, "gasLimit" is now "gas".(checkout older version to compare)
//In the latest version of web3, you don't have to put nonce on the txObject, it is automatically equals to web3.eth.transactionCount()
const txObject = {
    to: account2,
    value: web3.utils.toWei('1','ether'),
    gas: '21000',
    gasPrice: web3.utils.toWei('10','gwei')
}


// signing the transaction
//Instead of using ethereumjs-tx and do a lot of process/code just to make a raw transaction. we just do this
const signedTransaction = web3.eth.accounts.signTransaction(txObject,privateKey1);


// and, then broadcast like this
signedTransaction.then(signedTx=>{
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    sentTx.on("receipt",receipt=>{
        console.log("receipt: ",receipt);
    })
    sentTx.on("error",err=>{
        console.log(err.message);
    })
})

// Congrations, transaction is successful





// old way of sending transaction, no longer works 

// web3.eth.getTransactionCount(account1,(err,txCount)=> {

//     if(err){
//         console.log(err);
//     }
//     console.log(txCount);

//     // Building the transaction
//     const txObject = {
//         nonce: web3.utils.toHex(txCount),
//         to: account2,
//         value: web3.utils.toHex(web3.utils.toWei('1','ether')),
//         gasLimit: web3.utils.toHex(21000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
//     }

    
//     console.log(txObject);

    
//     const tx = new Tx(txObject)
//     tx.sign(privateKey1)

//     // serializing transaction
//     const serializedTransaction = tx.serialize()
//     const raw = '0x'+serializedTransaction.toString('hex')

//     console.log(raw);

//     // Broadcast the transaction
//     web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log(txHash);
//     })
// })