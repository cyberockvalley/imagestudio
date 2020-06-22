import React from "react";
import Header from "./Header";
import HeaderImageBanner from "./HeaderImageBanner";
import NavBar from "./NavBar";
import FooterContactUs from "./FooterContactUs";
import Footer from "./Footer";

class SingleBlogPost extends React.Component {
  render() {
    return (
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
    );
  }
}

export default SingleBlogPost;
