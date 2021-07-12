const express = require('express');

const api=express();

const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")
const { gzip } = require("zlib");



api.listen(3001,()=>{
    console.log('API up and running');
});

api.get('/codeforces',(req,res)=>{
    let title;
    const movie = "https://codeforces.com/contests";
    (
        async () => {
            let imdbData = [];
            const respose = await request({
                uri: movie,
                headers: {
                    "Accept": "text/ html, application/ xhtml + xml, application / xml; q = 0.9, image / webp,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Cache-Control": "max-age=0",
                    "Connection": "keep-alive",
                    // "Cookie":"utma=71512449.1145444227.1584122153.1622713971.1622752323.850; __utmz=71512449.1621613411.801.84.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); RCPC=b86b22c9894dfbfac64a8209d1f0d581; 39ce7=CFlPM5cr; _ga=GA1.2.1145444227.1584122153; __atuvc=1%7C6; X-User-Sha1=663268f3eb18fb288d733061c107a0d31cae0bda; 70a7c28f3de=ik3q124vkm8g9j023g; JSESSIONID=E1364D5B0EBC1D5566F7826E389E4D42-n1; __utmc=71512449; evercookie_png=ik3q124vkm8g9j023g; evercookie_etag=ik3q124vkm8g9j023g; evercookie_cache=ik3q124vkm8g9j023g; lastOnlineTimeUpdaterInvocation=1622752327038; __utmb=71512449.1.10.1622752323; __utmt=1"
                    "Host": "codeforces.com",
                    "TE": "Trailers",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
                },
                gzip: true
            })
            let $ = cheerio.load(respose);

            let i=2;
            while(1)
            {
                date = $(".contestList > div:nth-child(2) > div:nth-child(6) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > a:nth-child(1)").text().trim()
                contestName = $(`.contestList > div:nth-child(2) > div:nth-child(6) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(${i}) > td:nth-child(1)`).text().trim();
                time = $(` #pageContent > div.contestList > div.datatable > div:nth-child(6) > table > tbody > tr:nth-child(${i}) > td:nth-child(4) `).text().trim();
                i++;

                if (!time)
                    break;
                imdbData.push({
                    i,date,contestName, time
                });
                
            }
            
            console.log(imdbData);

            //console.log(req);
            // res.send(`${title1} ${time1}  = name of contest , ${title2} ${time2}`);
            //res.send(`${imdbData}`);
            res.json(imdbData);
        }

    )();

})

api.get('/atcoder', (req, res) => {
    let title;
    const movie = "https://atcoder.jp/contests/";
    (
        async () => {
            let imdbData = [];
            const respose = await request({
                uri: movie,
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cache-Control": "max-age=0",
                  },
                gzip: true
            })
            let $ = cheerio.load(respose);

            let i = 1;
            while (1) {
                contestName = $(`#contest-table-upcoming > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`).text().trim();
                time = $(`#contest-table-upcoming > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
                url ="https://atcoder.jp/contests/"
                i++;

                if (!time)
                    break;
                imdbData.push({
                    i,url,date,contestName, time
                });

            }

            console.log(imdbData);

            //console.log(req);
            // res.send(`${title1} ${time1}  = name of contest , ${title2} ${time2}`);
            //res.send(`${imdbData}`);
            res.json(imdbData);
        }

    )();

})

const fetch = require('node-fetch');

api.get('/codechef', (req, res) => {
    let title;
    (
        async () => {
            let imdbData = [];
            fetch('https://kontests.net/api/v1/code_chef')
                .then(res => res.json())
                .then(json => {
                    imdbData.push({
                        json
                    });
                    console.log(imdbData[0].json)
                    res.json(imdbData[0].json);
                })

        }

    )();

})

api.get('/all', (req, res) => {
    let title;
    (
        async () => {
            let imdbData = [];
            fetch('https://kontests.net/api/v1/all')
                .then(res => res.json())
                .then(json => {
                    imdbData.push({
                        json
                    });
                    // console.log(imdbData[0].json)
                    res.json(imdbData[0].json);
                })

        }

    )();

})