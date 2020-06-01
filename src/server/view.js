
export default (meta, initialData, body) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta http-equiv="content-type" content="text/html">
            <meta name="theme-color" content="#d6a047" />
            <link rel="icon" href="/client/res/favicon.ico" type="image/x-icon">
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
        </head>
        <body>
            <div id="root">
                ${body}
            </div>
            <!-- Load stylesheets onload -->
            <script type="text/javascript>
                
            </script>
        </body>
    </html>
    `
}