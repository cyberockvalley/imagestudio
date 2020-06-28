import React from 'react'

class FilmRollerAnimation extends React.PureComponent {
    render() {
        return(
            <div class="preloader">
                <div class="preloader__ring">
                    {
                        this.props.top_text.split("").map((character, index) => {
                            return(<div key={index} class="preloader__sector">{character}</div>)
                        })
                    }
                    {
                        this.props.top_text.split("").map((character, index) => {
                            return(
                                <>
                                    <div key={index} class="preloader__sector"></div>
                                    <div key={index + 1} class="preloader__sector"></div>
                                </>
                            )
                        })
                    }
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                </div>
                <div class="preloader__ring">
                    {
                        this.props.bottom_text.split("").map((character, index) => {
                            return(<div key={index} class="preloader__sector">{character}</div>)
                        })
                    }
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                    <div class="preloader__sector"></div>
                </div>
            </div>
        )
    }
}

export default FilmRollerAnimation