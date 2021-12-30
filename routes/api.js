const express = require('express');
const knights = require("knights-canvas");
const fs = require('fs-extra');
const util = require('minecraft-server-util');
const options = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
const router = express.Router();
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');

router.get('/cekapi', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silahkan anda login/register untuk mendapatkan api vikoapi-index.herokuapp.com`
    });
    res.send({status: 200, apikey: apikey, limit: '900 limit', note: 'apikey aktif, silahkan gunakan restapinya'});
});

router.get('/minecraft', async (req, res) => {
    const apik = req.query.ipaddress;
    if (apik === undefined) return res.status(403).send({
        status: 403,
        message: `masukan parameter ip address server minecraft`
    });
    util.status(apik, 25565, options)
    .then((result) =>
    res.json(result
))
});

router.get('/canvas-welcome', async (req, res) => {
    const image = await new knights.Welcome()
    .setUsername("UNDEFINED")
    .setGuildName("WIBU NOLEP")
    .setGuildIcon("https://i.ibb.co/G5mJZxs/rin.jpg")
    .setMemberCount("120")
    .setAvatar("https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg")
    .setBackground("https://i.ibb.co/4YBNyvP/images-76.jpg")
    .toAttachment();
  
  data = image.toBuffer();
  await fs.writeFileSync(__path +'/canvas-tmp/swelkom.png', data)
  res.sendFile(__path +'/canvas-tmp/swelkom.png')
});

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;
