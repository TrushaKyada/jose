const mongoose = require('mongoose');
const { JWK, JWE } = require('node-jose');
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password:{
        required:true,
        type:String
    },
    token: {
        type: String
    }
}, { timestamps: true }, { versionKey: false }, { collection: "user" }
)
userSchema.methods.generateauthtoken = async () => {
    try {

        encrypt = async (raw, format = 'compact', contentAlg = "A256GCM", alg = "RSA-OAEP") => {
            let _publicKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwiSxcx5xFsNCjfDTOXz0
        M6RivgPXTTKb/PH6/x4vYl1xg/vIrG1yDGyFuyAizxNaGtA+qo2CvM3iATyDWQg3
        /8vDWiD4cIvUD2WE3XXewjyeGzQso26DceRxopI2tlSgvznjifetGCp+oj4BWrTC
        qLF1AsR2ioUS7vuXMlpxXFhJfyEGoWuQaZDwoz7CZv1KrQwlRTtkqtn4IeXpVcgW
        hg/1r0iRsvNJDokyiMVY8hrrvza2j31JGaKYqCNYSC8Jf5EV7ONQhYGgQeRVxn8j
        S8UhLOFXDdNtgHwKi02tF1bmb3Ko/s3vzPvFB8C7CsYRtHAzcx/xor2/CbT0QGYf
        UQIDAQAB
        -----END PUBLIC KEY-----`
            let publicKey = await JWK.asKey(_publicKey, "pem");
            const buffer = Buffer.from(JSON.stringify(raw))
            const encrypted = await JWE.createEncrypt({ format: format, contentAlg: contentAlg, fields: { alg: alg } }, publicKey)
                .update(buffer).final();
            return encrypted;
        }
        let raw = {
            "mobileNumber": "1234567890",
            "customerId": "000000000",
            "sessionId": "3a600342-a7a3-4c66-bbd3-f67de5d7096f",
            "exp": 1645544094,
            "jti": "f3902a08-0e24-4dcc-bed1-f4cd9611bfad"
        };
        var a = encrypt(raw);
        console.log(encrypt(raw));
        return a;

        // const t = await new jose.GeneralEncrypt(
        //     new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.'),
        //   )
        //     .setProtectedHeader({ enc: 'A256GCM' })
        //     .addRecipient(ecPublicKey)
        //     .setUnprotectedHeader({ alg: 'ECDH-ES+A256KW' })
        //     .addRecipient(rsaPublicKey)
        //     .setUnprotectedHeader({ alg: 'RSA-OAEP-384' })
        //     .encrypt()

        // const secret = new TextEncoder().encode(
        //     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
        // )
        // const alg = 'HS256'

        // const t = await new jose.SignJWT({ 'urn:example:claim': true })
        //     .setProtectedHeader({ alg })
        //     .setIssuedAt()
        //     .setIssuer('urn:example:issuer')
        //     .setAudience('urn:example:audience')
        //     .setExpirationTime('2h')
        //     .sign(secret)
        // this.token = t
        // await t.save(function(){})
        // console.log("T",t);

    } catch (error) {
        console.log(error);
    }
}
module.exports = mongoose.model("user",userSchema)