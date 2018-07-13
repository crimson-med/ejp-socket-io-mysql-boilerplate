
class PacketModel {
  constructor(packetData) {
    this.packet_id = null;
    this.base_url  = (packetData.baseUrl && packetData.baseUrl.length > 0) ? packetData.baseUrl : "" ;
    this.cookies  = (packetData.cookies && packetData.cookies.length  > 0) ? packetData.cookies : "" ;
    this.hostname  = (packetData.hostname && packetData.hostname.length  > 0) ? packetData.hostname : "" ;
    this.ip  = (packetData.ip && packetData.ip.length  > 0) ? packetData.ip : "" ;
    this.original_url  = (packetData.originalUrl && packetData.originalUrl.length  > 0) ? packetData.originalUrl : "" ;
    this.params  = (packetData.params && packetData.params.length  > 0) ? packetData.params : "" ;
    this.protocol  = (packetData.protocol && packetData.protocol.length  > 0) ? packetData.protocol : "" ;
    this.query  = (packetData.query) ? JSON.stringify(packetData.query) : "" ;
    this.method  = (packetData.method && packetData.method.length  > 0) ? packetData.method : "" ;
    this.body  = (packetData.body && packetData.body.length  > 0) ? packetData.body : "" ;
    if (this.body instanceof Array && this.body.length > 0) {
      this.body = this.body[0];
    }
  }
}

module.exports = PacketModel
