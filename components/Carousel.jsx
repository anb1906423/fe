import React from 'react'
const slides = [
    {
        id: 4,
        src: "https://res.cloudinary.com/daeph2mgj/image/upload/v1673020588/slideCopy_fhmdxi.jpg",
        alt: "Slide 4",
    },
    {
        id: 1,
        src: "../img/slide01.jpg",
        alt: "Slide 1",
    },
    {
        id: 2,
        src: "../img/slide02.jpg",
        alt: "Slide 2",
    },
    {
        id: 3,
        src: "https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/homepage-carousel-new/jcr:content/par/billboard_2132359069/imageComponent/image.imgs.full.high.jpg",
        alt: "Slide 3",
    },
]

const Carousel = () => {
    return (
        <div className="carousel">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    {
                        slides.map((item, index) => index === 0 ?
                            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={item.id} className="active" aria-current="true" aria-label={item.alt}></button> :
                            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={item.id} aria-label={item.alt}></button>
                        )
                    }
                </div>
                <div className="carousel-inner">
                    {
                        slides.map((item, index) => index === 0 ? <div key={index} className="carousel-item active">
                            <img src={item.src} className="d-block w-100" alt={item.alt} />
                        </div> : <div key={index} className="carousel-item">
                            <img src={item.src} className="d-block w-100" alt={item.alt} />
                        </div>)
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel