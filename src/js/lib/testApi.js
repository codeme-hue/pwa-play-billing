const {express} = require('express')
const {google} = require('googleapis')
// const key = require('./api.json')
const app = express()
const port = 3000


let client = new google.auth.JWT(
  'ghostcityservice@ghost-city-408703.iam.gserviceaccount.com',
  undefined,
  '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/efj60KWf0b76\nmBJyyv3D16sPTW6Z75MOnuEF/YGoDapyhu0U7gQkTAdwBh3zKdtDbkotvq44OzzA\nKqRsD8JzHcSxVldpjZA2k/NPmMdXJ8vw/be9A9gi8Zs2HdycOdfzwOLT5MVn0xOH\n533bebengEPnLNf7knnmpLK8oCNkj4pPLoyc3sPYUo63QlIQsj+WmnqPdxuYlRQq\n4VjB00wsvE+BIjBcHhlv6Htwx6H5Y7hGgZFysx3u+rakuNBaaa3jKMoQFCFnCSCP\nJNJrScacHFr1/bQRVnl6Y3dkq/4Du2Rw1P24kQ8jJBUUu/DBHGcPcoJ3mvCvHhWm\nOvTNYvYXAgMBAAECggEANqBMqPmnlr3XF1UVRkylMx8vPTFhEWeo863eEsBtIg2s\nB/p4XtU8t0I9iPclyj6xwD4RyZUxzPcRcN15hR7F4eOnPtScIY/yia+R5a53iGTh\nKQKpTbJwEiANoNXKH4PdGTx5Oex1aRZt5wLjBB9ohs/wD17ay3nRbzyjhW7GSiSu\niczZ88PD/4yHfJPE/Yw362CHPNtPqTClG5aK6Agqf0S4QRcxCEsDjxhmcVHVk5od\nRSyx79k0wiE/pwabEl6fEdfsiwdjDl0LrX6IS2kWiaFhDeNuwuiyv/UXM2GiTrBQ\ngddaT242AHKuOpKUuaLpde5BvraAMNZfj9qa/ciniQKBgQDxe8CFBnMaYHn3PvP7\nOnklEpggCp0mx3Gl+LlB3pRcFQ9McnKWrgrk9J8KY1MKDcEuXNK9o+l+JYAbh/kV\n3hXSM6JESaHl6KQEqRr55lJ4en9huWhMyxIsH1WCW5sp3z6Perkx8gjJ1z0UqxVj\nUb5qYLpdNT2NO0vpZLYJnhSpNQKBgQDK/Ka0UWAfcrfP/T0NVWfQfQUm7A3wGZst\nSuAhiD9h6I796Wj9Id4xBBkn9+L+ZjzWBdySKSOunGQV4pFkrZF+Ybo36MJpa5Sp\nLeezYys54nd2M0CukHGnpUuALl13nvtUdZ/ahlnAv6G871Qb0Mb56zpxgrbI/Olg\nGsS5x1HXmwKBgQCzQaL63HvLI7zGDaQ9ZP2SyIfGmTppE/pIMycKP3iwFi4CGJ75\nPX720KPSqUJ2Hxm9GciSX7+vFZVQWpJLak2WeR/GQ0Z8DULb9tAAm7myl3RBjclf\n4ArAWA44s1muLnsZNQeOjNV7R1yfIBTDYmXQP7d4A1KKqW7DdTAwWXmK1QKBgAO9\n1HTOay8pNionSNDOGjPFmiq1fyxFzI5xKuBzWne7iac0fjLsROQyZyRNdWmrCMQJ\nJ5+qEnZNe6rLmlJ4wI3Lz1rod2zqBrt3lSXBVjKi8gDDwRV2pCGq8lFSiXaC/672\n3BNzFoRvA9QvtSUuG/zPUSx2dFgQEV0sISQrgF6xAoGBAKBFHMzU1Js6gGBq968L\nBsdiVb9JvmSidAPYiHFgMtVgnKRqDLbedU2ONdbhA+3lzCjaSfAFTMq4BGUd6xiM\n7Ka9vk+JhWpmk9LdBncvhTY8q8XRHQ90r9QRkGdHyFNdQRriCTTTNUpRC+UG/J41\nfAf83mgvQjrbvExdHYutNHJj\n-----END PRIVATE KEY-----\n',
  ['https://www.googleapis.com/auth/androidpublisher']
)
const androidApi = google.androidpublisher({
  version: 'v3',
  auth: client
})

async function getPurchase(token) {
    let authorize = await client.authorize();
    console.log('authorize :', authorize);
    
    const verify = await androidApi.purchases.products.get({
      packageName: "com.ghostcity.rgs",
      productId: "product_coins6",
      token:token
    })
    
    return verify;
}


app.get('/', async (req, res) => {
  const token = req.query.token
  const result = await getPurchase(token).catch(console.error);
  const state = result.data.purchaseState;
  res.json({"state":state});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})