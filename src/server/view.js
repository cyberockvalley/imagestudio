import { EXAMPLE_MODE_TRUE } from "../Constants"

export default (helmet, initialData, body) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta http-equiv="content-type" content="text/html">
            <meta name="theme-color" content="#d6a047" />
            <link rel="icon" href="/client/images/uploads/2019/07/favicon.ico" sizes="32x32" />
            <link rel="icon" href="/client/images/uploads/2019/07/favicon.ico" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="/client/images/uploads/2019/07/favicon.ico" />
            <meta name="msapplication-TileImage" content="/client/images/uploads/2019/07/favicon.ico" />

            <link rel='stylesheet' media='print' onload="this.media='all'" id='bootstrap-min-css' href='/client/css/vendor/bootstrap.min.css' type='text/css' media='all'/>
            <link rel='stylesheet' media="print" onload="this.media='all'" id='font-awesome-css' href='/client/css/vendor/font-awesome.min.css' type='text/css' media='all'/>
            <link rel="stylesheet" media="print" onload="this.media='all'" href="/client/css/styles.min.css">
            <noscript>
                <link rel='stylesheet' id='bootstrap-min-css' href='/client/css/vendor/bootstrap.min.css' type='text/css' media='all'/>
                <link rel='stylesheet' id='font-awesome-css' href='/client/css/vendor/font-awesome.min.css' type='text/css' media='all'/>
                <link rel="stylesheet" href="/client/css/styles.min.css">
            </noscript>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            

            <!---InitialData-->
            <script>
                window.__initialData__ = ${JSON.stringify(initialData)}
            </script>
        </head>
        <body style="width:100%;margin:0;padding:0;overflow-x:hidden">
            <div id="root">
                ${body}
            </div>
            <script src="/client/vendors~index.js"></script>
            <script src="/client/index.js"></script>
            
            <script src="/client/js/popper.min.js"></script>
            <script type='text/javascript' src='/client/js/bootstrap.min.js'></script>

            <!--<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
            <script>
                //AOS.init()
            </script>-->
            <script src="/client/js/lazysizes.min.js" async=""></script>
        </body>
    </html>
    `
}