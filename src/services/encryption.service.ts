import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class EncryptionService {

    constructor() {

    }

    initialize(pwd: any, mykey: Array<any>, sbox: Array<any>) {
        var b = 0;
        var tempSwap = 0;
        var intLength = pwd.length;
        var a = 0;
        for (a = 0; a <= 255; a++) {
            mykey[a] = pwd[(a % intLength)];
            sbox[a] = a;
        }
        for (a = 0; a <= 255; a++) {
            b = (b + sbox[a] + mykey[a]) % 256;
            tempSwap = sbox[a];
            sbox[a] = sbox[b];
            sbox[b] = tempSwap;
        }
    }

    calculate(plaintxt: any, psw: any, mykey: Array<any>, sbox: Array<any>) {
        this.initialize(psw, mykey, sbox);
        var i = 0; var j = 0;
        var cipher = new Array();
        var k, temp, cipherby;
        for (var a = 0; a < plaintxt.length; a++) {
            i = (i + 1) % 256;
            j = (j + sbox[i]) % 256;
            temp = sbox[i];
            sbox[i] = sbox[j];
            sbox[j] = temp;
            var idx = (sbox[i] + sbox[j]) % 256;
            k = sbox[idx];
            cipherby = plaintxt[a] ^ k;
            cipher.push(cipherby);
        }
        return cipher;
    }

    charsToStr(chars: any) {
        var result = new String("");
        for (var i = 0; i < chars.length; i++) {
            result += String.fromCharCode(chars[i]);
        }
        return result;
    }

    charsToHex(chars: any) {
        var result = new String("");
        var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
        for (var i = 0; i < chars.length; i++) {
            result += hexes[chars[i] >> 4] + hexes[chars[i] & 0xf];
        }
        return result;
    }

    hexToChars(hex: any) {
        var codes = new Array();
        for (var i = (hex.substr(0, 2) == "0x") ? 2 : 0; i < hex.length; i += 2) {
            codes.push(parseInt(hex.substr(i, 2), 16));
        }
        return codes;
    }

    strToChars(str: string) {
        var codes = new Array();
        for (var i = 0; i < str.length; i++) {
            codes.push(str.charCodeAt(i));
        }
        return codes;
    }

    encryptRC4(src: string, key: string) {

        let sbox = new Array(255);
        let mykey = new Array(255);

        var mtxt = this.strToChars(src);
        var mkey = this.strToChars(key);
        var result = this.calculate(mtxt, mkey, mykey, sbox);
        return this.charsToHex(result);
    }

    decryptRC4(src: string, key: string) {

        let sbox = new Array(255);
        let mykey = new Array(255);

        var mtxt = this.hexToChars(src);
        var mkey = this.strToChars(key);
        var result = this.calculate(mtxt, mkey, mykey, sbox);
        return this.charsToStr(result);
    }

}
