import * as Line from '@line/bot-sdk';
import * as Rp from 'request-promise';
const crypto = require('crypto');
const channelAccessToken: string = '';
const channelSecret: string = '';
const confirmUrl: string = '';
const cancelUrl: string = '';
const payChannelId: string = '';
const payChannelSecret: string = '';

const client = new Line.Client(
    {
        channelAccessToken: channelAccessToken
    }
);

exports.handler = async(event: any) => {
    console.log('Event: ' + JSON.stringify(event));

    if (!Line.validateSignature(event.body, channelSecret, event['headers']['X-Line-Signature'])) {
        console.log('Validate signature failed.');
        return {
            statusCode: 200
        };
    }

    const body = JSON.parse(event.body);
    const input = body.events[0]; //TODO: 複数イベント時の処理

    if (input.type != 'message') {
        console.log('Detect ' + input.type  + ' event. We can send message when you send text.');
        return {
            statusCode: 200
        }
    }

    const replyToken: string = input.replyToken;
    if (input.message.type == 'text') {
        if (input.message.text == 'メニュー') {
            const messages: Line.Message[] = [
                {
                    type: 'flex',
                    altText: 'メニュー',
                    contents: {
                        type: 'carousel',
                        contents: [
                            {
                                'type': 'bubble',
                                'hero': {
                                    'type': 'image',
                                    'url': 'https://d3q58mkl9qf7k9.cloudfront.net/brazil.png',
                                    'size': 'full',
                                    'aspectRatio': '20:13',
                                    'aspectMode': 'cover',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    }
                                },
                                'body': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'spacing': 'md',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    },
                                    'contents': [
                                        {
                                            'type': 'text',
                                            'text': 'Brazil',
                                            'size': 'xl',
                                            'weight': 'bold'
                                        },
                                        {
                                            'type': 'text',
                                            'text': 'ブラジルのコーヒーです。美味しいです。',
                                            'wrap': true
                                        },
                                        {
                                            'type': 'separator'
                                        },
                                        {
                                            'type': 'box',
                                            'layout': 'horizontal',
                                            'contents': [
                                                {
                                                    'type': 'text',
                                                    'text': '価格',
                                                    'size': 'xl',
                                                    'gravity': 'center'
                                                },
                                                {
                                                    'type': 'text',
                                                    'text': '1円',
                                                    'size': 'xxl',
                                                    'gravity': 'center',
                                                    'weight': 'bold'
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'separator'
                                        }
                                    ]
                                },
                                'footer': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'contents': [
                                        {
                                            'type': 'spacer',
                                            'size': 'xs'
                                        },
                                        {
                                            'type': 'button',
                                            'action': {
                                                'type': 'message',
                                                'label': '購入する',
                                                'text': 'Brazilを購入する'
                                            },
                                            'margin': 'xl',
                                            'style': 'primary'
                                        }
                                    ]
                                }
                            },
                            {
                                'type': 'bubble',
                                'hero': {
                                    'type': 'image',
                                    'url': 'https://d3q58mkl9qf7k9.cloudfront.net/bolivia.png',
                                    'size': 'full',
                                    'aspectRatio': '20:13',
                                    'aspectMode': 'cover',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    }
                                },
                                'body': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'spacing': 'md',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    },
                                    'contents': [
                                        {
                                            'type': 'text',
                                            'text': 'Bolivia',
                                            'size': 'xl',
                                            'weight': 'bold'
                                        },
                                        {
                                            'type': 'text',
                                            'text': 'ボリビアのコーヒーです。美味しいです。',
                                            'wrap': true
                                        },
                                        {
                                            'type': 'separator'
                                        },
                                        {
                                            'type': 'box',
                                            'layout': 'horizontal',
                                            'contents': [
                                                {
                                                    'type': 'text',
                                                    'text': '価格',
                                                    'size': 'xl',
                                                    'gravity': 'center'
                                                },
                                                {
                                                    'type': 'text',
                                                    'text': '1円',
                                                    'size': 'xxl',
                                                    'gravity': 'center',
                                                    'weight': 'bold'
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'separator'
                                        }
                                    ]
                                },
                                'footer': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'contents': [
                                        {
                                            'type': 'spacer',
                                            'size': 'xs'
                                        },
                                        {
                                            'type': 'button',
                                            'action': {
                                                'type': 'message',
                                                'label': '購入する',
                                                'text': 'Boliviaを購入する'
                                            },
                                            'margin': 'xl',
                                            'style': 'primary'
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ];
            await client.replyMessage(replyToken, messages);
        } else if (input.message.text.indexOf('購入する') != -1) {
            let itemPos = input.message.text.indexOf('を');
            let item = input.message.text.substring(0, itemPos);
            const price = 1;
            const quantity = 1;
            const orderId = body.events[0].source.userId + '_' + Date.now();
            console.log('orderId: ' + orderId);
            let order = {
                amount: Number(price),
                currency: 'JPY',
                orderId: orderId,
                packages: [
                    {
                        id: orderId,
                        amount: Number(price),
                        name: 'Coffee Beans Store',
                        products: [
                            {
                                name: item,
                                quantity: quantity,
                                price: price
                            }
                        ]
                    }
                ],
                options: {
                    shipping: {
                        type: 'SHIPPING',
                        feeInquiryType: 'FIXED',
                        feeAmount: '0'
                    }
                },
                redirectUrls: {
                    confirmUrl: confirmUrl,
                    confirmUrlType: 'SERVER',
                    cancelUrl: cancelUrl + '?orderId=' + orderId
                }
            };

            const payResult = await getPaymentUrl(order);

            if (payResult === undefined) {
                const messages: Line.Message[] = [
                    {
                        type: 'text',
                        text: 'エラーが発生しました。しばらく経ってからやり直してください。'
                    }
                ]
                await client.replyMessage(replyToken, messages);
            } else {
                const messages: Line.Message[] = [
                    {
                        'type': 'flex',
                        'altText': 'Order Detail',
                        'contents': {
                            'type': 'bubble',
                            'direction': 'ltr',
                            'body': {
                                'type': 'box',
                                'layout': 'vertical',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'text': 'ご注文はこちらの内容でよろしいでしょうか？',
                                        'size': 'lg',
                                        'wrap': true
                                    },
                                    {
                                        'type': 'separator',
                                        'margin': 'md'
                                    },
                                    {
                                        'type': 'box',
                                        'layout': 'horizontal',
                                        'margin': 'md',
                                        'contents': [
                                            {
                                                'type': 'text',
                                                'text': item,
                                                'size': 'lg',
                                                'align': 'start',
                                                'weight': 'regular',
                                                'color': '#878787'
                                            },
                                            {
                                                'type': 'text',
                                                'text': '1個',
                                                'size': 'lg',
                                                'align': 'end',
                                                'weight': 'bold'
                                            }
                                        ]
                                    },
                                    {
                                        'type': 'box',
                                        'layout': 'horizontal',
                                        'contents': [
                                            {
                                                'type': 'text',
                                                'text': '合計',
                                                'size': 'xxl',
                                                'weight': 'bold'
                                            },
                                            {
                                                'type': 'text',
                                                'text': '1円',
                                                'size': 'xxl',
                                                'align': 'end',
                                                'weight': 'bold'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'footer': {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'button',
                                        'action': {
                                            'type': 'uri',
                                            'label': 'LINE Payで決済する',
                                            'uri': payResult.info.paymentUrl.app
                                        },
                                        'style': 'primary'
                                    }
                                ]
                            }
                        }
                    }
                ];
                await client.replyMessage(replyToken, messages);
            }
        } else {
            //エラー時のメッセージ送信
            const messages: Line.Message[] = [
                {
                    type: 'text',
                    text: 'こちらから商品を選択してください。'
                },
                {
                    type: 'flex',
                    altText: 'メニュー',
                    contents: {
                        type: 'carousel',
                        contents: [
                            {
                                'type': 'bubble',
                                'hero': {
                                    'type': 'image',
                                    'url': 'https://d3q58mkl9qf7k9.cloudfront.net/brazil.jpg',
                                    'size': 'full',
                                    'aspectRatio': '20:13',
                                    'aspectMode': 'cover',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    }
                                },
                                'body': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'spacing': 'md',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    },
                                    'contents': [
                                        {
                                            'type': 'text',
                                            'text': 'Brazil',
                                            'size': 'xl',
                                            'weight': 'bold'
                                        },
                                        {
                                            'type': 'text',
                                            'text': 'イエロープラムを思わせる風味に、ミルクチョコレートのような甘みが感じられるコーヒー',
                                            'wrap': true
                                        },
                                        {
                                            'type': 'separator'
                                        },
                                        {
                                            'type': 'box',
                                            'layout': 'horizontal',
                                            'contents': [
                                                {
                                                    'type': 'text',
                                                    'text': '価格',
                                                    'size': 'xl',
                                                    'gravity': 'center'
                                                },
                                                {
                                                    'type': 'text',
                                                    'text': '1円',
                                                    'size': 'xxl',
                                                    'gravity': 'center',
                                                    'weight': 'bold'
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'separator'
                                        }
                                    ]
                                },
                                'footer': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'contents': [
                                        {
                                            'type': 'spacer',
                                            'size': 'xs'
                                        },
                                        {
                                            'type': 'button',
                                            'action': {
                                                'type': 'message',
                                                'label': '購入する',
                                                'text': 'Brazilをカートに入れる'
                                            },
                                            'margin': 'xl',
                                            'style': 'primary'
                                        }
                                    ]
                                }
                            },
                            {
                                'type': 'bubble',
                                'hero': {
                                    'type': 'image',
                                    'url': 'https://d3q58mkl9qf7k9.cloudfront.net/bolivia.jpg',
                                    'size': 'full',
                                    'aspectRatio': '20:13',
                                    'aspectMode': 'cover',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    }
                                },
                                'body': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'spacing': 'md',
                                    'action': {
                                        'type': 'uri',
                                        'label': 'Action',
                                        'uri': 'https://classmethod.jp/'
                                    },
                                    'contents': [
                                        {
                                            'type': 'text',
                                            'text': 'Bolivia',
                                            'size': 'xl',
                                            'weight': 'bold'
                                        },
                                        {
                                            'type': 'text',
                                            'text': 'ストーンフルーツを思わせる繊細な風味に、トフィーのようなアクセントを感じるコーヒー',
                                            'wrap': true
                                        },
                                        {
                                            'type': 'separator'
                                        },
                                        {
                                            'type': 'box',
                                            'layout': 'horizontal',
                                            'contents': [
                                                {
                                                    'type': 'text',
                                                    'text': '価格',
                                                    'size': 'xl',
                                                    'gravity': 'center'
                                                },
                                                {
                                                    'type': 'text',
                                                    'text': '1円',
                                                    'size': 'xxl',
                                                    'gravity': 'center',
                                                    'weight': 'bold'
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'separator'
                                        }
                                    ]
                                },
                                'footer': {
                                    'type': 'box',
                                    'layout': 'vertical',
                                    'contents': [
                                        {
                                            'type': 'spacer',
                                            'size': 'xs'
                                        },
                                        {
                                            'type': 'button',
                                            'action': {
                                                'type': 'message',
                                                'label': '購入する',
                                                'text': 'Boliviaをカートに入れる'
                                            },
                                            'margin': 'xl',
                                            'style': 'primary'
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ];
            await client.replyMessage(replyToken, messages);
        }
    } else {
        const messages: Line.Message[] = [
            {
                type: 'text',
                text: 'テキストでメッセージを送信してください。'
            }
        ];
        await client.replyMessage(replyToken, messages);
    }

    return {
        statusCode: 200
    }
}

const getPaymentUrl = async (order: any) => {
    const nonce = String(Date.now());
    const headers = {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': payChannelId,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': crypto.createHmac('sha256', payChannelSecret).update(payChannelSecret + '/v3/payments/request' + JSON.stringify(order) + nonce).digest('base64')
    }

    const options = {
        method: 'POST',
        uri: 'https://api-pay.line.me/v3/payments/request',
        json: order,
        headers: headers
    }

    const result: any = await Rp(options).promise();
    console.log('LINE Pay Result: ' + JSON.stringify(result));

    if (result.returnCode == '0000') {
        return result;
    } else {
        console.log(result.returnMessage);
        return undefined;
    }
}