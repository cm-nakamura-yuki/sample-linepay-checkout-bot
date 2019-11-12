"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Line = require("@line/bot-sdk");
const channelAccessToken = 'rwbo5C+Qr14BfeoZ1mgaPoIfhRFEW4BcHHJwFPn2FT8SxcrT70lnk2SkOUiSAlGIljRilDyMEDBTdML9qlSOwh0m5cIJdf9Zk9Q9p0xx7KPyE90VmqAQUN6AvaJtQLZ1NulYleKtT2dk6IO8C7rO5gdB04t89/1O/w1cDnyilFU=';
const client = new Line.Client({
    channelAccessToken: channelAccessToken
});
exports.handler = (event) => __awaiter(this, void 0, void 0, function* () {
    console.log(JSON.stringify(event));
    const orderId = event.queryStringParameters.orderId;
    const userId = orderId.substring(0, orderId.indexOf('_'));
    const message = [
        {
            type: 'text',
            text: 'キャンセルしました。'
        }
    ];
    yield client.pushMessage(userId, message);
    return {
        statusCode: 200
    };
});
//# sourceMappingURL=index.js.map