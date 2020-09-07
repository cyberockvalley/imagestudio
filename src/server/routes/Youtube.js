import { fileAndExt } from '../../both/Functions';

const ytdl = require('ytdl-core')
const express = require("express")
const Youtube = express.Router()

const VALID_EXT = ["webm", "mp4"]
Youtube.get("/:video_id/:filename", (req, res) => {
    const videoId = req.params.video_id
    const filename = req.params.filename
    if(!videoId || !filename) {
        res.status(404);
        res.set('Content-Type', 'text/plain')
        res.end("File not found1!")

    } else {
        var ext = fileAndExt(filename)[1]
        ext = ext && VALID_EXT.includes(ext.toLowerCase())? ext.toLowerCase() : null
        if(!ext) {
            res.status(404);
            res.set('Content-Type', 'text/plain')
            res.end("File not found2!")

        } else {
            var url = `http://www.youtube.com/watch?v=${videoId}`
            //console.log('YT:', url, req.query.itag)
            res.set("max-age", "31557600000")
            ytdl(url).pipe(res)
        }
    }
})

export default Youtube