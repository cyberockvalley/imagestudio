import { EXAMPLE_MODE_TRUE } from "../Constants"

export default (meta, initialData, body) => {
    var EXAMPLE_RES = ''
    var template = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta http-equiv="content-type" content="text/html">
            <meta name="theme-color" content="#d6a047" />
            <link rel="icon" href="/client/res/favicon.ico" type="image/x-icon">

            <link rel='stylesheet' id='bootstrap-min-css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css?ver=5.4.1' type='text/css' media='all'/>
            <link rel='stylesheet' id='font-awesome-css' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?ver=5.4.1' type='text/css' media='all'/>
            
            <link rel="stylesheet" href="/client/res/css/styles.css">
            <link rel="stylesheet" href="/client/res/css/mansory.css">
            <title>${meta.title}</title>
            <!--PREFETCH, PRECONNECT... METAs START-->
            ${
                meta.pre.map((metaItem, index) => {
                    return `<link rel="${metaItem.pre_name}" href="${metaItem.href}"\n`
                })
            }
            <!--PREFETCH, PRECONNECT... METAs END-->

            <!--SOCIAL PLATFORMS & SEO METAs START-->
            ${
                meta.seo.map((metaItem, index) => {
                    return `<${metaItem.tag} ${metaItem.key}="${metaItem.value}" content="${metaItem.content}"\n`
                })
            }
            <!--SOCIAL PLATFORMS & SEO METAs END-->

            <!---InitialData-->
            <script>
                windows.__initialData__ = ${JSON.stringify(initialData)}
            </script>
            <style type="text/css">
            .json-key     { color: brown; }
            .json-string  { color: olive; }
            .json-number  { color: navy; }
            .json-boolean { color: teal; }
            .json-null    { color: dimgray; }
            </style>
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
            <script type='text/javascript' src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js?ver=4.3.11'></script>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
            <script>
                AOS.init()
            </script>
        </body>
    </html>
    `
    
    return template
}