import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

class SingleBlogPost extends React.Component {
  render() {
    return (
    <>
      <Helmet>
        <title>Blog Title</title>
        <meta name="description" content="The document head might not be the most glamorous part of a website, but what goes into it is arguably just as important to the success of your website as" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        <link rel="canonical" href="https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/" />
        
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="It&#039;s All In the Head: Managing the Document Head of a React Powered Site With React Helmet | CSS-Tricks" />
        <meta property="og:description" content="The document head might not be the most glamorous part of a website, but what goes into it is arguably just as important to the success of your website as" />
        <meta property="og:url" content="https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/" />
        <meta property="og:site_name" content="CSS-Tricks" />
        <meta property="article:publisher" content="https://www.facebook.com/CSSTricks" />
        <meta property="article:published_time" content="2019-10-30T15:10:50+00:00" />
        <meta property="article:modified_time" content="2019-12-23T17:11:19+00:00" />
        <meta property="article:author" content="Image Studio" />
        <meta property="article:section" content="Photography" />
        <meta property="article:tag" content="sharp" />
        <meta property="article:tag" content="nice" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/10/react-helmet.png?ssl=1" />
        <meta name="twitter:creator" content="@CSS" />
        <meta name="twitter:site" content="@CSS" />
      </Helmet>
      <div>
        <Header />
        <HeaderImageBanner />
        <NavBar />
        <section className="blog-header">
          <h1>Post title here...</h1>
          <hr className="title_break" />
          <div className="post_detail">
            <span className="post_info_date">June 30, 2019</span>
          </div>
          <div className="col-12 col-sm-9 blog-body">
            <p>
              Postasem mai demult în stories pe Instagram cum arată fotografiile
              după editare și ați prezentat interes pentru acest proces așa că
              am decis să vă dăm mai multe detalii. <a href>Test link</a>
            </p>
            <p>
              În general încercăm să modificăm minim posibil, să nu apelăm la
              tendințe de moment care vor deveni kitsch în câțiva ani. Dorim ca
              atunci când nepoții mirilor noștri se vor uita la album, să le
              pară actual. Astfel, editarea noastră e destul de simplă.
              Considerăm că fotografia trebuie făcută bine din start. Motiv
              pentru care, mereu în timpul evenimentului căutăm să valorificăm
              maxim lumina. Mutăm lucruri care ne încurcă, la fotografiile de
              grup căutăm reflexii bune astfel încât lumina să cadă bine pe
              invitați, iar la restaurant, ei bine aici e partea cea mai
              interesantă pentru că nu mereu depinde de noi. De fiecare dată
              întrebăm mirii despre lumina de la petrecere, încercăm să negociem
              cu prestatorii dar se întâmplă că nu prea putem modifica ceva așa
              că toată salvarea e în editare. Vom prezenta aici și un astfel de
              caz. Edităm seriile în Lightroom pe iMac iar retușul îl facem în
              Photoshop.
            </p>
            <p>
              <img
                className="aligncenter size-full wp-image-15654"
                src="/imagestudio/images/before-and-after-editing-photos-grabazei5-3.jpg"
                alt
                width={960}
                height={716}
              />
            </p>
            <p>
              Fotografia din start a fost puțin sub expusă. Facem asta pentru a
              nu pierde informația din highlights (punctele de maximă lumină)
              iar în editare ne jucăm cu umbrele.
            </p>
            <p>
              <img
                className="aligncenter size-full wp-image-15642"
                src="/imagestudio/images/before-and-after-editing-photos-grabazei12.jpg"
                alt
                width={960}
                height={1294}
              />
              <br />
              Scoatem toate detaliile care distrag atenția și scad din valoarea
              imaginii. Dacă nu sunt prea multe le scoatem direct din Lightroom,
              în caz contrat le importăm în Photoshop.
            </p>
          </div>
        </section>
        <FooterContactUs />
        <Footer />
      </div>
      </>
    );
  }
}

export default SingleBlogPost;
