class Network {
    constructor() {
        this._class;
        this._IP;
        this._subnetMask;
    }

    printResult = () => {
        console.log(`${this._IP} 주소와 ${this._class} 클래스, 서브넷 마스크 ${this.createMask()} 를 선택하셨습니다.`);
        console.log(`최대 서브넷 개수는 ${this.getSubnet()}개, 서브넷당 호스트는 ${this.getSubnetHost()}개`);
        console.log(`호스트 IP 주소 범위는 ${this.getIPRange()}`);
        console.log(`브로드캐스트 주소는 ${this.getBroadcast()}`);
    }

    setClass = (input) => {
        this._class = input;
    }

    setIP = (ip) => {
        this._IP = ip;
    }

    setMask = (mask) => {
        this._subnetMask = mask;
    }

    // 클래스에 맞는 추천 IP
    suggestIP = () => {
        return (this._class === 'A') ? ("10.0.0.1") : ((this._class === 'B') ? ("172.16.0.1") : ("192.168.0.1"));
    }

    // 최대 서브넷 갯수 반환
    getSubnet = () => {
        return Math.pow(2, this._subnetMask);
    }

    // 서브넷 당 호스트의 수 반환
    getSubnetHost = () => {
        switch (this._class) {
            case 'A':
                return Math.pow(2, 24 - this._subnetMask) - 2;
            case 'B':
                return Math.pow(2, 16 - this._subnetMask) - 2;
            case 'C':
                return Math.pow(2, 8 - this._subnetMask) - 2;
        }
    }

    // 네트워크 IP 생성
    createNetworkIP = () => {
        return this.calculateLogical(this._IP, this.createMask(), '&');
    }

    // String으로된 IP에서 AND 연산을 수행하여 String으로 반환
    calculateLogical = (firstIP, secondIP, sign) => {
        let result = "";
        let fIP = firstIP.split('.');
        let sIP = secondIP.split('.');
        for (let i = 0; i < 4; i++) {
            if (sign === '&') // AND
                result += String(fIP[i] & sIP[i]);
            if (sign === '|') // OR
                result += String(fIP[i] | sIP[i]);
            if (i !== 3)
                result += '.'
        }
        return result;
    }

    // 호스트 IP 주소 범위를 반환
    getIPRange = () => {
        const netIP = this.calculateLogical(this.createNetworkIP(), "0.0.0.1", '|');
        const broadcast = this.calculateLogical(this.getBroadcast(), "255.255.255.254", '&')
        return netIP + " ~ " + broadcast;
    }

    // 서브넷 비트에 맞는 마스크를 생성
    createMask = () => {
        let mask = "";
        switch (this._class) {
            case 'A':
                mask += "255."
                mask += (this._subnetMask > 8) ? "255" : this.getOctet(this._subnetMask);
                mask += ".";
                mask += (this._subnetMask - 8 > 8) ? "255" : this.getOctet(this._subnetMask - 8);
                mask += ".";
                mask += (this._subnetMask - 16 > 8) ? "255" : this.getOctet(this._subnetMask - 16);
                break;
            case 'B':
                mask += "255.255."
                mask += (this._subnetMask > 8) ? "255" : this.getOctet(this._subnetMask);
                mask += ".";
                mask += (this._subnetMask - 8 > 8) ? "255" : this.getOctet(this._subnetMask - 8);
                break;
            case 'C':
                mask += "255.255.255."
                mask += (this._subnetMask > 8) ? "255" : this.getOctet(this._subnetMask);
                break;
        }
        return mask;
    }

    // 비트에 맞는 10진수 반환 
    getOctet = (count) => {
        if (count < 0)
            return 0;
        let binary = new Number();
        while (count > 0)
            binary += Math.pow(2, 8 - count--);
        return binary;
    }

    getBroadcast = () => {
        const netIP = this.createNetworkIP();
        let tmpMask = ~this.createMask(); 
        return this.calculateLogical(netIP, tmpMask, "|");
    }
}

module.exports = Network