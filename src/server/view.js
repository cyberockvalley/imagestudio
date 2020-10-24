import { EXAMPLE_MODE_TRUE } from "../Constants"

//import Hydrate from 'hydrate'

//const hydrate = new Hydrate()
/*
#main-navigaton .navbar {
	display: flex;
	justify-content: end;
}*/
export default (helmet, state, body) => {
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

            <link rel='stylesheet' media='print' onload="this.media='all'" id='bootstrap-min-css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css?ver=5.4.1' type='text/css' media='all'/>
            <link rel='stylesheet' media="print" onload="this.media='all'" id='font-awesome-css' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?ver=5.4.1' type='text/css' media='all'/>
            <link rel='stylesheet' media="print" onload="this.media='all'" id='vc_google_fonts_sailregular-css'  href='//fonts.googleapis.com/css?family=Sail%3Aregular&#038;ver=5.3.4' type='text/css' />
            <link rel="stylesheet" media="print" onload="this.media='all'" href="/client/css/styles.min.css">
            <noscript>
                <link rel='stylesheet' id='bootstrap-min-css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css?ver=5.4.1' type='text/css' media='all'/>
                <link rel='stylesheet' id='font-awesome-css' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?ver=5.4.1' type='text/css' media='all'/>
                <link rel='stylesheet' id='vc_google_fonts_sailregular-css'  href='//fonts.googleapis.com/css?family=Sail%3Aregular&#038;ver=5.3.4' type='text/css' media='all' />
                <link rel="stylesheet" href="/client/css/styles.min.css">
            </noscript>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            

            <!---state-->
            <script>
                window.__state__ = ${JSON.stringify(state)}
            </script>
        </head>
        <body style="width:100%;margin:0;padding:0;overflow-x:hidden">
            <div id="root">
                ${body}
            </div>
            <script src="/client/vendors~index.js"></script>
            <script src="/client/index.js"></script>
            <!-- Load stylesheets onload -->
            <script type="text/javascript">
            </script>
            
            
            <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js?ver=3.4.0'></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
            <script type='text/javascript' src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js?ver=4.3.11'></script>
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
